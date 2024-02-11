import { isBrowser } from '@packages/utils'

export type ComponentWrapperCreateCallback = (element: HTMLElement) => void
export type ComponentWrapperConnectCallback = (
  element: HTMLElement
) => (() => void) | void
export type ComponentWrapperDisconnectCallback = (element: HTMLElement) => void

export let currentComponentWrapper = null! as ComponentWrapper

export class ComponentWrapper {
  #element: HTMLElement
  #createCallbacks: Set<ComponentWrapperCreateCallback> = new Set()
  #connectCallbacks: Set<ComponentWrapperConnectCallback> = new Set()
  #disconnectCallbacks: Set<ComponentWrapperDisconnectCallback> = new Set()

  #resizeObserver: ResizeObserver = null!

  #isConnected = false

  constructor(element: () => HTMLElement) {
    currentComponentWrapper = this

    this.#element = element()

    this.#createCallbacks.forEach((callback) => {
      callback(this.#element)
    })

    if (isBrowser) {
      this.#resizeObserver = new ResizeObserver(() => {
        if (!this.#isConnected && this.#element.isConnected) {
          this.#isConnected = true

          this.#connectCallbacks.forEach((callback) => {
            const disconnect = callback(this.#element)

            if (disconnect) {
              this.addDisconnectCallback(disconnect)
            }
          })
        } else if (this.#isConnected && !this.#element.isConnected) {
          this.#isConnected = false

          this.#disconnectCallbacks.forEach((callback) => {
            callback(this.#element)
          })

          this.#resizeObserver.disconnect()
          this.#connectCallbacks.clear()
          this.#disconnectCallbacks.clear()
          this.#createCallbacks.clear()

          currentComponentWrapper = null!
        }
      })

      this.#resizeObserver.observe(this.#element)
    }
  }

  public get element() {
    return this.#element
  }

  public addCreateCallback(callback: ComponentWrapperCreateCallback) {
    this.#createCallbacks.add(callback)
  }

  public addConnectCallback(callback: ComponentWrapperConnectCallback) {
    this.#connectCallbacks.add(callback)
  }

  public addDisconnectCallback(callback: ComponentWrapperDisconnectCallback) {
    this.#disconnectCallbacks.add(callback)
  }
}
