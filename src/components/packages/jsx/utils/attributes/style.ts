import { Store } from '@packages/store'
import { subscribeToStore } from '../elementStoreSubscription'

export type StyleToken = Exclude<
  Extract<keyof CSSStyleDeclaration, string> | `--${string}`,
  'length' | 'parentRule'
>

export type StyleValue = string | Store<any>

export type Style = Partial<{
  [K in StyleToken]: StyleValue
}>

export type StyleWrapper = {
  [key: string]: object | Style
}

export type JSS =
  | Style
  | {
      [key: string]: StyleWrapper | Style
    }

export function setStyleAttribute(
  element: HTMLElement | SVGElement,
  value: JSS,
) {
  if (!value) {
    return
  }

  if (typeof value === 'object') {
    Object.entries(value).forEach(([key, value]) => {
      if (value instanceof Store) {
        subscribeToStore(element, value, (e) => {
          element.style[key as any] = e.current.toString()
        })
      } else if (
        typeof value === 'number' ||
        typeof value === 'string' ||
        typeof value === 'boolean'
      ) {
        element.style[key as any] = value.toString()
      }
    })
  } else if (typeof value === 'string') {
    element.style = value
  }
}
