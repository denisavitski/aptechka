import { ComponentDisconnectCallback } from '@packages/jsx/ComponentElement'
import { withCurrentComponent } from './withCurrentComponent'

export function onDisconnect(callback: ComponentDisconnectCallback) {
  withCurrentComponent((e) => {
    e.addDisconnectCallback(callback)
  })
}
