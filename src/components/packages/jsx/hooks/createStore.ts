import {
  StoreManagerType,
  StoreEntry,
  Store,
  Derived,
  DerivedArray,
  Composed,
  Resource,
} from '@packages/store'
import { _createStore } from './_createStore'

export function createStore<
  StoreType = unknown,
  StoreManager extends StoreManagerType = StoreManagerType,
  Entry extends StoreEntry<StoreType> = StoreEntry<StoreType>
>(
  ...parameters: ConstructorParameters<
    typeof Store<StoreType, StoreManager, Entry>
  >
) {
  return _createStore(new Store(...parameters))
}

export function createDerived<DerivedType, StoreType>(
  ...parameters: ConstructorParameters<typeof Derived<DerivedType, StoreType>>
) {
  return _createStore(new Derived(...parameters))
}

export function createDerivedComponent<DerivedType, StoreType>(
  ...parameters: ConstructorParameters<typeof Derived<DerivedType, StoreType>>
) {
  const [store, callback, options] = parameters

  return _createStore(
    new Derived(store, (v) => (() => callback(v)) as any, options)
  )
}

export function createDerivedArray<
  DerivedType,
  StoreType extends Array<any> = Array<any>
>(
  ...parameters: ConstructorParameters<
    typeof DerivedArray<DerivedType, StoreType>
  >
) {
  return _createStore(new DerivedArray(...parameters))
}

export function createDerivedComponents<
  DerivedType,
  StoreType extends Array<any> = Array<any>
>(
  ...parameters: ConstructorParameters<
    typeof DerivedArray<DerivedType, StoreType>
  >
) {
  const [store, callback, options] = parameters

  return _createStore(
    new DerivedArray(
      store,
      (value, index) => (() => callback(value, index)) as any,
      options
    )
  )
}

export function createComposed<ComposedType>(
  ...parameters: ConstructorParameters<typeof Composed<ComposedType>>
) {
  return _createStore(new Composed(...parameters))
}

export function createResource<StoreType>(
  ...parameters: ConstructorParameters<typeof Resource<StoreType>>
) {
  return _createStore(new Resource(...parameters))
}
