import { Store } from '@packages/store'
import type * as CSS from 'csstype'
import { subscribeToStore } from '../elementStoreSubscription'

export type StyleAttribute = Partial<{
  [K in keyof CSS.Properties]: CSS.Properties[K] | Store<any>
}>

export function setStyleAttribute(
  element: HTMLElement | SVGElement,
  value: StyleAttribute,
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
