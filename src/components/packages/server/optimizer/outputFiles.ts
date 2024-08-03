import { mkdir, writeFile } from 'fs/promises'
import { OptimizedEntry } from './types'
import { dirname } from 'path'
import { outputFile } from './outputFile'

export async function outputFiles(entries: Array<OptimizedEntry>) {
  for await (const entry of entries) {
    await mkdir(dirname(entry.destinationPath), { recursive: true })
    await writeFile(entry.destinationPath, entry.data)
    outputFile(entry.destinationPath, entry.data)
  }
}
