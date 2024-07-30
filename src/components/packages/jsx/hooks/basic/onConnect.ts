import { ComponentConnectCallback } from '@packages/jsx/ComponentElement'
import { currentComponentElement } from '@packages/jsx/globals'

export function onConnect(callback: ComponentConnectCallback) {
  currentComponentElement.value.addConnectCallback(callback)
}
