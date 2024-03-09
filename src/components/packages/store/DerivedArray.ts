import { Store, StoreOptions } from './Store'

export type DerivedArrayCallback<StoreType, DerivedType> = (
  value: StoreType,
  index: number
) => DerivedType

export class DerivedArray<
  DerivedType,
  StoreType extends Array<any> = Array<any>
> extends Store<DerivedType[]> {
  #unsubscriber: Function

  constructor(
    store: Store<StoreType>,
    callback: DerivedArrayCallback<StoreType[number], DerivedType>,
    parameters?: StoreOptions<DerivedType[]>
  ) {
    super(null!, parameters)

    this.#unsubscriber = store.subscribe((e) => {
      const res: Array<DerivedType> = []

      e.current.forEach((v, i) => {
        if (e.current[i] === e.previous?.[i] && this.current[i]) {
          res.push(this.current[i])
        } else {
          res.push(callback(v, i))
        }
      })

      this.current = res
    })
  }

  public override close() {
    super.close()
    this.#unsubscriber()
  }
}
