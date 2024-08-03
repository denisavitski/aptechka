import { VideoSource } from './types'
import { FFmpeg } from './FFmpeg'

export async function optimizeVideo(source: VideoSource) {
  const { settings } = source

  return FFmpeg({
    inputPath: settings.destinationPath,
    fileContent: source.content,
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
