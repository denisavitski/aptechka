import { Derived, AsyncDerived } from '@packages/store'
import { _createStore } from '../basic/_createStore'

export function createDerived<Type, SourceType>(
  ...parameters: ConstructorParameters<typeof Derived<Type, SourceType>>
) {
  return _createStore(new Derived<Type, SourceType>(...parameters))
}

export function createAsyncDerived<Type, SourceType>(
  ...parameters: ConstructorParameters<typeof AsyncDerived<Type, SourceType>>
) {
  return _createStore(new AsyncDerived<Type, SourceType>(...parameters))
}
