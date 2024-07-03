import { Composed } from '@packages/store'
import { _createStore } from '../basic/_createStore'

export function createComposed<ComposedType>(
  ...parameters: ConstructorParameters<typeof Composed<ComposedType>>
) {
  return _createStore(new Composed<ComposedType>(...parameters))
}
