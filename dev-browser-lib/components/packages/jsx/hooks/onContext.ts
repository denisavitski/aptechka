import { onConnect } from './onConnect'
import { withCurrentComponent } from './withCurrentComponent'

export type ContextCallback<T> = (context: T) => void | (() => void)

export function onContext<T>(name: string, callback: ContextCallback<T>) {
  onConnect((e) => {
    const context = e.findContext(name)

    if (!context) {
      console.warn(e, `Context "${name}" not found`)
      return
    }

    return callback(context)
  })
}

export function createContext(name: string, value: any) {
  withCurrentComponent((e) => {
    e.createContext(name, value)
  })
}
