import { activeComponent } from '@packages/jsx/ComponentElement'

export type UseInternalsCallback = (internals: ElementInternals) => void
export function useInternals(callback?: UseInternalsCallback) {
  const internals = activeComponent.current.attachInternals()

  callback?.(internals)

  return internals
}
