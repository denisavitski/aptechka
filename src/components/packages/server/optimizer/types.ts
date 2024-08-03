import type { FaviconOptions } from 'favicons'

export type SourceSettings = {
  [key: string]: any
}

export interface Source<
  B = Buffer,
  T extends string = string,
  S extends SourceSettings = {}
> {
  content: B
  type: T
  settings: S
}

export type SkipSource = Source<
  Buffer,
  'skip',
  {
    destinationPath: string
  }
>

export type ImageSource = Source<
  Buffer,
  'image',
  {
    destinationPath: string
    quality?: number
    scale?: number
    placeholder?: boolean
    webp?: boolean
  }
>

export type VideoSource = Source<
  Buffer,
  'video',
  {
    destinationPath: string
    quality?: number
    scale?: number
    fps?: number
  }
>

export type FaviconSource = Source<
  Buffer,
  'favicon',
  {
    destinationPath: string
    destinationHtmlPath: string
  } & FaviconOptions
>

export type SpriteSource = Source<
  Array<{ name: string; buffer: Buffer }>,
  'sprite',
  {
    destinationPath: string
    name?: string
    removeStroke?: boolean
    removeFill?: boolean
  }
>

export type SequenceSource = Source<
  Buffer,
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

export interface OutputItem {
  data: Buffer | string
  destinationPath: string
}

export type Output = Array<OutputItem>

export const ALLOWED_IMAGE_EXTENSIONS = ['jpg', 'png', 'webp', 'jpeg'] as const
export const ALLOWED_VIDEO_EXTENSIONS = ['mp4', 'mov'] as const
