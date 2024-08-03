import { Resource } from '@packages/client/store'
import { _createStore } from '../basic/_createStore'

export function createResource<StoreType>(
  ...parameters: ConstructorParameters<typeof Resource<StoreType>>
) {
  return _createStore(new Resource<StoreType>(...parameters))
}
