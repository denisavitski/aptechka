import {
  StoreManagerType,
  StoreEntry,
  Store,
  Derived,
  DerivedArray,
  Composed,
  Resource,
} from '@packages/store'
import { onDisconnect } from '../Component'

export function createStore<
  StoreType = unknown,
  StoreManager extends StoreManagerType = StoreManagerType,
  Entry extends StoreEntry<StoreType> = StoreEntry<StoreType>
>(
  ...parameters: ConstructorParameters<
    typeof Store<StoreType, StoreManager, Entry>
  >
) {
  const store = new Store(...parameters)
  onDisconnect(store.close)
  return store
}

export function createDerived<DerivedType, StoreType>(
  ...parameters: ConstructorParameters<typeof Derived<DerivedType, StoreType>>
) {
  const store = new Derived(...parameters)
  onDisconnect(store.close)
  return store
}

export function createDerivedArray<
  DerivedType,
  StoreType extends Array<any> = Array<any>
>(
  ...parameters: ConstructorParameters<
    typeof DerivedArray<DerivedType, StoreType>
  >
) {
  const store = new DerivedArray(...parameters)
  onDisconnect(store.close)
  return store
}

export function createComposed<ComposedType>(
  ...parameters: ConstructorParameters<typeof Composed<ComposedType>>
) {
  const store = new Composed(...parameters)
  onDisconnect(store.close)
  return store
}

export function createResource<StoreType>(
  ...parameters: ConstructorParameters<typeof Resource<StoreType>>
) {
  const store = new Resource(...parameters)
  onDisconnect(store.close)
  return store
}
