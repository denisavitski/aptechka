import { statSync } from 'fs'
import { extname, join, sep } from 'path'
import {
  ALLOWED_IMAGE_EXTENSIONS,
  ALLOWED_VIDEO_EXTENSIONS,
  FaviconSource,
  ImageSource,
  KnownSource,
  Source,
  SpriteSource,
  VideoSource,
} from './types'
import { readdir, readFile } from 'fs/promises'
import { getExtension, removeExtension } from './path'

export interface InputFilesCallbackEntry {
  type: KnownSource['type']
  path: string
}

export type InputFilesCallback<T extends Source> = (
  entry: InputFilesCallbackEntry
) => T

export interface InputsFilesCallbackDefaultParameters {
  destinationPath: string
}

export interface InputsFilesCallbackFaviconParameters
  extends InputsFilesCallbackDefaultParameters {
  destinationHtmlPath: string
}

export interface InputFilesSettings {
  image?(
    parameters: InputsFilesCallbackDefaultParameters
  ): Partial<ImageSource['settings']>

  video?(
    parameters: InputsFilesCallbackDefaultParameters
  ): Partial<VideoSource['settings']>

  favicon?(
    parameters: InputsFilesCallbackFaviconParameters
  ): Partial<FaviconSource['settings']>

  sprite?(
    parameters: InputsFilesCallbackDefaultParameters
  ): Partial<SpriteSource['settings']>
}

export interface InputFilesParameters {
  sourceFolder: string
  destinationFolder: string
  settings?: InputFilesSettings
}

function specialPath(path: string, specialString: string) {
  const splitted = path.split('/')
  const left = splitted.slice(0, -1).join('/')
  const leaf = splitted.slice(-1).join('')
  const ext = extname(leaf)
  const sourceName = leaf.replace(ext, '')
  const name = sourceName.replace(specialString, '')

  if (name) {
    if (name.startsWith('-')) {
      return `${left}/${name.slice(1)}${ext}`
    } else {
      return `${left}/${name}${ext}`
    }
  } else {
    return `${left}/${sourceName.replace('@', '')}${ext}`
  }
}

async function getFolderSourceFiles(folderPath: string) {
  const leafs = await readdir(folderPath)

  const files: Array<{
    name: string
    buffer: Buffer
  }> = []

  for await (const leaf of leafs) {
    const name = removeExtension(leaf)

    const buffer = await readFile(join(folderPath, leaf))

    files.push({
      name: name,
      buffer: buffer,
    })
  }

  return files
}

export async function inputFiles({
  sourceFolder,
  destinationFolder,
  settings,
}: InputFilesParameters) {
  let sources: Array<KnownSource> = []

  const currentPaths = await readdir(sourceFolder)

  for await (const currentPath of currentPaths) {
    if (!currentPath.includes('.DS_Store')) {
      const sourcePath = join(sourceFolder, currentPath.toString())

      const destinationPath = join(
        destinationFolder,
        sourcePath.replaceAll(sep, '/').replace(sourceFolder, '')
      )

      if (statSync(sourcePath).isDirectory()) {
        if (sourcePath.includes('@sprite')) {
          const files = await getFolderSourceFiles(sourcePath)

          const content: SpriteSource['content'] = []

          files.forEach((file) => {
            if (getExtension(file.name) === 'svg') {
              content.push({
                name: file.name,
                buffer: file.buffer,
              })
            }
          })

          const destinationSvgPath = specialPath(
            `${destinationPath}.svg`,
            '@sprite'
          )

          sources.push({
            type: 'sprite',
            content: content,
            settings: {
              destinationPath: destinationSvgPath,
              ...settings?.sprite?.({
                destinationPath: destinationSvgPath,
              }),
            },
          })
        } else {
          const result = await inputFiles({
            sourceFolder: sourcePath,
            destinationFolder: destinationPath,
            settings,
          })

          sources = [...sources, ...result]
        }
      } else {
        const ext = extname(destinationPath).toLowerCase().slice(1)

        const content = await readFile(sourcePath)

        if (destinationPath.includes('@favicon')) {
          const destinationFolderPath = specialPath(
            removeExtension(destinationPath),
            '@favicon'
          )

          const destinationHtmlPath = `${destinationFolderPath}/head.html`

          sources.push({
            content,
            type: 'favicon',
            settings: {
              destinationPath: destinationFolderPath,
              destinationHtmlPath,
              ...settings?.favicon?.({
                destinationPath: destinationFolderPath,
                destinationHtmlPath,
              }),
            },
          })
        } else if (
          ALLOWED_IMAGE_EXTENSIONS.includes(
            ext as (typeof ALLOWED_IMAGE_EXTENSIONS)[number]
          )
        ) {
          sources.push({
            content,
            type: 'image',
            settings: {
              placeholder: false,
              quality: 80,
              scale: 1,
              webp: false,
              destinationPath,
              ...settings?.image?.({ destinationPath }),
            },
          })
        } else if (
          ALLOWED_VIDEO_EXTENSIONS.includes(
            ext as (typeof ALLOWED_VIDEO_EXTENSIONS)[number]
          )
        ) {
          sources.push({
            content,
            type: 'video',
            settings: {
              quality: 80,
              scale: 1,
              fps: 'auto',
              destinationPath,
              ...settings?.video?.({ destinationPath }),
            },
          })
        } else {
          sources.push({
            content,
            type: 'skip',
            settings: { destinationPath },
          })
        }
      }
    }
  }

  return sources
}
