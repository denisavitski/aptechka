import { TICK_ORDER } from '@packages/order'
import { ticker, TickerCallback } from '@packages/ticker'

export type ConnectorConnectCallback<T extends Node = Node> = (node: T) => void
export type ConnectorDisconnectCallback<T extends Node = Node> = (
  node: T,
  expired?: boolean
) => void

interface ConnectorSubscriber<T extends Node = Node> {
  node: T
  connectCallback?: ConnectorConnectCallback<T>
  disconnectCallback?: ConnectorDisconnectCallback<T>
  isConnected: boolean
  timer: number
  startTime: number
  maxWaitSec: number
  unsubscribeAfterDisconnect: boolean
}

export interface ConnectorOptions {
  connectCallback?: ConnectorConnectCallback
  disconnectCallback?: ConnectorDisconnectCallback
  maxWaitSec?: number
  unsubscribeAfterDisconnect?: boolean
}

export class Connector {
  #subscribers: Array<ConnectorSubscriber> = []
  #intervalId: ReturnType<typeof setInterval> | undefined

  public subscribe(node: Node, options: ConnectorOptions) {
    const l = this.#subscribers.length

    this.#subscribers.push({
      node,
      connectCallback: options.connectCallback,
      disconnectCallback: options.disconnectCallback,
      isConnected: false,
      maxWaitSec:
        typeof options.maxWaitSec === 'number' ? options.maxWaitSec : Infinity,
      timer: 0,
      startTime: performance.now(),
      unsubscribeAfterDisconnect: options.unsubscribeAfterDisconnect || false,
    })

    if (!l) {
      ticker.subscribe(this.#animationFrameListener, {
        order: TICK_ORDER.CONNECTOR,
      })
    }

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
      (sub) => sub.connectCallback || sub.disconnectCallback
    )

    if (!this.#subscribers.length) {
      ticker.unsubscribe(this.#animationFrameListener)
      this.#intervalId = undefined
    }
  }

  public destroy() {
    clearInterval(this.#intervalId)
    this.#subscribers = []
  }

  #animationFrameListener: TickerCallback = (e) => {
    for (let index = this.#subscribers.length - 1; index >= 0; index--) {
      const subscriber = this.#subscribers[index]

      if (subscriber.node.isConnected && !subscriber.isConnected) {
        subscriber.connectCallback?.(subscriber.node)
        subscriber.isConnected = true
      } else if (!subscriber.node.isConnected && subscriber.isConnected) {
        subscriber.disconnectCallback?.(subscriber.node)
        subscriber.isConnected = false

        if (subscriber.unsubscribeAfterDisconnect) {
          this.unsubscribe(subscriber)
        }
      }

      if (!subscriber.isConnected) {
        subscriber.timer = Math.max(
          0,
          e.timeElapsedSinceSubscription - subscriber.startTime
        )

        if (subscriber.timer > subscriber.maxWaitSec * 1000) {
          subscriber.disconnectCallback?.(subscriber.node, true)
          this.unsubscribe(subscriber)
        }
      }
    }
  }
}

export const connector = new Connector()
