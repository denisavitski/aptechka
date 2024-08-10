import { CamelToKebab, camelToKebab } from '@packages/utils'

export interface CreateThemeOptions<P extends string = ''> {
  prefix?: P
}

export function createTheme<
  T extends { [key: string]: string },
  P extends string = ''
>(object: T, options?: CreateThemeOptions<P>) {
  const prefix = options?.prefix || ''

  const result: {
    [K in Extract<keyof T, string>]: {
      var: `var(--${P}${CamelToKebab<K>})`
      value: T[K]
    }
  } & {
    style: { [K in `--${P}${CamelToKebab<Extract<keyof T, string>>}`]: string }
  } = {
    style: {},
  } as any

  for (const key in object) {
    result[key] = {
      var: `var(--${prefix}${camelToKebab(key)})`,
      value: object[key],
    } as any
    ;(result.style as any)[`--${prefix}${camelToKebab(key)}`] = object[key]
  }

  return result
}
