import { isBrowser } from '@packages/utils'
import {
  ComponentElementCreateCallback,
  currentComponentElement,
  ComponentElementConnectCallback,
} from '../ComponentElement'

export function useCreate(callback: ComponentElementCreateCallback) {
  currentComponentElement.addCreateCallback(callback)
}

export function useConnect(callback: ComponentElementConnectCallback) {
  if (isBrowser) {
    currentComponentElement.addConnectCallback(callback)
  }
}

export function useDisconnect(callback: ComponentElementConnectCallback) {
  if (isBrowser) {
    currentComponentElement.addDisconnectCallback(callback)
  }
}
