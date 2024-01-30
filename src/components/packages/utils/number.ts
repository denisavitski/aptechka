const precision = [
  1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000,
]

export function fix(number: number, n: number = 5): number {
  return ((0.5 + number * precision[n]) << 0) / precision[n]
}

export function roundTo(number: number, to: number) {
  return Math.round(number / to) * to
}

export function generateId(
  length: number,
  characters = 'abcdefghijklmnopqrstuvwxyz0123456789',
): string {
  const charactersLength = characters.length
  const key = crypto.getRandomValues(new Uint8Array(length))

  let generatedKey = ''
  for (let i = 0; i < length; i++) {
    generatedKey += characters.charAt(key[i] % charactersLength)
  }

  return generatedKey
}
