import { Store } from '@packages/store'
import { onDisconnect } from './onDisconnect'

export function onStoreChange<S extends Store<any, any>>(
  store: S,
  callback: Parameters<S['subscribe']>['0']
) {
  const unsub = store.subscribe(callback)

  onDisconnect(() => {
    unsub()
  })
}
