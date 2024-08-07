import { VideoSource } from './types'
import { FFmpeg } from './FFmpeg'
import { getBuffer } from '../utils'
import { getNumberSetting } from './utils'

export async function optimizeVideo(source: VideoSource) {
  const { settings } = source

  const buffer = await getBuffer(source.content)

  const quality = getNumberSetting(settings?.quality, 80)
  const fps = getNumberSetting(settings?.quality, 0)
  const scale = getNumberSetting(settings?.scale, 1)

  return FFmpeg({
    inputPath: settings.destinationPath,
    fileContent: buffer,
    instructions: (command) => {
      command.addOutputOption(
        `-crf ${Math.round(((100 - quality) * 51) / 100)}`
      )

      if (fps) {
        command.fps(fps)
      }

      command.size(`${scale * 100}%`)
    },
  })
}
