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

export interface GetFilesCallbackEntry {
  type: KnownFileBox['type']
  path: string
}

export type GetFilesCallback<T extends FileBoxWithSettings> = (
  entry: GetFilesCallbackEntry
) => T

export interface GetFilesSettings {
  image?(path: string): Partial<ImageFileBox['settings']>
  video?(path: string): Partial<VideoFileBox['settings']>
}

export function prepareFiles(
  sourceFolderPath: string,
  destFolderPath: string,
  settings?: GetFilesSettings
) {
  let boxes: Array<KnownFileBox> = []

  const currentPaths = readdirSync(sourceFolderPath)

  for (const currentPath of currentPaths) {
    if (!currentPath.includes('.DS_Store')) {
      const sourcePath = join(sourceFolderPath, currentPath.toString())

      const destPath = join(
        destFolderPath,
        sourcePath.replaceAll(sep, '/').replace(sourceFolderPath, '')
      )

      if (statSync(sourcePath).isDirectory()) {
        const result = prepareFiles(sourcePath, destPath)
        boxes = [...boxes, ...result]
      } else {
        const ext = extname(destPath).toLowerCase().slice(1)

        const file = readFileSync(sourcePath)

        if (
          ALLOWED_IMAGE_EXTENSIONS.includes(
            ext as (typeof ALLOWED_IMAGE_EXTENSIONS)[number]
          )
        ) {
          boxes.push({
            ext,
            file,
            path: destPath,
            type: 'image',
            settings: {
              placeholder: false,
              quality: 80,
              scale: 1,
              webp: false,
              ...settings?.image?.(destPath),
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
            path: destPath,
            type: 'video',
            settings: {
              quality: 80,
              scale: 1,
              fps: 'auto',
              hevc: false,
              ...settings?.video?.(destPath),
            },
          })
        } else {
          boxes.push({ ext, file, path: destPath, type: 'skip' })
        }
      }
    }
  }

  return boxes
}
