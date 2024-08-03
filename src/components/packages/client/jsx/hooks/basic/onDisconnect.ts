import { ComponentDisconnectCallback } from '@packages/client/jsx/ComponentElement'
import { currentComponentElement } from '@packages/client/jsx/globals'

export function onDisconnect(callback: ComponentDisconnectCallback) {
  currentComponentElement.value.addDisconnectCallback(callback)
}
