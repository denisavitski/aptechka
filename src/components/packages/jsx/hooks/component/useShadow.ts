import { activeComponent } from '@packages/jsx/ComponentElement'

export type UseShadowCallback = (shadowRoot: ShadowRoot) => void
export function useShadow(
  init?: Partial<ShadowRootInit>,
  callback?: UseShadowCallback,
) {
  if (!activeComponent.current.shadowRoot) {
    const shadowRoot = activeComponent.current.attachShadow({
      mode: 'open',
      ...init,
    })
    callback?.(shadowRoot)
  }

  return activeComponent.current.shadowRoot
}
