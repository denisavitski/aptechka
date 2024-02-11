import {
  ConnectCallback,
  currentComponentElement,
} from './ComponentCustomElement'

export function useConnect(callback: ConnectCallback) {
  currentComponentElement.connectCallbacks.add(callback)
}

export function useDisconnect(callback: ConnectCallback) {
  currentComponentElement.disconnectCallbacks.add(callback)
}
