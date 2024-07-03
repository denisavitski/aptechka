import { Derived } from '@packages/store'
import { _createStore } from '../basic/_createStore'

export function createDerived<DerivedType, StoreType>(
  ...parameters: ConstructorParameters<typeof Derived<DerivedType, StoreType>>
) {
  return _createStore(new Derived(...parameters))
}
