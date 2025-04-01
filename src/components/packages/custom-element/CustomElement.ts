import { ElementOrSelector, whenDefined } from '@packages/utils'

export type CustomElementDisconnectCallback = () => void

export type CustomElementConnectCallback =
  () => void | CustomElementDisconnectCallback

export interface CustomElementAttributeChangeCallbackEntry {
  name: string
  oldValue: string | null
  newValue: string
}

export type CustomElementAttributeChangeCallback = (
  entry: CustomElementAttributeChangeCallbackEntry
) => void

export type CustomElementQueryCallback<T extends Element = Element> = (
  element: T
) => void | CustomElementDisconnectCallback

export class CustomElement extends HTMLElement {
  #connectListeners: Array<CustomElementConnectCallback> | null = null
  #tmpDisconnectListeners: Array<CustomElementDisconnectCallback> | null = null
  #disconnectListeners: Array<CustomElementDisconnectCallback> | null = null
  #attributeChangeListeners: Array<CustomElementAttributeChangeCallback> | null =
    null
  #definePromise: Promise<any> | null = null

  protected dependsOn(...args: Parameters<typeof whenDefined>) {
    if (!this.#definePromise) {
      this.#definePromise = whenDefined(...args)
    }
  }

  protected onConnect(callback: CustomElementConnectCallback) {
    if (!this.#connectListeners) {
      this.#connectListeners = []
    }

    this.#connectListeners.push(callback)
  }

  protected onDisconnect(callback: CustomElementDisconnectCallback) {
    if (!this.#disconnectListeners) {
      this.#disconnectListeners = []
    }

    this.#disconnectListeners.push(callback)
  }

  protected onAttributeChange(callback: CustomElementAttributeChangeCallback) {
    if (!this.#attributeChangeListeners) {
      this.#attributeChangeListeners = []
    }

    this.#attributeChangeListeners.push(callback)
  }

  protected async connectedCallback() {
    await this.#definePromise
    this.#definePromise = null

    this.#connectListeners?.forEach((listener) => {
      const disconnect = listener()

      if (disconnect) {
        if (!this.#tmpDisconnectListeners) {
          this.#tmpDisconnectListeners = []
        }

        this.#tmpDisconnectListeners.push(disconnect)
      }
    })
  }

  protected disconnectedCallback() {
    this.#disconnectListeners?.forEach((listener) => {
      listener()
    })

    this.#tmpDisconnectListeners?.forEach((listener) => {
      listener()
    })

    this.#tmpDisconnectListeners = null
  }

  protected attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    this.#attributeChangeListeners?.forEach((listener) => {
      listener({ name, oldValue, newValue })
    })
  }
}
