import { debounce, dispatchEvent } from '@packages/utils'

export interface LoadingEvents {
  loadingProgress: CustomEvent<{
    total: number
    loaded: number
    progress: number
    resourceName: string | undefined
  }>
  loadingStart: CustomEvent<{}>
  loadingComplete: CustomEvent<{
    total: number
  }>
  loadingError: CustomEvent<{
    name: string
  }>
}

class Loading {
  #map = new Map<string, boolean>()
  #isStarted = false

  #loaded = 0
  #progress = 0

  public get total() {
    return this.#map.size
  }

  public get loaded() {
    return this.#loaded
  }

  public get progress() {
    return this.#progress
  }

  public get map() {
    return this.#map
  }

  public add(resourceName: string) {
    this.#map.set(resourceName, false)
    this.#start()
  }

  public complete(resourceName: string) {
    this.#map.set(resourceName, true)
    this.#check(resourceName)
  }

  public error(resourceName: string) {
    if (this.#map.has(resourceName)) {
      console.error(`Failed to load ${resourceName}`)
      this.#map.delete(resourceName)

      dispatchEvent(document, 'loadingError', {
        detail: {
          name: resourceName,
        },
      })
    }

    this.#check()
  }

  #start = debounce(() => {
    if (!this.#isStarted) {
      this.#isStarted = true

      dispatchEvent(document, 'loadingStart')

      this.#check()
    }
  }, 0)

  #check = (resourceName?: string) => {
    if (!this.#isStarted) {
      return
    }

    const total = this.#map.size
    const loaded = Array.from(this.#map).filter((item) => item[1]).length
    const progress = loaded / total

    this.#loaded = loaded
    this.#progress = progress

    dispatchEvent(document, 'loadingProgress', {
      detail: {
        total,
        loaded,
        progress,
        resourceName,
      },
    })

    if (progress === 1) {
      this.#complete()
    }
  }

  #complete = debounce(() => {
    this.#isStarted = false

    dispatchEvent(document, 'loadingComplete', {
      detail: {
        total: this.#map.size,
      },
    })

    this.#loaded = 0
    this.#progress = 0

    this.#map.clear()
  }, 0)
}

export const loading = new Loading()

declare global {
  interface DocumentEventMap extends LoadingEvents {}
}
