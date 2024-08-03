import { currentComponentElement } from '@packages/client/jsx/globals'

export function attachShadow(init?: ShadowRootInit) {
  return currentComponentElement.value.attachShadow({ mode: 'open', ...init })
}
