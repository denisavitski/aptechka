import { Resource, ResourceFetcher, ResourceOptions } from './Resource'

export interface СumulativeResourceOptions<T> extends ResourceOptions<T> {
  interval?: number
}

export class СumulativeResource<T> extends Resource<T> {
  #intervalId: ReturnType<typeof setInterval> | undefined
  #interval: number

  #step = 0

  constructor(defaultValue: T, fetcher: ResourceFetcher<T>, interval = 100) {
    super(defaultValue, fetcher, {
      manualControl: true,
      skipSubscribeNotification: true,
    })

    this.#interval = interval
  }

  public get step() {
    return this.#step
  }

  public startAccumulating() {
    this.#intervalId = setInterval(async () => {
      ++this.#step
      this.refetch()
    }, this.#interval)
  }

  public stopAccumulating() {
    clearInterval(this.#intervalId)
  }

  public override close() {
    super.close()
    this.stopAccumulating()
  }
}
