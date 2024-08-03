import { mkdir, writeFile } from 'fs/promises'
import { dirname } from 'path'

export async function outputFile(path: string, data: Buffer | string) {
  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, data)
}
