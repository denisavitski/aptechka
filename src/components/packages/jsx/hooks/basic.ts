import { isBrowser } from '@packages/utils'
import {
  ComponentElementCreateCallback,
  currentComponentElement,
  ComponentElementConnectCallback,
} from '../ComponentElement'

export function useCreate(callback: ComponentElementCreateCallback) {
  currentComponentElement.createCallbacks.add(callback)
}

export function useConnect(callback: ComponentElementConnectCallback) {
  if (isBrowser) {
    currentComponentElement.connectCallbacks.add(callback)
  }
}

export function useDisconnect(callback: ComponentElementConnectCallback) {
  if (isBrowser) {
    currentComponentElement.disconnectCallbacks.add(callback)
  }
}
