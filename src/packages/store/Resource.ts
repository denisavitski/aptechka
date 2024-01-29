import { Store, StoreOptions } from './Store'

export type ResourceFetcher<StoreType = unknown> = () => Promise<StoreType>

export class Resource<StoreType> extends Store<StoreType> {
  #fetcher: ResourceFetcher<StoreType>

  #isPending: Store<boolean>

  constructor(
    defaultValue: StoreType,
    fetcher: ResourceFetcher<StoreType>,
    parameters?: StoreOptions<StoreType>
  ) {
    super(defaultValue, parameters)

    this.#isPending = new Store(false)

    this.#fetcher = fetcher
    this.refetch()
  }

  public get isPending() {
    return this.#isPending
  }

  /**
   * Calls fetcher again and sets isPending to true.
   */
  public refetch() {
    this.#isPending.current = true

    this.#fetcher().then((v) => {
      this.#isPending.current = false
      this.current = v
    })
  }
}
