import { onConnect } from '@packages/jsx/hooks'
import { WindowResizer, windowResizer } from '..'

export function onWindowResize(
  ...parameters: Parameters<WindowResizer['subscribe']>
) {
  onConnect(() => {
    return windowResizer.subscribe(...parameters)
  })
}
