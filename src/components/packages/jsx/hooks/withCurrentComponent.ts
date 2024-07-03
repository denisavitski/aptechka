import {
  ComponentCreateCallback,
  currentComponentElement,
} from '../ComponentElement'

export function withCurrentComponent<T = void>(
  callback: ComponentCreateCallback<T>
) {
  return callback(currentComponentElement)
}
