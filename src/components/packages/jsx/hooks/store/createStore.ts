import { StoreManagerType, StoreEntry, Store } from '@packages/store'
import { _createStore } from '../basic/_createStore'

export function createStore<
  StoreType = unknown,
  StoreManager extends StoreManagerType = StoreManagerType,
  Entry extends StoreEntry<StoreType> = StoreEntry<StoreType>
>(
  ...parameters: ConstructorParameters<
    typeof Store<StoreType, StoreManager, Entry>
  >
) {
  return _createStore(new Store<StoreType, StoreManager, Entry>(...parameters))
}
