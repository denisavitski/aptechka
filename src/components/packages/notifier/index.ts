export type ProviderCallback = (...args: any[]) => void

interface NotifierSubscriber {
  callback: ProviderCallback
  order: number
}

export class Notifier<Callback extends ProviderCallback = ProviderCallback> {
  #subscribers: Array<NotifierSubscriber> = []

  public close() {
    this.#subscribers = []
  }

  public subscribe(callback: Callback, order: number = 0) {
    if (this.#subscribers.find((subscriber) => subscriber.callback === callback)) {
      return () => {}
    }

    this.#subscribers.push({
      callback,
      order,
    })

    this.#subscribers = this.#subscribers.sort((a, b) => a.order - b.order)

    return () => {
      this.unsubscribe(callback)
    }
  }

  public unsubscribe(callback: Callback) {
    this.#subscribers = this.#subscribers.filter((subscriber) => subscriber.callback !== callback)
  }

  public notify(...parameters: Parameters<Callback>) {
    for (const subscriber of this.#subscribers) {
      subscriber.callback(...parameters)
    }
  }
}
