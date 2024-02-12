import { isBrowser } from '@packages/utils'

export type ConnectorCallback = () => void

interface ConnectorSubscriber {
  node: Node
  connectCallback?: ConnectorCallback
  disconnectCallback?: ConnectorCallback
  isConnected: boolean
  timer: number
  maxWaitSec: number
  unsubscribeAfterDisconnect: boolean
}

export interface ConnectorOptions {
  connectCallback?: ConnectorCallback
  disconnectCallback?: ConnectorCallback
  maxWaitSec?: number
  unsubscribeAfterDisconnect?: boolean
}

export class Connector {
  #subscribers: Array<ConnectorSubscriber> = []
  #intervalId: ReturnType<typeof setInterval> | undefined

  constructor() {
    if (isBrowser) {
      this.#intervalId = setInterval(this.#intervalListener, 100)
    }
  }

  public subscribe(node: Node, options: ConnectorOptions) {
    this.#subscribers.push({
      node,
      connectCallback: options.connectCallback,
      disconnectCallback: options.disconnectCallback,
      isConnected: false,
      maxWaitSec: options.maxWaitSec || Infinity,
      timer: 0,
      unsubscribeAfterDisconnect: options.unsubscribeAfterDisconnect || false,
    })

    return () => {
      this.unsubscribe(options)
    }
  }

  public unsubscribe(options: ConnectorOptions) {
    this.#subscribers.forEach((subscriber) => {
      if (subscriber.connectCallback === options.connectCallback) {
        subscriber.connectCallback = undefined
      }

      if (subscriber.disconnectCallback === options.disconnectCallback) {
        subscriber.disconnectCallback = undefined
      }
    })

    this.#subscribers = this.#subscribers.filter(
      (sub) => sub.connectCallback && sub.disconnectCallback
    )
  }

  public destroy() {
    clearInterval(this.#intervalId)
    this.#subscribers = []
  }

  #intervalListener = () => {
    for (let index = 0; index < this.#subscribers.length; index++) {
      const subscriber = this.#subscribers[index]

      if (subscriber.node.isConnected && !subscriber.isConnected) {
        subscriber.connectCallback?.()
        subscriber.isConnected = true
      } else if (!subscriber.node.isConnected && subscriber.isConnected) {
        subscriber.disconnectCallback?.()
        subscriber.isConnected = false
        if (subscriber.unsubscribeAfterDisconnect) {
          this.unsubscribe(subscriber)
        }
      }

      subscriber.timer += 100

      if (
        !subscriber.isConnected &&
        subscriber.timer > subscriber.maxWaitSec * 1000
      ) {
        this.unsubscribe(subscriber)
      }
    }
  }
}

export const connector = new Connector()
