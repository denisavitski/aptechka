import { ComponentDisconnectCallback } from '@packages/jsx/ComponentElement'
import { currentComponentElement } from '@packages/jsx/globals'

export function onDisconnect(callback: ComponentDisconnectCallback) {
  currentComponentElement.value.addDisconnectCallback(callback)
}
