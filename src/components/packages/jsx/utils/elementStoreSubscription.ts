import { connector } from '@packages/connector'
import { Store, StoreSubscribeCallback } from '@packages/store'

const nodesSubscribedToStores: Array<{
  node: Node
  unsubscribeCallbacks: Array<() => void>
}> = []

export function subscribeToStore<T>(
  element: Element,
  store: Store<T>,
  callback: StoreSubscribeCallback<T>,
) {
  const unsubscribe = store.subscribe((e) => {
    callback(e)
  })

  let founded = nodesSubscribedToStores.find((node) => node.node === element)

  if (!founded) {
    founded = {
      node: element,
      unsubscribeCallbacks: [],
    }
  }

  founded.unsubscribeCallbacks.push(unsubscribe)

  connector.subscribe(element, {
    disconnectCallback: () => {
      founded.unsubscribeCallbacks.forEach((callback) => {
        callback()
      })
    },
    maxWaitSec: 20,
    unsubscribeAfterDisconnect: true,
  })
}
