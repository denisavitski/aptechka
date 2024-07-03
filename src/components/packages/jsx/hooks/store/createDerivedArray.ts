import { DerivedArray } from '@packages/store'
import { _createStore } from '../basic/_createStore'

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
