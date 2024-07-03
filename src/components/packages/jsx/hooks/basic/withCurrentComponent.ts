import { ComponentCreateCallback } from '@packages/jsx/ComponentElement'
import { currentComponentElement } from '@packages/jsx/globals'

export function withCurrentComponent<T = void>(
  callback: ComponentCreateCallback<T>
) {
  return callback(currentComponentElement.value)
}
