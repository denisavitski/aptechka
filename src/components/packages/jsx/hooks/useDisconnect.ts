import { useCreate } from './useCreate'
import { ComponentDisconnectCallback } from '../ComponentElement'

export function useDisconnect(callback: ComponentDisconnectCallback) {
  useCreate((e) => {
    e.addDisconnectCallback(callback)
  })
}
