import { useConnect } from '@packages/jsx/hooks'
import { WindowResizer, windowResizer } from '..'

export function useWindowResize(
  ...parameters: Parameters<WindowResizer['subscribe']>
) {
  useConnect(() => {
    return windowResizer.subscribe(...parameters)
  })
}
