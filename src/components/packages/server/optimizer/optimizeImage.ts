import sharp from 'sharp'
import { ImageSource, Output } from './types'
import { replaceExtension } from './path'
import { extname } from 'path'

export async function optimizeImage(source: ImageSource) {
  const { settings } = source
  const ext = extname(settings.destinationPath).toLowerCase()
  const image = sharp(source.content)
  const meta = await image.metadata()
  const width = meta.width
  const height = meta.height

  const output: Output = []

  if (width && height) {
    if (settings?.scale) {
      image.resize(
        Math.floor(width * settings.scale),
        Math.floor(height * settings.scale)
      )
    }
  }

  if (ext === '.jpg' || ext === '.jpeg') {
    image.jpeg({
      mozjpeg: true,
      quality: settings?.quality,
    })
  } else if (ext === '.png') {
    image.png({
      compressionLevel: 9,
      adaptiveFiltering: true,
      quality: settings?.quality,
      effort: 8,
    })
  }

  const buffer = await image.toBuffer()

  output.push({
    data: buffer,
    destinationPath: settings.destinationPath,
  })

  if (settings?.webp) {
    const buffer = await image
      .webp({
        quality: settings.quality,
        effort: 5,
      })
      .toBuffer()

    output.push({
      data: buffer,
      destinationPath: replaceExtension(settings.destinationPath, 'webp'),
    })
  }

  if (settings?.placeholder) {
    const buffer = await image.resize(20, 20).blur(10).toBuffer()

    output.push({
      data: buffer,
      destinationPath: replaceExtension(
        settings.destinationPath,
        `placeholder${ext}`
      ),
    })
  }

  return output
}
