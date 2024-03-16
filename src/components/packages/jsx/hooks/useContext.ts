import { useConnect } from './useConnect'
import { useCreate } from './useCreate'

export type ContextCallback<T> = (context: T) => void | (() => void)

export function useContext<T>(name: string, callback: ContextCallback<T>) {
  useConnect((e) => {
    const context = e.findContext(name)

    if (!context) {
      console.warn(e, `Context "${name}" not found`)
      return
    }

    return callback(context)
  })
}

export function createContext(name: string, value: any) {
  useCreate((e) => {
    e.createContext(name, value)
  })
}
