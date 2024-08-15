import { useCallback, useSyncExternalStore } from 'react'
import { Store } from '../vanilla'

export function useStore<T>(store: Store<T>) {
  const subscribe = useCallback(store.subscribe.bind(store), [store])

  const snapShot = useSyncExternalStore(
    subscribe,
    () => {
      return store.current
    },
    () => {
      return store.current
    }
  )

  const setState = (value: T) => {
    store.current = value
  }

  return [snapShot, setState] as const
}
