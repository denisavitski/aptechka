import {
  ElementOrSelector,
  getElement,
  isBrowser,
} from '@packages/client/utils'

export type ElementResizerCallback = (entry: ResizeObserverEntry) => void

interface ElementResizerSubscriber {
  element: Element
  callback: ElementResizerCallback
  entry: ResizeObserverEntry | null
}

export class ElementResizer {
  #subscribers: Array<ElementResizerSubscriber> = []
  #resizeObserver: ResizeObserver = null!

  constructor() {
    if (isBrowser && window.ResizeObserver) {
      this.#resizeObserver = new ResizeObserver(this.#resizeListener)
    }
  }

  public subscribe(
    elementOrSelector: ElementOrSelector,
    callback: ElementResizerCallback
  ) {
    const element = getElement(elementOrSelector)

    if (!element) {
      return () => {}
    }

    const alreadyObserved = this.#subscribers.find(
      (sub) => sub.element === element
    )

    if (!alreadyObserved) {
      this.#resizeObserver.observe(element)
    } else {
      const alreadyResized = this.#subscribers.find(
        (s) => s.element === element && s.entry
      )

      if (alreadyResized?.element.isConnected) {
        callback(alreadyResized.entry!)
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

  public unsubscribe(callback: ElementResizerCallback) {
    const subscriber = this.#subscribers.find(
      (sub) => sub.callback === callback
    )

    if (subscriber) {
      this.#subscribers = this.#subscribers.filter(
        (sub) => sub.callback !== subscriber.callback
      )

      if (
        !this.#subscribers.find((sub) => sub.element === subscriber.element)
      ) {
        this.#resizeObserver.unobserve(subscriber.element)
      }
    }
  }

  #resizeListener: ResizeObserverCallback = (entries) => {
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

export const elementResizer = new ElementResizer()
