import { Composed } from '@packages/client/store'
import { _createStore } from '../basic/_createStore'

export function createComposed<ComposedType>(
  ...parameters: ConstructorParameters<typeof Composed<ComposedType>>
) {
  return _createStore(new Composed<ComposedType>(...parameters))
}
