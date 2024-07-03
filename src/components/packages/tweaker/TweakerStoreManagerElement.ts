import { CustomElement } from '@packages/custom-element'
import { Store } from '@packages/store'

export class TweakerStoreManagerElement<
  S extends Store<any, any, any>
> extends CustomElement {
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
