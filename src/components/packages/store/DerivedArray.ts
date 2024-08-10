import { Store, StoreOptions } from './Store'

export type DerivedArrayCallback<
  Type,
  SourceType extends Array<any>,
  Return = Type
> = (value: SourceType[number], index: number, arr: SourceType) => Return

export class DerivedArray<Type, SourceType extends Array<any>> extends Store<
  Array<Type>
> {
  #unsubscriber: Function

  constructor(
    store: Store<SourceType, any>,
    callback: DerivedArrayCallback<Type, SourceType>,
    parameters?: StoreOptions<Array<Type>>
  ) {
    super(null!, parameters)

    this.#unsubscriber = store.subscribe((e) => {
      this.current = e.current.map((item, i, arr) => {
        return callback(item, i, arr as SourceType)
      })
    })
  }

  public override close() {
    super.close()
    this.#unsubscriber()
  }
}

export class AsyncDerivedArray<
  Type,
  SourceType extends Array<any>
> extends Store<Array<Type>> {
  #unsubscriber: Function

  constructor(
    store: Store<SourceType, any>,
    callback: DerivedArrayCallback<Type, SourceType, Promise<Type>>,
    parameters?: StoreOptions<Array<Type>>
  ) {
    super(null!, parameters)

    let version = 0

    this.#unsubscriber = store.subscribe(async (e) => {
      const savedVersion = ++version

      const promises = e.current.map((item, i, arr) => {
        return callback(item, i, arr as SourceType)
      })

      const awaited = await Promise.all(promises)

      if (savedVersion === version) {
        this.current = awaited
      }
    })
  }

  public override close() {
    super.close()
    this.#unsubscriber()
  }
}
