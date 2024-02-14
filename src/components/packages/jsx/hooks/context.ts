import { contexts, currentComponentElement } from '../ComponentElement'

export function createContext(name: string, value: any) {
  contexts.set(name, {
    componentElement: currentComponentElement,
    value,
  })
}

export function useContext<T>(name: string): T | undefined {
  return contexts.get(name)?.value
}
