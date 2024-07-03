import { StoreManagerType, StoreEntry, ArrayStore } from '@packages/store'
import { _createStore } from '../basic/_createStore'

export function createArrayStore<
  StoreType,
  StoreManager extends StoreManagerType = StoreManagerType,
  Entry extends StoreEntry<Array<StoreType>> = StoreEntry<Array<StoreType>>
>(
  ...parameters: ConstructorParameters<
    typeof ArrayStore<StoreType, StoreManager, Entry>
  >
) {
  return _createStore(
    new ArrayStore<StoreType, StoreManager, Entry>(...parameters)
  )
}
