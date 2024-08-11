import { isBrowser } from './browser'
import { camelToKebab } from './string'

export type StyleToken = Exclude<
  Extract<keyof CSSStyleDeclaration, string> | `--${string}`,
  'length' | 'parentRule'
>

export type StyleAttribute = Partial<{
  [K in StyleToken]: string | number
}>

export type StyleWrapper = {
  [key: string]: object | StyleAttribute
}

export type Style =
  | StyleAttribute
  | {
      [key: string]: StyleWrapper | StyleAttribute
    }

export function styleToString(object: Style) {
  let text = ''

  for (const key in object) {
    const value = (object as any)[key]

    if (typeof value === 'object') {
      text += `${key} {`
      text += styleToString(value)
      text += `}`
    } else {
      text += `${camelToKebab(key)}: ${value};`
    }
  }

  return text
}

export function createStylesheet(object: Style) {
  if (isBrowser) {
    const styleSheet = new CSSStyleSheet()

    styleSheet.replaceSync(styleToString(object))

    return styleSheet
  }

  return null!
}
