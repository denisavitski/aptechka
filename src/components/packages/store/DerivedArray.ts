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

  #keyMap = new Map<any, DerivedType>()

  constructor(
    store: Store<StoreType>,
    callback: DerivedArrayCallback<StoreType[number], DerivedType>,
    parameters?: StoreOptions<DerivedType[]>
  ) {
    super(null!, parameters)

    this.#unsubscriber = store.subscribe((e) => {
      const res: Array<DerivedType> = []

      e.current.forEach((v, i) => {
        if (e.previous?.includes(v) && this.#keyMap.has(v)) {
          res.push(this.#keyMap.get(v)!)
        } else {
          const callbackReturn = callback(v, i)

          this.#keyMap.set(v, callbackReturn)

          res.push(callbackReturn)
        }
      })

      this.#keyMap.forEach((_, k) => {
        if (!e.current.includes(k)) {
          this.#keyMap.delete(k)
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
