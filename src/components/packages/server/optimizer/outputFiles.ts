import { writeFile } from 'fs/promises'
import { OptimizedEntry } from './types'

export async function outputFiles(entries: Array<OptimizedEntry>) {
  for await (const entry of entries) {
    await writeFile(entry.path, entry.buffer)
  }
}
