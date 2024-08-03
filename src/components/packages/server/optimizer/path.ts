export function removeExtension(path: string) {
  return path.split('.').slice(0, -1).join('.')
}

export function getExtension(path: string) {
  return path.split('.').slice(-1).join('.')
}

export function replaceExtension(path: string, newExtension: string) {
  return `${removeExtension(path)}.${newExtension}`
}
