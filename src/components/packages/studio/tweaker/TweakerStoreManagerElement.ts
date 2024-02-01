import { CustomElement } from '@packages/custom-element'
import { Store } from '@packages/store'
import { StoreManagerType, activeStores } from '@packages/store/Store'

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

  protected connectedCallback() {
    activeStores.subscribe(this.#storesChangeListener)
  }

  protected disconnectedCallback() {
    activeStores.unsubscribe(this.#storesChangeListener)
  }

  #storesChangeListener = () => {
    if (!activeStores.current.includes(this.#store)) {
      // TODO
    }
  }
}
