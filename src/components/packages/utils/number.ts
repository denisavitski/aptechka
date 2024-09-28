const precision = [
  1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000,
  10000000000,
]

export function preciseNumber(number: number, n: number = 5): number {
  return Math.round(number * precision[n]) / precision[n]
}

export function roundNumberTo(number: number, to: number) {
  return Math.round(number / to) * to
}

export function toStep(value: number, step: number) {
  const remainLength = step.toString().split('.')[1]?.length || 0

  if (remainLength) {
    return +value.toFixed(remainLength)
  } else {
    return Math.ceil(value)
  }
}

export function loopNumber(value: number, max: number) {
  value = value % max
  value = value < 0 ? max + value : value

  return value
}
