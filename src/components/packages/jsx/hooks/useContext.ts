import { Store } from '@packages/store'
import { useConnect } from './useConnect'
import { useCreate } from './useCreate'

export function useContext<T>(name: string) {
  const store = new Store<T>(null!)

  useConnect((e) => {
    const context = e.findContext(name)
    if (context) {
      store.current = context
    } else {
      console.warn(e, `Context "${name}" not found`)
    }

    return () => {
      store.close()
    }
  })

  return store
}

export function createContext(name: string, value: any) {
  useCreate((e) => {
    e.createContext(name, value)
  })
}
