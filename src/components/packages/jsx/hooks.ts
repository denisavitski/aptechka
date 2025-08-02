import { Derived, DerivedArray, Store, StoreOptions } from '@packages/store'
import {
  activeComponent,
  ComponentConnectCallback,
  ComponentDisconnectCallback,
  ComponentInternalsCallback,
} from './ComponentElement'

export function useConnect(callback: ComponentConnectCallback) {
  activeComponent.current.addConnectCallback(callback)
}

export function useDisconnect(callback: ComponentDisconnectCallback) {
  activeComponent.current.addDisconnectCallback(callback)
}

export function useInternals(callback?: ComponentInternalsCallback) {
  const internals = activeComponent.current.attachInternals()

  callback?.(internals)

  return internals
}

export function useComponent() {
  return activeComponent!.current
}

export function useRef<T>() {
  const ref: { current: T | null } = { current: null }

  return ref
}

export function useStore<StoreType = unknown>(
  ...parameters: ConstructorParameters<typeof Store<StoreType>>
) {
  const store = new Store<StoreType>(...parameters)

  if (activeComponent.current) {
    activeComponent.current.addDisconnectCallback(() => {
      store.close()
    })
  }

  return store
}

export function useDerivedStore<Type, SourceType>(
  ...parameters: ConstructorParameters<typeof Derived<Type, SourceType>>
) {
  const derived = new Derived<Type, SourceType>(...parameters)

  if (activeComponent.current) {
    activeComponent.current.addDisconnectCallback(() => {
      derived.close()
    })
  }

  return derived
}

export function useDerivedArrayStore<Type, SourceType extends Array<any>>(
  ...parameters: ConstructorParameters<typeof DerivedArray<Type, SourceType>>
) {
  const derived = new DerivedArray<Type, SourceType>(...parameters)

  if (activeComponent.current) {
    activeComponent.current.addDisconnectCallback(() => {
      derived.close()
    })
  }

  return derived
}
