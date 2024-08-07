import type { FaviconOptions } from 'favicons'

export type SourceDefaultSettings = {
  [key: string]: any
}

export type SourceSetting = { value: any }

export interface NumberSetting<Min extends number = 0, Max extends number = 1> {
  value: number
  min: Min
  max: Max
}

export interface ImageSettings {
  quality?: NumberSetting<0, 100>
  scale?: NumberSetting<0, 1>
  placeholder?: boolean
  webp?: boolean
}

export interface VideoSettings {
  fps: NumberSetting<0, 300>
  quality: NumberSetting<0, 100>
  scale: NumberSetting<0, 1>
}

export interface Source<
  B = Buffer | File,
  T extends string = string,
  S extends SourceDefaultSettings = {}
> {
  content: B
  type: T
  settings: S
}

export type SkipSource = Source<
  Buffer | File,
  'skip',
  {
    destinationPath: string
  }
>

export type ImageSource = Source<
  Buffer | File,
  'image',
  {
    destinationPath: string
    quality?: ImageSettings['quality']
    scale?: ImageSettings['scale']
    placeholder?: ImageSettings['placeholder']
    webp?: ImageSettings['webp']
  }
>

export type VideoSource = Source<
  Buffer | File,
  'video',
  {
    destinationPath: string
    quality?: VideoSettings['quality']
    scale?: VideoSettings['scale']
    fps?: VideoSettings['fps']
  }
>

export type FaviconSource = Source<
  Buffer | File,
  'favicon',
  {
    destinationPath: string
    destinationHtmlPath: string
  } & FaviconOptions
>

export type SpriteSource = Source<
  Array<{ name: string; data: Buffer | File }>,
  'sprite',
  {
    destinationPath: string
    name?: string
    removeStroke?: boolean
    removeFill?: boolean
  }
>

export type SequenceSource = Source<
  Buffer | File,
  'sequence',
  {
    destinationPath: string
    fps?: number
    frameExtension?: 'png' | 'jpg'
  }
>

export type KnownSource =
  | VideoSource
  | ImageSource
  | SkipSource
  | FaviconSource
  | SpriteSource
  | SequenceSource

export const ALLOWED_IMAGE_EXTENSIONS = ['jpg', 'png', 'webp', 'jpeg'] as const
export const ALLOWED_VIDEO_EXTENSIONS = ['mp4', 'mov'] as const
