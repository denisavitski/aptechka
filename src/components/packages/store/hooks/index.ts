import { useDisconnect } from '@packages/jsx/hooks'
import {
  StoreManagerType,
  StoreEntry,
  Store,
  Derived,
  DerivedArray,
  Composed,
  Resource,
} from '..'

export function useStore<
  StoreType = unknown,
  StoreManager extends StoreManagerType = StoreManagerType,
  Entry extends StoreEntry<StoreType> = StoreEntry<StoreType>
>(
  ...parameters: ConstructorParameters<
    typeof Store<StoreType, StoreManager, Entry>
  >
) {
  const store = new Store(...parameters)
  useDisconnect(() => store.close())
  return store
}

export function useDerived<DerivedType, StoreType>(
  ...parameters: ConstructorParameters<typeof Derived<DerivedType, StoreType>>
) {
  const store = new Derived(...parameters)
  useDisconnect(() => store.close())
  return store
}

export function useDerivedArray<
  DerivedType,
  StoreType extends Array<any> = Array<any>
>(
  ...parameters: ConstructorParameters<
    typeof DerivedArray<DerivedType, StoreType>
  >
) {
  const store = new DerivedArray(...parameters)
  useDisconnect(() => store.close())
  return store
}

export function useComposed<ComposedType>(
  ...parameters: ConstructorParameters<typeof Composed<ComposedType>>
) {
  const store = new Composed(...parameters)
  useDisconnect(() => store.close())
  return store
}

export function useResource<StoreType>(
  ...parameters: ConstructorParameters<typeof Resource<StoreType>>
) {
  const store = new Resource(...parameters)
  useDisconnect(() => store.close())
  return store
}
