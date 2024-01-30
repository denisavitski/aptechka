const precision = [
  1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000,
]

export function preciseNumber(number: number, n: number = 5): number {
  return ((0.5 + number * precision[n]) << 0) / precision[n]
}

export function roundNumberTo(number: number, to: number) {
  return Math.round(number / to) * to
}
