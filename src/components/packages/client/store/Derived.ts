import { Store, StoreOptions } from './Store'

export type DerivedCallback<SourceType, Type, Return = Type> = (
  value: SourceType
) => Return

export class Derived<Type, SourceType> extends Store<Type> {
  #unsubscriber: Function

  constructor(
    store: Store<SourceType, any>,
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

export class AsyncDerived<Type, SourceType> extends Store<Type> {
  #unsubscriber: Function

  constructor(
    store: Store<SourceType, any>,
    callback: DerivedCallback<SourceType, Type, Promise<Type>>,
    parameters?: StoreOptions<Type>
  ) {
    super(null!, parameters)

    let version = 0

    this.#unsubscriber = store.subscribe(async (e) => {
      const savedVersion = ++version

      const res = await callback(e.current)

      if (version === savedVersion) {
        this.current = res
      }
    })
  }

  public override close() {
    super.close()
    this.#unsubscriber()
  }
}
