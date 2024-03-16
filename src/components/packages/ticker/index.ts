import { intersector } from '@packages/intersector'
import { ElementOrSelector, isBrowser } from '@packages/utils'

export interface TickerCallbackEntry {
  timestamp: number
  elapsed: number
}

export type TickerCallback = (entry: TickerCallbackEntry) => void

export interface TickerAddOptions {
  maxFPS?: number
  order?: number
  culling?: ElementOrSelector | false
}

class TickerSubscriber {
  #callback: TickerCallback
  #maxFPS: number | undefined
  #order: number
  #lastTimestamp = 0
  #elapsed = 0
  #isVisible = false

  constructor(callback: TickerCallback, options?: TickerAddOptions) {
    this.#callback = callback
    this.#maxFPS = options?.maxFPS
    this.#order = options?.order || 0

    if (options?.culling && isBrowser) {
      intersector.subscribe(options.culling, this.#intersectionListener)
    } else {
      this.#isVisible = true
    }
  }

  public get callback() {
    return this.#callback
  }

  public get order() {
    return this.#order
  }

  public sync(timestamp: number) {
    this.#lastTimestamp = timestamp - this.#elapsed
  }

  public tick(timestamp: number) {
    this.#elapsed = Math.max(0, timestamp - this.#lastTimestamp)

    if (this.#maxFPS) {
      if (this.#elapsed >= 1000 / this.#maxFPS) {
        this.#lastTimestamp = timestamp - (this.#elapsed % this.#maxFPS)
      } else {
        return
      }
    } else {
      this.#lastTimestamp = timestamp
    }

    if (this.#isVisible) {
      this.#callback({
        elapsed: this.#elapsed,
        timestamp: timestamp,
      })
    }
  }

  public destroy() {
    intersector.unsubscribe(this.#intersectionListener)
  }

  #intersectionListener = (entry: IntersectionObserverEntry) => {
    this.#isVisible = entry.isIntersecting
  }
}

export class Ticker {
  #idleTime = 0
  #timestamp = 0
  #lastFrameId: number | undefined

  #isDocumentHidden = false

  #subscribers: Array<TickerSubscriber> = []

  constructor() {
    if (isBrowser) {
      document.addEventListener(
        'visibilitychange',
        this.#documentVisibilityChangeListener
      )
    }
  }

  public subscribe(callback: TickerCallback, options?: TickerAddOptions) {
    if (!this.#subscribers.find((s) => s.callback === callback)) {
      const subscriber = new TickerSubscriber(callback, options)
      subscriber.sync(performance.now())
      this.#subscribers.push(subscriber)
      this.#subscribers = this.#subscribers.sort((a, b) => a.order - b.order)
    }

    this.#requestAnimationFrame()

    return () => this.unsubscribe(callback)
  }

  public unsubscribe(callback: TickerCallback) {
    const matches = this.#subscribers.filter(
      (subscriber) => subscriber.callback === callback
    )

    if (matches.length) {
      matches.forEach((m) => m.destroy())

      this.#subscribers = this.#subscribers.filter(
        (subscriber) => subscriber.callback !== callback
      )

      if (!this.#subscribers.length) {
        this.#cancelAnimationFrame()
      }
    }
  }

  public destroy() {
    if (isBrowser) {
      this.#cancelAnimationFrame()
      document.removeEventListener(
        'visibilitychange',
        this.#documentVisibilityChangeListener
      )
    }
  }

  #requestAnimationFrame() {
    if (this.#subscribers.length && !this.#lastFrameId) {
      this.#lastFrameId = requestAnimationFrame(this.#animationFrameListener)
    }
  }

  #cancelAnimationFrame() {
    if (this.#lastFrameId) {
      cancelAnimationFrame(this.#lastFrameId)
      this.#lastFrameId = undefined
    }
  }

  #animationFrameListener = (timestamp: number) => {
    if (this.#isDocumentHidden) {
      this.#isDocumentHidden = false
      this.#idleTime = timestamp - this.#timestamp

      for (const subscriber of this.#subscribers) {
        subscriber.sync(this.#timestamp)
      }
    }

    this.#lastFrameId = requestAnimationFrame(this.#animationFrameListener)

    this.#timestamp = timestamp - this.#idleTime

    for (const subscriber of this.#subscribers) {
      subscriber.tick(this.#timestamp)
    }
  }

  #documentVisibilityChangeListener = () => {
    if (document.hidden) {
      this.#isDocumentHidden = true
    }
  }
}

export const ticker = new Ticker()
