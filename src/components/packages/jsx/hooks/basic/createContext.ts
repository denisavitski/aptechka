import { contextStack, currentComponentElement } from '@packages/jsx/globals'

export function getContext<T>(name: string) {
  const contextMap = contextStack.value.find((contextMap) =>
    contextMap.has(name)
  )

  if (contextMap) {
    return contextMap.get(name) as T
  }
}

export function createContext(name: string, value: any) {
  currentComponentElement.value.createContext(name, value)
}
