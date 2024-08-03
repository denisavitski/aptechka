import favicons from 'favicons'
import { FaviconSource, Output } from './types'
import { join } from 'path'

export async function generateFavicon(source: FaviconSource) {
  const output: Output = []

  const { settings } = source

  const response = await favicons(source.content, settings)

  output.push(
    ...[...response.images, ...response.files].map((item) => {
      return {
        destinationPath: join(settings.destinationPath, item.name),
        data: item.contents,
      }
    })
  )

  output.push({
    destinationPath: settings.destinationHtmlPath,
    data: response.html.join('\n'),
  })

  return output
}
