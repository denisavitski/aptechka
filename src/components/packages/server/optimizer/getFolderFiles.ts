import { readdir, readFile } from 'fs/promises'
import { extname, join } from 'path'
import { removeExtension } from './path'

export async function getFolderFiles(folderPath: string) {
  const leafs = await readdir(folderPath)

  const files: Array<{
    name: string
    path: string
    ext: string
    buffer: Buffer
  }> = []

  for await (const leaf of leafs) {
    const buffer = await readFile(join(folderPath, leaf))

    files.push({
      name: removeExtension(leaf),
      path: join(folderPath, leaf),
      ext: extname(leaf),
      buffer: buffer,
    })
  }

  return files
}
