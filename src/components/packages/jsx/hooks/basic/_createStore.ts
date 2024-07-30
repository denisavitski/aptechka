import { Store } from '@packages/store'
import { onDisconnect } from './onDisconnect'
import { ComponentElement } from '@packages/jsx/ComponentElement'
import { currentComponentElement } from '@packages/jsx/globals'

export function _createStore<T extends Store<any, any>>(
  arg: T | ((e: ComponentElement | null) => T)
) {
  const store =
    typeof arg === 'function' ? arg(currentComponentElement.value) : arg

  if (currentComponentElement) {
    onDisconnect(() => store.close())
  }

  return store
}
