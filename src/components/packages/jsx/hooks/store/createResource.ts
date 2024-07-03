import { Resource } from '@packages/store'
import { _createStore } from '../basic/_createStore'

export function createResource<StoreType>(
  ...parameters: ConstructorParameters<typeof Resource<StoreType>>
) {
  return _createStore(new Resource(...parameters))
}
