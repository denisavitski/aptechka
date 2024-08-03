import { statSync } from 'fs'
import { extname, join, sep } from 'path'
import {
  ALLOWED_IMAGE_EXTENSIONS,
  ALLOWED_VIDEO_EXTENSIONS,
  FaviconFileBox,
  FileBox,
  ImageFileBox,
  KnownFileBox,
  VideoFileBox,
} from './types'
import { readdir, readFile } from 'fs/promises'
import { removeExtension } from './path'

export interface InputFilesCallbackEntry {
  type: KnownFileBox['type']
  path: string
}

export type InputFilesCallback<T extends FileBox> = (
  entry: InputFilesCallbackEntry
) => T

export interface InputsFilesCallbackDefaultParameters {
  destinationPath: string
}

export interface InputsFilesCallbackFaviconParameters {
  destinationFolderPath: string
  destinationHtmlPath: string
}

export interface InputFilesSettings {
  image?(
    parameters: InputsFilesCallbackDefaultParameters
  ): Partial<ImageFileBox['settings']>

  video?(
    parameters: InputsFilesCallbackDefaultParameters
  ): Partial<VideoFileBox['settings']>

  favicon?(
    parameters: InputsFilesCallbackFaviconParameters
  ): Partial<FaviconFileBox['settings']>
}

export interface InputFilesParameters {
  sourceFolder: string
  destinationFolder: string
  settings?: InputFilesSettings
}

export async function inputFiles({
  sourceFolder,
  destinationFolder,
  settings,
}: InputFilesParameters) {
  let boxes: Array<KnownFileBox> = []

  const currentPaths = await readdir(sourceFolder)

  for await (const currentPath of currentPaths) {
    if (!currentPath.includes('.DS_Store')) {
      const sourcePath = join(sourceFolder, currentPath.toString())

      const destinationPath = join(
        destinationFolder,
        sourcePath.replaceAll(sep, '/').replace(sourceFolder, '')
      )

      if (statSync(sourcePath).isDirectory()) {
        const result = await inputFiles({
          sourceFolder: sourcePath,
          destinationFolder: destinationPath,
          settings,
        })
        boxes = [...boxes, ...result]
      } else {
        const ext = extname(destinationPath).toLowerCase().slice(1)

        const buffer = await readFile(sourcePath)

        if (destinationPath.includes('favicon')) {
          const destinationFolderPath = removeExtension(destinationPath)
          const destinationHtmlPath = `${destinationFolderPath}/head.html`

          boxes.push({
            ext,
            buffer,
            type: 'favicon',
            settings: {
              destinationFolderPath,
              destinationHtmlPath
              ...settings?.favicon?.({
                destinationFolderPath,
                destinationHtmlPath
              }),
            },
          })
        } else if (
          ALLOWED_IMAGE_EXTENSIONS.includes(
            ext as (typeof ALLOWED_IMAGE_EXTENSIONS)[number]
          )
        ) {
          boxes.push({
            ext,
            buffer,
            type: 'image',
            settings: {
              placeholder: false,
              quality: 80,
              scale: 1,
              webp: false,
              destinationPath,
              ...settings?.image?.({destinationPath}),
            },
          })
        } else if (
          ALLOWED_VIDEO_EXTENSIONS.includes(
            ext as (typeof ALLOWED_VIDEO_EXTENSIONS)[number]
          )
        ) {
          boxes.push({
            ext,
            buffer,
            type: 'video',
            settings: {
              quality: 80,
              scale: 1,
              fps: 'auto',
              destinationPath,
              ...settings?.video?.({destinationPath}),
            },
          })
        } else {
          boxes.push({
            ext,
            buffer,
            type: 'skip',
            settings: { destinationPath },
          })
        }
      }
    }
  }

  return boxes
}
