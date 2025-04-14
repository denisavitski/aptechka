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

export function beautifyNumber(number: string | number) {
  number = number.toString().replace(/\s/g, '')

  number = Math.ceil(+number)

  number = number.toString()

  const trimmed = number.trim()

  let result = ''

  if (trimmed.length === 4) {
    result = `${trimmed.slice(0, 1)} ${trimmed.slice(1)}`
  } else if (trimmed.length === 5) {
    result = `${trimmed.slice(0, 2)} ${trimmed.slice(2)}`
  } else if (trimmed.length === 6) {
    result = `${trimmed.slice(0, 3)} ${trimmed.slice(3)}`
  } else if (trimmed.length === 7) {
    result = `${trimmed.slice(0, 1)} ${trimmed.slice(1, 4)} ${trimmed.slice(4)}`
  } else if (trimmed.length === 8) {
    result = `${trimmed.slice(0, 2)} ${trimmed.slice(2, 5)} ${trimmed.slice(5)}`
  } else if (trimmed.length === 9) {
    result = `${trimmed.slice(0, 3)} ${trimmed.slice(3, 6)} ${trimmed.slice(6)}`
  } else {
    result = trimmed
  }

  return result
}
