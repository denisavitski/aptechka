import { optimizeImage } from './optimizeImage'
import { KnownFileBox, OptimizedEntry } from './types'

export async function optimize(boxes: Array<KnownFileBox>) {
  const entries: Array<OptimizedEntry> = []

  for await (const box of boxes) {
    if (box.type === 'image') {
      entries.push(...(await optimizeImage(box)))
    }
  }

  return entries
}
