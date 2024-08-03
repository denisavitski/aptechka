import { rm } from 'fs/promises'

export async function clear(...paths: Array<string>) {
  return Promise.all(
    paths.map((p) => {
      return rm(p, { force: true, recursive: true })
    })
  )
}
