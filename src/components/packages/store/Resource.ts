import { Store, StoreOptions } from './Store'

export type ResourceFetcher<StoreType = unknown> = () => Promise<StoreType>

export interface ResourceOptions<StoreType> extends StoreOptions<StoreType> {
  manualControl?: boolean
}

export class Resource<StoreType> extends Store<StoreType> {
  #fetcher: ResourceFetcher<StoreType>
  #isPending: Store<boolean>
  #fetchIndex = 0

  constructor(
    defaultValue: StoreType,
    fetcher: ResourceFetcher<StoreType>,
    options?: ResourceOptions<StoreType>
  ) {
    super(defaultValue, options)

    this.#isPending = new Store(false)

    this.#fetcher = fetcher

    if (!options?.manualControl) {
      this.refetch()
    }
  }

  public get isPending() {
    return this.#isPending
  }

  /**
   * Calls fetcher again and sets isPending to true.
   */
  public refetch() {
    this.#isPending.current = true

    this.#fetchIndex += 1

    const fetchIndex = this.#fetchIndex

    this.#fetcher().then((v) => {
      if (fetchIndex === this.#fetchIndex) {
        this.#isPending.current = false
        this.current = v
      }
    })
  }
}
