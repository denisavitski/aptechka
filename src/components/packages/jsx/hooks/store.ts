import {
  Composed,
  Derived,
  DerivedArray,
  DerivedKeyedArray,
  Resource,
  Store,
} from '@packages/store'
import { activeComponent } from '../ComponentElement'

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
  const store = new Derived<Type, SourceType>(...parameters)

  if (activeComponent.current) {
    activeComponent.current.addDisconnectCallback(() => {
      store.close()
    })
  }

  return store
}

export function useDerivedArrayStore<Type, SourceType extends Array<any>>(
  ...parameters: ConstructorParameters<typeof DerivedArray<Type, SourceType>>
) {
  const store = new DerivedArray<Type, SourceType>(...parameters)

  if (activeComponent.current) {
    activeComponent.current.addDisconnectCallback(() => {
      store.close()
    })
  }

  return store
}

export function useDerivedKeyedArrayStore<Type, SourceType extends Array<any>>(
  ...parameters: ConstructorParameters<
    typeof DerivedKeyedArray<Type, SourceType>
  >
) {
  const store = new DerivedKeyedArray<Type, SourceType>(...parameters)

  if (activeComponent.current) {
    activeComponent.current.addDisconnectCallback(() => {
      store.close()
    })
  }

  return store
}

export function useResourceStore<Type>(
  ...parameters: ConstructorParameters<typeof Resource<Type>>
) {
  const store = new Resource<Type>(...parameters)

  if (activeComponent.current) {
    activeComponent.current.addDisconnectCallback(() => {
      store.close()
    })
  }

  return store
}

export function useComposedStore<Type>(
  ...parameters: ConstructorParameters<typeof Composed<Type>>
) {
  const store = new Composed<Type>(...parameters)

  if (activeComponent.current) {
    activeComponent.current.addDisconnectCallback(() => {
      store.close()
    })
  }

  return store
}
