import { contexts, onAfterCreate, onBeforeCreate } from '../Component'

export function createContext<Context>(name: string, value: Context) {
  onBeforeCreate((e) => {
    contexts.set(name, {
      element: e,
      value,
    })
  })
}

export function getContext<Context>(name: string) {
  return contexts.get(name)?.value as Context
}
