import { Store, StoreOptions } from './Store'

export type DerivedCallback<StoreType, DerivedType> = (
  value: StoreType
) => DerivedType

export class Derived<DerivedType, StoreType> extends Store<DerivedType> {
  #unsubscriber: Function

  constructor(
    store: Store<StoreType, any>,
    callback: DerivedCallback<StoreType, DerivedType>,
    parameters?: StoreOptions<DerivedType>
  ) {
    super(null!, parameters)

    this.#unsubscriber = store.subscribe((e) => {
      this.current = callback(e.current)
    })
  }

  public override close() {
    super.close()
    this.#unsubscriber()
  }
}
