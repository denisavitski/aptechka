import { WindowResizer, windowResizer } from '@packages/window-resizer'
import { onConnect } from './basic/onConnect'

export function onWindowResize(
  ...parameters: Parameters<WindowResizer['subscribe']>
) {
  onConnect(() => {
    return windowResizer.subscribe(...parameters)
  })
}
