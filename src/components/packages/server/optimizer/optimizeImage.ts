import sharp from 'sharp'
import { ImageFileBox, OptimizedEntry } from './types'
import { replaceExtension } from './path'

export async function optimizeImage(box: ImageFileBox) {
  const settings = box.settings

  const image = sharp(box.buffer)
  const meta = await image.metadata()
  const width = meta.width
  const height = meta.height

  const entries: Array<OptimizedEntry> = []

  if (width && height) {
    if (settings.scale) {
      image.resize(
        Math.floor(width * settings.scale),
        Math.floor(height * settings.scale)
      )
    }
  }

  if (box.ext === 'jpg' || box.ext === 'jpeg') {
    image.jpeg({
      mozjpeg: true,
      quality: settings.quality,
    })
  } else if (box.ext === 'png') {
    image.png({
      compressionLevel: 9,
      adaptiveFiltering: true,
      quality: settings.quality,
      effort: 8,
    })
  }

  const buffer = await image.toBuffer()

  entries.push({
    data: buffer,
    destinationPath: settings.destinationPath,
  })

  if (settings.webp) {
    const buffer = await image
      .webp({
        quality: settings.quality,
        effort: 5,
      })
      .toBuffer()

    entries.push({
      data: buffer,
      destinationPath: replaceExtension(settings.destinationPath, 'webp'),
    })
  }

  if (settings.placeholder) {
    const buffer = await image.resize(20, 20).blur(10).toBuffer()

    entries.push({
      data: buffer,
      destinationPath: replaceExtension(
        settings.destinationPath,
        `placeholder.${box.ext}`
      ),
    })
  }

  return entries
}
