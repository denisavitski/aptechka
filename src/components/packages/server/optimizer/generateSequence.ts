import { SequenceSource } from './types'
import { FFmpeg } from './FFmpeg'
import { removeExtension } from '../utils'

export async function generateSequence(source: SequenceSource) {
  const { settings } = source

  return FFmpeg({
    inputPath: settings.destinationPath,
    outputPath: `${removeExtension(settings.destinationPath)}/frame-%04d.${
      settings.frameExtension || 'jpg'
    }`,
    fileContent: source.content,
    instructions: (command) => {
      if (settings.fps) {
        command.addOutputOption([`-r ${Math.max(1, settings.fps | 0)}`])
      }
    },
  })
}
