import { Notifier } from '@packages/notifier'
import { debounce } from '@packages/utils'

export interface LoadingProgressDetail {
  loaded: number
  total: number
  progress: number
  namespace: string
}

export interface LoadingErrorDetail {
  namespace: string
  url: string
}

export interface LoadingCompleteDetail {
  total: number
}

export type LoadingProgressSubscriber = (detail: LoadingProgressDetail) => void
export type LoadingErrorSubscriber = (detail: LoadingErrorDetail) => void
export type LoadingCompleteSubscriber = (detail: LoadingCompleteDetail) => void

class Loading {
  #counter: Map<string, { total: number; loaded: number }> = new Map()
  #progressEvent = new Notifier<LoadingProgressSubscriber>()
  #completeEvent = new Notifier<LoadingCompleteSubscriber>()
  #errorEvent = new Notifier<LoadingErrorSubscriber>()
  #isComplete = false

  public get progressEvent() {
    return this.#progressEvent
  }

  public get completeEvent() {
    return this.#completeEvent
  }

  public get errorEvent() {
    return this.#errorEvent
  }

  public get _counter() {
    return this.#counter
  }

  public get isComplete() {
    return this.#isComplete
  }

  public reset() {
    this.#isComplete = false
    this.#counter.clear()
  }

  public setTotal(namespace: string, total: number = 1) {
    if (this.#isComplete) {
      return
    }

    this.#counter.set(namespace, { loaded: 0, total: total })
  }

  public setLoaded(namespace: string, loaded: number = 1) {
    if (this.#isComplete) {
      return
    }

    if (this.#counter.has(namespace)) {
      const ns = this.#counter.get(namespace)!

      if (ns.loaded !== loaded) {
        this.#counter.set(namespace, { ...ns, loaded: loaded })
        this.#progressListener(namespace)
      }
    }
  }

  public setError(namespace: string, url: string) {
    if (this.#isComplete) {
      return
    }

    if (this.#counter.has(namespace)) {
      const ns = this.#counter.get(namespace)!
      this.#counter.set(namespace, { ...ns, total: ns.total - 1 })
      this.#errorEvent.notify({
        namespace,
        url,
      })
    }
  }

  public getStats() {
    return Array.from(this.#counter).reduce(
      (p, c) => {
        return { loaded: p.loaded + c[1].loaded, total: p.total + c[1].total }
      },
      { loaded: 0, total: 0 }
    )
  }

  #progressListener = (namespace: string) => {
    const { loaded, total } = this.getStats()

    this.#progressEvent.notify({
      progress: loaded / total,
      loaded,
      total,
      namespace,
    })

    this.#tryComplete()
  }

  #tryComplete = debounce(() => {
    const { loaded, total } = this.getStats()

    if (loaded === total) {
      this.#isComplete = true

      const { total } = this.getStats()

      this.#completeEvent.notify({
        total,
      })
    }
  }, 150)
}

export const loading = new Loading()
