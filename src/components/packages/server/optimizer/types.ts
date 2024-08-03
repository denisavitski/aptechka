import type { FaviconOptions } from 'favicons'

export type FileBoxSettings = {
  [key: string]: any
}

export interface FileBox<
  T extends string = string,
  S extends FileBoxSettings = {}
> {
  buffer: Buffer
  type: T
  ext: string
  settings: S
}

export type SkipFileBox = FileBox<
  'skip',
  {
    destinationPath: string
  }
>

export type ImageFileBox = FileBox<
  'image',
  {
    destinationPath: string
    quality: number
    scale: number
    placeholder: boolean
    webp: boolean
  }
>

export type VideoFileBox = FileBox<
  'video',
  {
    destinationPath: string
    quality: number
    scale: number
    fps: number | 'auto'
  }
>

type V = FaviconOptions

export type FaviconFileBox = FileBox<
  'favicon',
  {
    destinationFolderPath: string
    destinationHtmlPath: string
    options?: FaviconOptions
  }
>

export type KnownFileBox =
  | VideoFileBox
  | ImageFileBox
  | SkipFileBox
  | FaviconFileBox

export interface OptimizedEntry {
  data: Buffer | string
  destinationPath: string
}

export const ALLOWED_IMAGE_EXTENSIONS = ['jpg', 'png', 'webp', 'jpeg'] as const
export const ALLOWED_VIDEO_EXTENSIONS = ['mp4', 'mov'] as const
