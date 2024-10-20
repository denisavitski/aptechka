import { Store, StoreOptions } from './Store'

export type DerivedCallback<SourceType, Type, Return = Type> = (
  value: SourceType
) => Return

export class Derived<Type, SourceType> extends Store<Type> {
  #unsubscriber: Function

  constructor(
    store: Store<SourceType>,
    callback: DerivedCallback<SourceType, Type>,
    parameters?: StoreOptions<Type>
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
