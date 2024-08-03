import { generateFavicon } from './generateFavicon'
import { generateSequence } from './generateSequence'
import { generateSprite } from './generateSprite'
import { optimizeImage } from './optimizeImage'
import { optimizeVideo } from './optimizeVideo'
import { KnownSource, Output } from './types'

export async function optimize(sources: Array<KnownSource>) {
  const output: Output = []

  for await (const source of sources) {
    if (source.type === 'image') {
      output.push(...(await optimizeImage(source)))
    } else if (source.type === 'video') {
      output.push(...(await optimizeVideo(source)))
    } else if (source.type === 'favicon') {
      output.push(...(await generateFavicon(source)))
    } else if (source.type === 'sprite') {
      output.push(...(await generateSprite(source)))
    } else if (source.type === 'sequence') {
      output.push(...(await generateSequence(source)))
    } else {
      output.push({
        data: source.content,
        destinationPath: source.settings.destinationPath,
      })
    }
  }

  return output
}
