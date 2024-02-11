import { isBrowser } from '@packages/utils'

export type ComponentWrapperCreateCallback = (element: HTMLElement) => void
export type ComponentWrapperConnectCallback = (
  element: HTMLElement
) => (() => void) | void
export type ComponentWrapperDisconnectCallback = (element: HTMLElement) => void

export let currentComponentWrapper = null! as ComponentWrapper

export class ComponentWrapper {
  #elementOrFragment: HTMLElement | DocumentFragment
  #firstElement: HTMLElement

  #createCallbacks: Set<ComponentWrapperCreateCallback> = new Set()
  #connectCallbacks: Set<ComponentWrapperConnectCallback> = new Set()
  #disconnectCallbacks: Set<ComponentWrapperDisconnectCallback> = new Set()

  #resizeObserver: ResizeObserver = null!
  #isConnected = false

  constructor(elementCallback: () => HTMLElement | DocumentFragment) {
    currentComponentWrapper = this

    this.#elementOrFragment = elementCallback()

    this.#firstElement =
      this.#elementOrFragment instanceof DocumentFragment
        ? (this.#elementOrFragment.firstElementChild as HTMLElement)
        : this.#elementOrFragment

    this.#createCallbacks.forEach((callback) => {
      callback(this.#firstElement)
    })

    if (isBrowser) {
      this.#resizeObserver = new ResizeObserver(() => {
        if (!this.#isConnected && this.#firstElement.isConnected) {
          this.#isConnected = true

          this.#connectCallbacks.forEach((callback) => {
            const disconnect = callback(this.#firstElement)

            if (disconnect) {
              this.addDisconnectCallback(disconnect)
            }
          })
        } else if (this.#isConnected && !this.#firstElement.isConnected) {
          this.#isConnected = false

          this.#disconnectCallbacks.forEach((callback) => {
            callback(this.#firstElement)
          })

          this.#resizeObserver.disconnect()
          this.#connectCallbacks.clear()
          this.#disconnectCallbacks.clear()
          this.#createCallbacks.clear()

          currentComponentWrapper = null!
        }
      })

      this.#resizeObserver.observe(this.#firstElement)
    }
  }

  public get firstElement() {
    return this.#firstElement
  }

  public get elementOrFragment() {
    return this.#elementOrFragment
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
