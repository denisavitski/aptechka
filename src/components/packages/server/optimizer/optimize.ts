import { generateFavicon } from './generateFavicon'
import { optimizeImage } from './optimizeImage'
import { optimizeVideo } from './optimizeVideo'
import { KnownFileBox, OptimizedEntry } from './types'

export async function optimize(boxes: Array<KnownFileBox>) {
  const entries: Array<OptimizedEntry> = []

  for await (const box of boxes) {
    if (box.type === 'image') {
      entries.push(...(await optimizeImage(box)))
    } else if (box.type === 'video') {
      entries.push(...(await optimizeVideo(box)))
    } else if (box.type === 'favicon') {
      entries.push(...(await generateFavicon(box)))
    } else {
      entries.push({
        data: box.buffer,
        destinationPath: box.settings.destinationPath,
      })
    }
  }

  return entries
}
