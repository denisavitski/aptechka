import { CustomElement } from '@packages/custom-element'
import { Store } from '@packages/store'
import { StoreManagerType } from '@packages/store/Store'

export abstract class TweakerStoreManagerElement<
  T,
  K extends StoreManagerType
> extends CustomElement {
  #store: Store<T, K>

  constructor(store: Store<T, K>) {
    super()

    this.#store = store
  }

  protected get store() {
    return this.#store
  }
}
