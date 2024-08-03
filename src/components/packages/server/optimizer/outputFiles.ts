import { mkdir, writeFile } from 'fs/promises'
import { Output } from './types'
import { dirname } from 'path'
import { outputFile } from './outputFile'

export async function outputFiles(output: Output) {
  for await (const item of output) {
    await mkdir(dirname(item.destinationPath), { recursive: true })
    await writeFile(item.destinationPath, item.data)
    outputFile(item.destinationPath, item.data)
  }
}
