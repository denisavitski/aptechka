import { Store, StoreOptions } from './Store'

export type KeyedCallback<Type, SourceType extends Array<KeyedSource>> = (
  value: SourceType[number]['value'],
  index: number,
  arr: SourceType
) => Type

export interface KeyedSource<T = any> {
  key: any
  value: T
  revalidate?: boolean
}

export class Keyed<Type, SourceType extends Array<KeyedSource>> extends Store<
  Array<Type>
> {
  #unsubscriber: Function

  #cache: Map<any, any> = new Map()

  constructor(
    store: Store<SourceType, any>,
    callback: KeyedCallback<Type, SourceType>,
    parameters?: StoreOptions<Array<Type>>
  ) {
    super(null!, parameters)

    this.#unsubscriber = store.subscribe((e) => {
      this.current = e.current.map((item, i, arr) => {
        let result = this.#cache.get(item.key)

        if (!result || item.revalidate) {
          result = callback(item.value, i, arr as SourceType)
          this.#cache.set(item.key, result)
        }

        return result
      })
    })
  }

  public override close() {
    super.close()
    this.#unsubscriber()
    this.#cache.clear()
  }
}
