import { WindowResizerCallback, windowResizer } from '@packages/window-resizer'
import { useConnect } from './basic'

export function useWindowResize(
  callback: WindowResizerCallback,
  order?: number | undefined
) {
  useConnect(() => {
    return windowResizer.subscribe(callback, order)
  })
}
