import {
  ElementResizerCallback,
  elementResizer,
} from '@packages/element-resizer'
import { useConnect } from './basic'
import { HookElementTarget, getTargetElement } from './utils'

export function useElementResize(
  callback: ElementResizerCallback,
  element?: HookElementTarget
) {
  useConnect((e) => {
    return elementResizer.subscribe(getTargetElement(e, element), callback)
  })
}
