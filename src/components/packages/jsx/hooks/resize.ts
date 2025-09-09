import {
  elementResizer,
  ElementResizerCallback,
} from '@packages/element-resizer'
import { windowResizer } from '@packages/window-resizer'
import { activeComponent } from '../ComponentElement'
import { useConnect } from './component/lifecycle'

export function useWindowResize(
  ...parameters: Parameters<(typeof windowResizer)['subscribe']>
) {
  if (activeComponent.current) {
    useConnect(() => {
      return windowResizer.subscribe(...parameters)
    })
  } else {
    windowResizer.subscribe(...parameters)
  }
}

export function useElementResize(callback: ElementResizerCallback) {
  useConnect((element) => {
    return elementResizer.subscribe(element, callback)
  })
}
