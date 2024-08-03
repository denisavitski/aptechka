import favicons from 'favicons'
import { FaviconFileBox, OptimizedEntry } from './types'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function generateFavicon(box: FaviconFileBox) {
  const entries: Array<OptimizedEntry> = []

  const settings = box.settings

  const response = await favicons(
    settings.destinationFolderPath,
    settings.options
  )

  entries.push(
    ...[...response.images, ...response.files].map((item) => {
      return {
        destinationPath: join(settings.destinationFolderPath, item.name),
        data: item.contents,
      }
    })
  )

  entries.push({
    destinationPath: settings.destinationHtmlPath,
    data: response.html.join('\n'),
  })

  return entries
}
