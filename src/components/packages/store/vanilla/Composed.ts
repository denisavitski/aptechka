import { debounce } from '@packages/utils'
import { Store, StoreOptions } from './Store'

export type ComposedCallback<ComposedType> = () => ComposedType

export class Composed<ComposedType> extends Store<ComposedType> {
  #unsubscribers: Array<Function> = []

  constructor(
    stores: Array<Store<any>>,
    callback: ComposedCallback<ComposedType>,
    parameters?: StoreOptions<ComposedType>
  ) {
    super(null!, parameters)

    const update = debounce(() => {
      this.current = callback()
    }, 0)

    stores.forEach((store) => {
      this.#unsubscribers.push(
        store.subscribe(() => {
          update()
        })
      )
    })
  }

  public override close() {
    super.close()
    this.#unsubscribers.forEach((u) => u())
  }
}
