import sharp from 'sharp'
import { ImageSource } from './types'
import { extname } from 'path'
import { getBuffer, Output, replaceExtension } from '../utils'
import { getNumberSetting } from './utils'

export async function optimizeImage(source: Omit<ImageSource, 'type'>) {
  const { settings, restrictions } = source

  const content = await getBuffer(source.content)
  const ext = extname(settings.destinationPath).toLowerCase()
  const image = sharp(content)
  const meta = await image.metadata()
  const width = meta.width
  const height = meta.height

  const output: Output = []

  const scale = getNumberSetting(settings.scale, restrictions?.scale)
  const quality = getNumberSetting(settings.quality, restrictions?.quality)

  if (width && height) {
    if (scale) {
      image.resize(Math.floor(width * scale), Math.floor(height * scale))
    }
  }

  if (ext === '.jpg' || ext === '.jpeg') {
    image.jpeg({
      mozjpeg: true,
      quality: quality,
    })
  } else if (ext === '.png') {
    image.png({
      compressionLevel: 9,
      adaptiveFiltering: true,
      quality: quality,
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
        quality: quality,
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
