import { Store } from '@packages/store'
import { ComponentElement, currentComponentElement } from '../ComponentElement'
import { onDisconnect } from './onDisconnect'

export function _createStore<T extends Store<any, any, any>>(
  arg: T | ((e: ComponentElement | null) => T)
) {
  const store = typeof arg === 'function' ? arg(currentComponentElement) : arg

  if (currentComponentElement) {
    onDisconnect(() => store.close())
  }

  return store
}
