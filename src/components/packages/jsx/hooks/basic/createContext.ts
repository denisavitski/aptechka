import { contextStack } from '@packages/jsx/globals'
import { withCurrentComponent } from './withCurrentComponent'

export function getContext<T>(name: string) {
  const contextMap = contextStack.value.find((contextMap) =>
    contextMap.has(name)
  )

  if (contextMap) {
    return contextMap.get(name) as T
  }
}

export function createContext(name: string, value: any) {
  withCurrentComponent((e) => {
    e.createContext(name, value)
  })
}
