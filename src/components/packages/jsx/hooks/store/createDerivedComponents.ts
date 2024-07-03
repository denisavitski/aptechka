import { DerivedArray } from '@packages/store'
import { _createStore } from '../basic/_createStore'

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
    new DerivedArray<DerivedType, StoreType>(
      store,
      (value, index) => (() => callback(value, index)) as any,
      options
    )
  )
}
