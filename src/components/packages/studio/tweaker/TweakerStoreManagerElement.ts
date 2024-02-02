import { CustomElement } from '@packages/custom-element'
import { Store, StoreManagerType } from '@packages/store'

export class TweakerStoreManagerElement<
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
