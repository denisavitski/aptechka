import {
  elementResizer,
  ElementResizerCallback,
} from '@packages/element-resizer'
import { windowResizer } from '@packages/window-resizer'
import { useConnect } from './component/lifecycle'

export function useWindowResize(
  ...parameters: Parameters<(typeof windowResizer)['subscribe']>
) {
  useConnect(() => {
    return windowResizer.subscribe(...parameters)
  })
}

export function useElementResize(callback: ElementResizerCallback) {
  useConnect((element) => {
    return elementResizer.subscribe(element, callback)
  })
}
