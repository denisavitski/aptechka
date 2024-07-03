import { ComponentConnectCallback } from '@packages/jsx/ComponentElement'
import { withCurrentComponent } from './withCurrentComponent'

export function onConnect(callback: ComponentConnectCallback) {
  withCurrentComponent((e) => {
    e.addConnectCallback(callback)
  })
}
