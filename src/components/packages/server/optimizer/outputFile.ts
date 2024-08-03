import { mkdir, writeFile } from 'fs/promises'
import { dirname } from 'path'

export async function outputFile(path: string, file: Buffer) {
  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, file)
}
