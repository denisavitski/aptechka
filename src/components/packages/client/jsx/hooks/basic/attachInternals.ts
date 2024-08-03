import { currentComponentElement } from '@packages/client/jsx/globals'

export function attachInternals() {
  return currentComponentElement.value.attachInternals()
}
