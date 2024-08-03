import { Store, StoreOptions } from './Store'

export type CachedCallback<
  Type,
  SourceType extends Array<CachedSource>,
  Return = Type
> = (
  value: SourceType[number]['value'],
  index: number,
  arr: SourceType
) => Return

export interface CachedSource<T = any> {
  key: any
  value: T
  revalidate?: boolean
}

export class Cached<Type, SourceType extends Array<CachedSource>> extends Store<
  Array<Type>
> {
  #unsubscriber: Function

  #cache: Map<any, any> = new Map()

  constructor(
    store: Store<SourceType, any>,
    callback: CachedCallback<Type, SourceType>,
    parameters?: StoreOptions<Array<Type>>
  ) {
    super(null!, parameters)

    this.#unsubscriber = store.subscribe((e) => {
      this.current = e.current.map((item, i, arr) => {
        let result = this.#cache.get(item.key)

        if (result === undefined || item.revalidate) {
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

export class AsyncCached<
  Type,
  SourceType extends Array<CachedSource>
> extends Store<Array<Type>> {
  #unsubscriber: Function

  #cache: Map<any, Promise<any>> = new Map()

  constructor(
    store: Store<SourceType, any>,
    callback: CachedCallback<Type, SourceType, Promise<Type>>,
    parameters?: StoreOptions<Array<Type>>
  ) {
    super(null!, parameters)

    let version = 0

    this.#unsubscriber = store.subscribe(async (e) => {
      const savedVersion = ++version

      const promises = e.current.map((item, i, arr) => {
        let promise = this.#cache.get(item.key)

        if (promise === undefined || item.revalidate) {
          promise = callback(item.value, i, arr as SourceType)
          this.#cache.set(item.key, promise)
        }

        return promise
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
    this.#cache.clear()
  }
}
