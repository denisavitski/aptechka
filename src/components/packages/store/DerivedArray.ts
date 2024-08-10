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
    store: Store<SourceType>,
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
