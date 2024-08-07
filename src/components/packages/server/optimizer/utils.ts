import { clamp } from '../utils'

export function getNumberSetting<T extends number | undefined>(
  value: T,
  restricstions?: { min: number; max: number }
) {
  if (typeof value === 'number' && restricstions) {
    return clamp(value, restricstions.min, restricstions.max)
  }

  return value
}
