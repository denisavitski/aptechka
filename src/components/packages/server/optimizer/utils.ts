import { clamp } from '../utils'

export function getNumberSetting<T extends number | undefined>(
  value: T,
  min: number,
  max: number
) {
  if (typeof value === 'number') {
    return clamp(value, min, max)
  }

  return value
}
