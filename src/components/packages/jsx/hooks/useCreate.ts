import {
  ComponentCreateCallback,
  currentComponentElement,
} from '../ComponentElement'

export function useCreate<T = void>(callback: ComponentCreateCallback<T>) {
  return callback(currentComponentElement)
}
