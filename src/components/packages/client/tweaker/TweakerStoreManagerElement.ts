import { Store } from '@packages/client/store'

export class TweakerStoreManagerElement<
  S extends Store<any, any>
> extends HTMLElement {
  #stores: Array<S>

  constructor(...stores: Array<S>) {
    super()

    this.#stores = stores
  }

  public addStore(store: S) {
    this.#stores.push(store)
  }

  protected get firstStore() {
    return this.#stores[0]
  }

  protected get stores() {
    return this.#stores
  }

  protected updateStores(value: S['current']) {
    this.#stores.forEach((store) => {
      store.current = value
    })
  }
}
