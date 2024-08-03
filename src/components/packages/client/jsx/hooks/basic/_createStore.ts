import { Store } from '@packages/client/store'
import { onDisconnect } from './onDisconnect'
import { ComponentElement } from '@packages/client/jsx/ComponentElement'
import { currentComponentElement } from '@packages/client/jsx/globals'

export function _createStore<T extends Store<any, any>>(
  arg: T | ((e: ComponentElement | null) => T)
) {
  const store =
    typeof arg === 'function' ? arg(currentComponentElement.value) : arg

  if (currentComponentElement.value) {
    onDisconnect(() => store.close())
  }

  return store
}
