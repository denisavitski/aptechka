import { randomUUID } from 'crypto'
import { OptimizedEntry, VideoFileBox } from './types'
import { dirname } from 'path'
import { mkdir, readFile } from 'fs/promises'
import { clear } from './clear'
import { outputFile } from './outputFile'
import Ffmpeg from 'fluent-ffmpeg'

const tmpPath = (path: string) => {
  const random = randomUUID()

  const splitted = path.split('.')
  const left = splitted.slice(0, -1).join('.')
  const right = splitted.slice(-1).join('.')

  return `${left}.${random}.${right}`
}

export async function optimizeVideo(box: VideoFileBox) {
  const settings = box.settings

  const entry = await new Promise<OptimizedEntry>(async (resolve, reject) => {
    const inputPath = tmpPath(box.path)
    const outputPath = tmpPath(box.path)

    await outputFile(inputPath, box.file)
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
        resolve({ buffer, path: box.path })
      })
      .on('error', async (e) => {
        await clear(inputPath, outputPath)
        reject(e)
      })
      .saveToFile(outputPath)
  })

  return [entry]
}
