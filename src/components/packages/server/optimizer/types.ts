export type FileBoxSettings = {
  [key: string]: number | string | boolean
}

export interface FileBox {
  file: Buffer
  path: string
  type: string
  ext: string
}

export interface SkipFileBox extends FileBox {
  type: 'skip'
}

export interface FileBoxWithSettings extends FileBox {
  settings: FileBoxSettings
}

export interface ImageFileBox extends FileBoxWithSettings {
  type: 'image'
  settings: {
    quality: number
    scale: number
    placeholder: boolean
    webp: boolean
  }
}

export interface VideoFileBox extends FileBoxWithSettings {
  type: 'video'
  settings: {
    quality: number
    scale: number
    fps: number | 'auto'
    hevc: boolean
  }
}

export type KnownFileBox = VideoFileBox | ImageFileBox | SkipFileBox

export interface OptimizedEntry {
  buffer: Buffer
  format: string
}

export const ALLOWED_IMAGE_EXTENSIONS = ['jpg', 'png', 'webp', 'jpeg'] as const
export const ALLOWED_VIDEO_EXTENSIONS = ['mp4', 'mov'] as const
