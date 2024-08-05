import { VideoSource } from './types'
import { FFmpeg } from './FFmpeg'
import { getBuffer } from '../utils'

export async function optimizeVideo(source: VideoSource) {
  const { settings } = source

  const buffer = await getBuffer(source.content)

  return FFmpeg({
    inputPath: settings.destinationPath,
    fileContent: buffer,
    instructions: (command) => {
      command.addOutputOption(
        `-crf ${Math.round(((100 - (settings?.quality || 80)) * 51) / 100)}`
      )

      if (settings?.fps) {
        command.fps(settings.fps)
      }

      command.size(`${(settings?.scale || 1) * 100}%`)
    },
  })
}
