import sharp from 'sharp'
import { ImageFileBox, OptimizedEntry } from './types'
import { extname } from 'path'

export async function optimizeImage(box: ImageFileBox) {
  const settings = box.settings

  const arrayBuffer = box.file
  const image = sharp(arrayBuffer)
  const meta = await image.metadata()
  const width = meta.width
  const height = meta.height
  const format = extname(box.path).slice(1)

  const entries: Array<OptimizedEntry> = []

  if (width && height) {
    if (settings.scale) {
      image.resize(
        Math.floor(width * settings.scale),
        Math.floor(height * settings.scale)
      )
    }
  }

  if (format === 'jpg' || format === 'jpeg') {
    image.jpeg({
      mozjpeg: true,
      quality: settings.quality,
    })
  } else if (format === 'png') {
    image.png({
      compressionLevel: 9,
      adaptiveFiltering: true,
      quality: settings.quality,
      effort: 8,
    })
  }

  const buffer = await image.toBuffer()

  entries.push({
    buffer,
    path: box.path,
  })

  if (settings.webp) {
    const buffer = await image
      .webp({
        quality: settings.quality,
        effort: 5,
      })
      .toBuffer()

    entries.push({
      buffer,
      path: box.path.split('.').slice(0, -1).join('.') + '.webp',
    })
  }

  if (settings.placeholder) {
    const buffer = await image.resize(20, 20).blur(10).toBuffer()

    entries.push({
      buffer,
      path:
        box.path.split('.').slice(0, -1).join('.') + `.placeholder.${format}`,
    })
  }

  return entries
}
