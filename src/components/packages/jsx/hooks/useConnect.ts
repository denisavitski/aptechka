import { ComponentConnectCallback } from '../ComponentElement'
import { useCreate } from './useCreate'

export function useConnect(callback: ComponentConnectCallback) {
  useCreate((e) => {
    e.addConnectCallback(callback)
  })
}
