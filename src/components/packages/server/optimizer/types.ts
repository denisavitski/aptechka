import type { FaviconOptions } from 'favicons'

export type SourceDefaultSettings = {
  [key: string]: any
}

export type SourceSetting = { value: any }

export type Source<
  B = Buffer | File,
  T extends string = string,
  S extends SourceDefaultSettings = {},
  R extends Partial<{ [K in keyof S]: any }> | undefined = undefined
> = {
  content: B
  type: T
  settings: S
} & (R extends undefined ? {} : { restrictions?: Partial<R> })

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
    quality?: number
    scale?: number
    placeholder?: boolean
    webp?: boolean
  },
  {
    quality: { min: 0; max: 100 }
    scale: { min: 0; max: 1 }
  }
>

export type VideoSource = Source<
  Buffer | File,
  'video',
  {
    destinationPath: string
    quality?: number
    scale?: number
    fps?: number
  },
  {
    quality: { min: 0; max: 100 }
    scale: { min: 0; max: 1 }
    fps: { min: 0; max: 300 }
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
