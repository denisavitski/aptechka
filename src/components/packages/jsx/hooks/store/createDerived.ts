import { Derived } from '@packages/store'
import { _createStore } from '../basic/_createStore'

export function createDerived<Type, SourceType>(
  ...parameters: ConstructorParameters<typeof Derived<Type, SourceType>>
) {
  return _createStore(new Derived<Type, SourceType>(...parameters))
}
