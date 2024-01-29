import { isBrowser } from '$packages/utils'

export type IntersectorCallback = (entry: IntersectionObserverEntry) => void

interface IntersectorSubscriber {
  element: Element
  callback: IntersectorCallback
  entry: IntersectionObserverEntry | null
}

export class Intersector {
  #subscribers: Array<IntersectorSubscriber> = []
  #intersectionObserver: IntersectionObserver = null!

  constructor() {
    if (isBrowser) {
      this.#intersectionObserver = new IntersectionObserver(this.#intersectionListener)
    }
  }

  public subscribe(elementOrSelector: HTMLElement | string, callback: IntersectorCallback) {
    const element =
      typeof elementOrSelector === 'string'
        ? document.querySelector<HTMLElement>(elementOrSelector)
        : elementOrSelector

    if (!element) {
      return
    }

    const alreadyObserved = this.#subscribers.find((sub) => sub.element === element)

    if (!alreadyObserved) {
      this.#intersectionObserver.observe(element)
    } else {
      const alreadyIntersected = this.#subscribers.find((s) => s.element === element && s.entry)

      if (alreadyIntersected?.entry!.isIntersecting) {
        callback(alreadyIntersected.entry)
      }
    }

    this.#subscribers.push({
      element,
      callback,
      entry: alreadyObserved?.entry || null,
    })

    return () => {
      this.unsubscribe(callback)
    }
  }

  public unsubscribe(callback: IntersectorCallback) {
    const subscriber = this.#subscribers.find((sub) => sub.callback === callback)

    if (subscriber) {
      this.#subscribers = this.#subscribers.filter((sub) => sub.callback === callback)

      if (!this.#subscribers.find((sub) => sub.element === subscriber.element)) {
        this.#intersectionObserver.unobserve(subscriber.element)
      }
    }
  }

  #intersectionListener: IntersectionObserverCallback = (entries) => {
    const matches = this.#subscribers.map((subscriber) => {
      return {
        subscriber,
        entry: entries.find((entry) => entry.target === subscriber.element),
      }
    })

    matches.forEach((match) => {
      if (match.entry) {
        match.subscriber.entry = match.entry
        match.subscriber.callback(match.entry)
      }
    })
  }
}

export const intersector = new Intersector()
