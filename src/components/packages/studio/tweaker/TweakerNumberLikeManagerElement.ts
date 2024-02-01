import { Store, StoreManagerType } from '@packages/store/Store'
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement'

export type TweakerNumberLikeManagerType = Extract<
  StoreManagerType,
  'number' | 'range'
>

export abstract class TweakerNumberLikeManagerElement<
  T extends TweakerNumberLikeManagerType = 'number'
> extends TweakerStoreManagerElement<number, T> {
  constructor(store: Store<number, T>) {
    super(store)
  }
}
