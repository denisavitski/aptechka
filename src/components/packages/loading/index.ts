import { debounce, dispatchEvent } from '@packages/utils'

export interface LoadingEvents {
  loadingProgress: CustomEvent<{
    total: number
    loaded: number
    progress: number
  }>
  loadingStart: CustomEvent<{}>
  loadingComplete: CustomEvent<{
    total: number
  }>
}

class Loading {
  #map = new Map<string, boolean>()
  #isStarted = false

  public add(resourceName: string) {
    this.#map.set(resourceName, false)
    this.#start()
  }

  public complete(resourceName: string) {
    this.#map.set(resourceName, true)
    this.#check()
  }

  public error(resourceName: string) {
    if (this.#map.has(resourceName)) {
      console.error(`Failed to load ${resourceName}`)
      this.#map.delete(resourceName)
    }

    this.#check()
  }

  #start = debounce(() => {
    if (!this.#isStarted) {
      this.#isStarted = true

      dispatchEvent(window, 'loadingStart', {
        detail: {},
      })

      this.#check()
    }
  }, 0)

  #check = () => {
    if (!this.#isStarted) {
      return
    }

    const total = this.#map.size
    const loaded = Array.from(this.#map).filter((item) => item[1]).length

    const progress = loaded / total

    dispatchEvent(window, 'loadingProgress', {
      detail: {
        total,
        loaded,
        progress,
      },
    })

    if (progress === 1) {
      this.#complete()
    }
  }

  #complete = debounce(() => {
    this.#isStarted = false

    dispatchEvent(window, 'loadingComplete', {
      detail: {
        total: this.#map.size,
      },
    })

    this.#map.clear()
  }, 0)
}

export const loading = new Loading()

declare global {
  interface WindowEventMap extends LoadingEvents {}
}
