import { CustomElement } from '@packages/custom-element'
import { Store, StoreManagerType } from '@packages/store'

export class TweakerStoreManagerElement<
  T,
  K extends StoreManagerType
> extends CustomElement {
  #stores: Array<Store<T, K>>

  constructor(...stores: Array<Store<T, K>>) {
    super()

    this.#stores = stores
  }

  public addStore(store: Store<T, K>) {
    this.#stores.push(store)
  }

  protected get firstStore() {
    return this.#stores[0]
  }

  protected get stores() {
    return this.#stores
  }

  protected updateStores(value: T) {
    this.#stores.forEach((store) => {
      store.current = value
    })
  }
}
