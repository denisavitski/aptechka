import {
  StoreManagerType,
  StoreEntry,
  Store,
  Derived,
  DerivedArray,
  Resource,
  Composed,
} from '@packages/store'
import { currentComponentElement } from '../ComponentElement'

export function useStore<
  StoreType = unknown,
  StoreManager extends StoreManagerType = StoreManagerType,
  Entry extends StoreEntry<StoreType> = StoreEntry<StoreType>
>(
  ...parameters: ConstructorParameters<
    typeof Store<StoreType, StoreManager, Entry>
  >
) {
  const store = new Store<StoreType, StoreManager, Entry>(...parameters)

  currentComponentElement.stores.add(store)

  return store
}

export function useDerived<DerivedType, StoreType>(
  ...parameters: ConstructorParameters<typeof Derived<DerivedType, StoreType>>
) {
  const store = new Derived<DerivedType, StoreType>(...parameters)

  currentComponentElement.stores.add(store)

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
  const store = new DerivedArray<DerivedType, StoreType>(...parameters)

  currentComponentElement.stores.add(store)

  return store
}

export function useResource<StoreType>(
  ...parameters: ConstructorParameters<typeof Resource<StoreType>>
) {
  const store = new Resource<StoreType>(...parameters)

  currentComponentElement.stores.add(store)

  return store
}

export function useComposed<StoreType>(
  ...parameters: ConstructorParameters<typeof Composed<StoreType>>
) {
  const store = new Composed<StoreType>(...parameters)

  currentComponentElement.stores.add(store)

  return store
}
