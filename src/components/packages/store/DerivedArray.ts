import { Store, StoreOptions } from './Store'

export type DerivedArrayCallback<
  Type,
  SourceType extends Array<any>,
  Return = Type,
> = (value: SourceType[number], index: number, arr: SourceType) => Return

export interface DerivedArrayOptions<Type> extends StoreOptions<Array<Type>> {
  revalidateAll?: boolean
}

export class DerivedArray<Type, SourceType extends Array<any>> extends Store<
  Array<Type>
> {
  #unsubscriber: Function
  #revalidateAll: boolean

  constructor(
    store: Store<SourceType>,
    callback: DerivedArrayCallback<Type, SourceType>,
    options?: DerivedArrayOptions<Type>,
  ) {
    super(null!, options)

    this.#revalidateAll = !!options?.revalidateAll

    this.#unsubscriber = store.subscribe((e) => {
      this.current = e.current.map((item, i, arr) => {
        if (
          !this.#revalidateAll &&
          this.current?.length &&
          e.previous?.length
        ) {
          const previousItem = e.previous[i]

          if (previousItem === item) {
            return this.current[i]
          }
        }

        return callback(item, i, arr as SourceType)
      })
    })
  }

  public override close() {
    super.close()
    this.#unsubscriber()
  }
}
