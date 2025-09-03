import { Store } from '@packages/store'
import { subscribeToStore } from '../elementStoreSubscription'
import { ClassListInput, setClassAttribute } from './class'
import { setStyleAttribute } from './style'

export function setAttribute(element: Element, key: string, value: unknown) {
  if (key === 'ref' && value) {
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (typeof v === 'object' && 'value' in v) {
          v.value = element
        }
      })
    } else if (typeof value === 'object' && 'value' in value) {
      value.value = element
    }
  } else if (key === 'className' || key === 'class') {
    setClassAttribute(element, value as ClassListInput)
  } else if (key === 'style') {
    setStyleAttribute(element as HTMLElement, value as any)
  } else if (key === 'setHtml') {
    element.innerHTML = value as any
  } else if (typeof value === 'number') {
    if (key === 'tabIndex') {
      element.setAttribute('tabindex', value.toString())
    } else {
      setAttribute(element, key, value.toString())
    }
  } else if (typeof value === 'string') {
    if (key === 'htmlFor') {
      element.setAttribute('for', value)
    } else {
      element.setAttribute(key, value)
    }
  } else if (typeof value === 'boolean') {
    if (value) {
      element.setAttribute(key, '')
    } else {
      element.removeAttribute(key)
    }
  } else if (value instanceof Store) {
    subscribeToStore(element, value, (e) => {
      if (key in element) {
        ;(element as any)[key] = e.current
      } else {
        setAttribute(element, key, e.current)
      }
    })
  }
}

export function setAttributes(ele: Element, attributes?: JSX.Attributes) {
  for (const [key, value] of Object.entries(attributes ?? {})) {
    if (typeof value === 'function') {
      if (!key.startsWith('on')) {
        setAttribute(ele, key, value)
      } else {
        ele.addEventListener(
          key.replace('on', '').toLowerCase() as any,
          value as EventListener,
        )
      }
    } else {
      setAttribute(ele, key, value)
    }
  }
}
