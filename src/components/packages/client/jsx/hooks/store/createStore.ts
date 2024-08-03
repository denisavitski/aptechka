import { StoreManagerType, Store } from '@packages/client/store'
import { _createStore } from '../basic/_createStore'

export function createStore<
  StoreType = unknown,
  StoreManager extends StoreManagerType = StoreManagerType
>(...parameters: ConstructorParameters<typeof Store<StoreType, StoreManager>>) {
  return _createStore(new Store<StoreType, StoreManager>(...parameters))
}
