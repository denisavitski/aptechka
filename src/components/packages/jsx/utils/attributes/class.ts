import { Store } from '@packages/store'
import { subscribeToStore } from '../elementStoreSubscription'

export type ClassPrimitiveValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Store<any>

export type ClassValue =
  | ClassPrimitiveValue
  | Record<string, ClassPrimitiveValue>

export type ClassListInput =
  | Record<string, ClassPrimitiveValue>
  | Array<ClassValue>
  | ClassPrimitiveValue

export function setClassAttribute(element: Element, classes: ClassListInput) {
  if (!classes) {
    return
  }

  if (classes instanceof Store) {
    subscribeToStore(element, classes, (e) => {
      if (e.previous) {
        element.classList.remove(e.previous.toString())
      }

      if (e.current) {
        element.classList.add(e.current.toString())
      }
    })
  } else if (typeof classes === 'object' && !Array.isArray(classes)) {
    Object.entries(classes).forEach(([key, value]) => {
      if (value instanceof Store) {
        subscribeToStore(element, value, (e) => {
          element.classList.toggle(key, !!e.current)
        })
      } else if (Boolean(value)) {
        element.classList.add(key)
      }
    })
  } else if (Array.isArray(classes)) {
    classes.forEach((item) => {
      if (typeof item === 'string') {
        element.classList.add(item)
      } else {
        setClassAttribute(element, item)
      }
    })
  } else {
    classes
      .toString()
      .split(' ')
      .map((v) => {
        return element.classList.add(v.trim())
      })
  }
}
