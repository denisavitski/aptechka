import { readdirSync, readFileSync, statSync } from 'fs'
import { extname, join, sep } from 'path'
import {
  ALLOWED_IMAGE_EXTENSIONS,
  ALLOWED_VIDEO_EXTENSIONS,
  FileBoxWithSettings,
  ImageFileBox,
  KnownFileBox,
  VideoFileBox,
} from './types'
import { readdir, readFile } from 'fs/promises'

export interface InputFilesCallbackEntry {
  type: KnownFileBox['type']
  path: string
}

export type InputFilesCallback<T extends FileBoxWithSettings> = (
  entry: InputFilesCallbackEntry
) => T

export interface InputFilesSettings {
  image?(path: string): Partial<ImageFileBox['settings']>
  video?(path: string): Partial<VideoFileBox['settings']>
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

        const file = await readFile(sourcePath)

        if (
          ALLOWED_IMAGE_EXTENSIONS.includes(
            ext as (typeof ALLOWED_IMAGE_EXTENSIONS)[number]
          )
        ) {
          boxes.push({
            ext,
            file,
            path: destinationPath,
            type: 'image',
            settings: {
              placeholder: false,
              quality: 80,
              scale: 1,
              webp: false,
              ...settings?.image?.(destinationPath),
            },
          })
        } else if (
          ALLOWED_VIDEO_EXTENSIONS.includes(
            ext as (typeof ALLOWED_VIDEO_EXTENSIONS)[number]
          )
        ) {
          boxes.push({
            ext,
            file,
            path: destinationPath,
            type: 'video',
            settings: {
              quality: 80,
              scale: 1,
              fps: 'auto',
              hevc: false,
              ...settings?.video?.(destinationPath),
            },
          })
        } else {
          boxes.push({ ext, file, path: destinationPath, type: 'skip' })
        }
      }
    }
  }

  return boxes
}
