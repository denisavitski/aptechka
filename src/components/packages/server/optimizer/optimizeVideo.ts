import { randomUUID } from 'crypto'
import { OptimizedEntry, VideoFileBox } from './types'
import { dirname } from 'path'
import { mkdir, readFile } from 'fs/promises'
import { clear } from './clear'
import { outputFile } from './outputFile'
import Ffmpeg from 'fluent-ffmpeg'
import { getExtension, removeExtension } from './path'

const tmpPath = (path: string) => {
  const random = randomUUID()

  return `${removeExtension(path)}.${random}.${getExtension(path)}`
}

export async function optimizeVideo(box: VideoFileBox) {
  const settings = box.settings

  const entry = await new Promise<OptimizedEntry>(async (resolve, reject) => {
    const inputPath = tmpPath(settings.destinationPath)
    const outputPath = tmpPath(settings.destinationPath)

    await outputFile(inputPath, box.buffer)
    await mkdir(dirname(outputPath), { recursive: true })

    let command = Ffmpeg(inputPath).outputOptions([
      `-crf ${Math.round(((100 - settings.quality) * 51) / 100)}`,
    ])

    if (settings.fps && settings.fps !== 'auto') {
      command.fps(settings.fps)
    }

    command
      .size(`${settings.scale * 100}%`)
      .on('end', async () => {
        const buffer = await readFile(outputPath)
        await clear(inputPath, outputPath)
        resolve({ data: buffer, destinationPath: settings.destinationPath })
      })
      .on('error', async (e) => {
        await clear(inputPath, outputPath)
        reject(e)
      })
      .saveToFile(outputPath)
  })

  return [entry]
}
