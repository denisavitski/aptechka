import { Store, StoreManagerType } from '@packages/store/Store'
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement'

export type TweakerStringLikeManagerType = Extract<
  StoreManagerType,
  'string' | 'link'
>

export abstract class TweakerStringLikeManagerElement<
  T extends TweakerStringLikeManagerType = 'string'
> extends TweakerStoreManagerElement<string, T> {
  constructor(store: Store<string, T>) {
    super(store)
  }
}
