import { type ElementOrSelector, getElement } from '@packages/utils'

export type SubtreeObserverCallback = (mutations: Array<MutationRecord>) => void

interface SubtreeObserverSubscriber {
  observer: MutationObserver
  element: Element
  callbacks: Array<SubtreeObserverCallback>
  records: Array<MutationRecord> | null
}

export class SubtreeObserver {
  #subscribers: Array<SubtreeObserverSubscriber> = []

  public subscribe(
    elementOrSelector: ElementOrSelector,
    callback: SubtreeObserverCallback,
  ) {
    const element = getElement(elementOrSelector)

    if (!element) {
      return () => {}
    }

    const alreadyObserved = this.#subscribers.find(
      (sub) => sub.element === element,
    )

    if (alreadyObserved) {
      alreadyObserved.callbacks.push(callback)

      return () => {
        this.unsubscribe(callback)
      }
    } else {
      const subscriber: SubtreeObserverSubscriber = {
        observer: null!,
        element,
        callbacks: [callback],
        records: null,
      }

      const mutationObserver = new MutationObserver((e) => {
        subscriber.records = e

        subscriber.callbacks.forEach((callback) => {
          callback(e)
        })
      })

      subscriber.observer = mutationObserver

      this.#subscribers.push(subscriber)

      mutationObserver.observe(element, { subtree: true, childList: true })
    }

    return () => {
      this.unsubscribe(callback)
    }
  }

  public unsubscribe(callback: SubtreeObserverCallback) {
    const subscriber = this.#subscribers.find((sub) =>
      sub.callbacks.includes(callback),
    )

    if (subscriber) {
      subscriber.callbacks = subscriber.callbacks.filter((c) => c !== callback)

      if (!subscriber.callbacks.length) {
        subscriber.observer.disconnect()
        this.#subscribers = this.#subscribers.filter((s) => s !== subscriber)
      }
    }
  }
}

export const subtreeObserver = new SubtreeObserver()
