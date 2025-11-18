import {
  Composed,
  Derived,
  DerivedArray,
  DerivedKeyedArray,
  Resource,
  Store,
} from '@packages/store'
import { activeComponent } from '../ComponentElement'

function subscribe<T extends Store<any>>(create: () => T) {
  const store = create()

  if (activeComponent.current) {
    activeComponent.current.addDisconnectCallback(() => {
      store.close()
    })
  }

  return store
}

export function useStore<StoreType = unknown>(
  ...parameters: ConstructorParameters<typeof Store<StoreType>>
) {
  return subscribe(() => new Store<StoreType>(...parameters))
}

export function useDerivedStore<Type, SourceType>(
  ...parameters: ConstructorParameters<typeof Derived<Type, SourceType>>
) {
  return subscribe(() => new Derived<Type, SourceType>(...parameters))
}

export function useDerivedArrayStore<Type, SourceType extends Array<any>>(
  ...parameters: ConstructorParameters<typeof DerivedArray<Type, SourceType>>
) {
  return subscribe(() => new DerivedArray<Type, SourceType>(...parameters))
}

export function useDerivedKeyedArrayStore<Type, SourceType extends Array<any>>(
  ...parameters: ConstructorParameters<
    typeof DerivedKeyedArray<Type, SourceType>
  >
) {
  return subscribe(() => new DerivedKeyedArray<Type, SourceType>(...parameters))
}

export function useResourceStore<Type>(
  ...parameters: ConstructorParameters<typeof Resource<Type>>
) {
  return subscribe(() => new Resource<Type>(...parameters))
}

export function useComposedStore<Type>(
  ...parameters: ConstructorParameters<typeof Composed<Type>>
) {
  return subscribe(() => new Composed<Type>(...parameters))
}
