import { connector } from '@packages/connector'
import { Store, StoreSubscribeCallback } from '@packages/store'

export function subscribeToStore<T>(
  element: Element,
  store: Store<T>,
  callback: StoreSubscribeCallback<T>,
) {
  const unsubscribe = store.subscribe((e) => {
    callback(e)
  })

  connector.subscribe(element, {
    disconnectCallback: () => {
      unsubscribe()
    },
    maxWaitSec: 20,
    unsubscribeAfterDisconnect: true,
  })
}
