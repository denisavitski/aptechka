import { currentComponentElement } from '@packages/jsx/globals'

export function attachInternals() {
  return currentComponentElement.value.attachInternals()
}
