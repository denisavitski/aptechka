import { currentComponentElement } from '@packages/jsx/globals'

export function attachShadow(init?: ShadowRootInit) {
  return currentComponentElement.value.attachShadow({ mode: 'open', ...init })
}
