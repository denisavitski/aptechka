import {
  ElementResizerCallback,
  elementResizer,
} from '@packages/element-resizer'
import { ElementOrSelector } from '@packages/utils'
import { WindowResizerCallback, windowResizer } from '@packages/window-resizer'
import { ElementConstructorRef } from '@packages/element-constructor'

import { onConnect } from '../Component'

export function onElementResize(
  callback: ElementResizerCallback,
  element?: ElementOrSelector | ElementConstructorRef
) {
  onConnect((e) => {
    const target = element ? element : e instanceof Element ? e : undefined

    if (typeof target === 'string' || target instanceof Element) {
      return elementResizer.subscribe(target, callback)
    } else if (target?.current) {
      return elementResizer.subscribe(target.current, callback)
    }
  })
}

export function onWindowResize(
  callback: WindowResizerCallback,
  order?: number
) {
  onConnect((e) => {
    return windowResizer.subscribe(callback, order)
  })
}
