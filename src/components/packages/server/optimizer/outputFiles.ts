import { mkdir, writeFile } from 'fs/promises'
import { OptimizedEntry } from './types'
import { dirname } from 'path'
import { outputFile } from './outputFile'

export async function outputFiles(entries: Array<OptimizedEntry>) {
  for await (const entry of entries) {
    await mkdir(dirname(entry.path), { recursive: true })
    await writeFile(entry.path, entry.buffer)
    outputFile(entry.path, entry.buffer)
  }
}
