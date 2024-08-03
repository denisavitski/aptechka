import { AsyncDerivedArray, DerivedArray } from '@packages/client/store'
import { _createStore } from '../basic/_createStore'

export function createDerivedArray<
  DerivedType,
  StoreType extends Array<any> = Array<any>
>(
  ...parameters: ConstructorParameters<
    typeof DerivedArray<DerivedType, StoreType>
  >
) {
  return _createStore(new DerivedArray<DerivedType, StoreType>(...parameters))
}

export function createAsyncDerivedArray<
  DerivedType,
  StoreType extends Array<any> = Array<any>
>(
  ...parameters: ConstructorParameters<
    typeof AsyncDerivedArray<DerivedType, StoreType>
  >
) {
  return _createStore(
    new AsyncDerivedArray<DerivedType, StoreType>(...parameters)
  )
}
