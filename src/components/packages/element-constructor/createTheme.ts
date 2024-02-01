import { CamelToKebab, camelToKebab } from '@packages/utils'

export function createTheme<T extends { [key: string]: string }>(object: T) {
  const result: {
    [K in Extract<keyof T, string>]: {
      var: `var(--${CamelToKebab<K>})`
      value: T[K]
    }
  } & {
    style: { [K in `--${CamelToKebab<Extract<keyof T, string>>}`]: string }
  } = {
    style: {},
  } as any

  for (const key in object) {
    result[key] = {
      var: `var(--${camelToKebab(key)})`,
      value: object[key],
    } as any
    ;(result.style as any)[`--${camelToKebab(key)}`] = object[key]
  }

  return result
}
