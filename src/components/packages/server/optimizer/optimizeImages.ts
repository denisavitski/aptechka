import sharp from 'sharp'
import { ImageFileBox, OptimizedEntry } from './types'
import { extname } from 'path'

export async function optimizeImages(boxes: Array<ImageFileBox>) {
  for await (const box of boxes) {
    const settings = box.settings

    if (box.type === 'image') {
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
        format,
        buffer,
      })

      if (settings.webp) {
        const buffer = await image
          .webp({
            quality: settings.quality,
            effort: 5,
          })
          .toBuffer()

        entries.push({
          format: 'webp',
          buffer,
        })
      }

      if (settings.placeholder) {
        const buffer = await image.resize(20, 20).blur(10).toBuffer()

        entries.push({
          format: `placeholder.${format}`,
          buffer,
        })
      }

      return entries
    }
  }
}
