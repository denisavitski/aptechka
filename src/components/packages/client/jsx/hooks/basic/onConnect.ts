import { ComponentConnectCallback } from '@packages/client/jsx/ComponentElement'
import { currentComponentElement } from '@packages/client/jsx/globals'

export function onConnect(callback: ComponentConnectCallback) {
  currentComponentElement.value.addConnectCallback(callback)
}
