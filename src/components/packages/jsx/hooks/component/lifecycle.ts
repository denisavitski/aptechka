import {
  activeComponent,
  ComponentConnectCallback,
  ComponentDisconnectCallback,
} from '@packages/jsx/ComponentElement'

export function useComponent(callback?: ComponentConnectCallback) {
  if (callback) {
    callback(activeComponent.current)
  }

  return activeComponent.current
}

export function useConnect(callback: ComponentConnectCallback) {
  activeComponent.current.addConnectCallback(callback)
}

export function useDisconnect(callback: ComponentDisconnectCallback) {
  activeComponent.current.addDisconnectCallback(callback)
}
