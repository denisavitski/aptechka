import { withCurrentComponent } from './withCurrentComponent'
import { ComponentDisconnectCallback } from '../ComponentElement'

export function onDisconnect(callback: ComponentDisconnectCallback) {
  withCurrentComponent((e) => {
    e.addDisconnectCallback(callback)
  })
}
