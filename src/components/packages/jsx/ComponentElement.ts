export type ComponentConnectCallback = (
  element: HTMLElement,
) => void | ComponentDisconnectCallback
export type ComponentDisconnectCallback = (element: HTMLElement) => void

export const activeComponent: { current: ComponentElement } = { current: null! }

export class ComponentElement extends HTMLElement {
  #connectCallbacks: Array<ComponentConnectCallback> = []
  #disconnectCallbacks: Array<ComponentDisconnectCallback> = []

  constructor() {
    super()

    activeComponent.current = this
  }

  public addConnectCallback(callback: ComponentConnectCallback) {
    this.#connectCallbacks.push(callback)
  }

  public addDisconnectCallback(callback: ComponentDisconnectCallback) {
    this.#disconnectCallbacks.push(callback)
  }

  protected connectedCallback() {
    this.#connectCallbacks.forEach((callback) => {
      const unsub = callback(this)

      if (unsub) {
        this.#disconnectCallbacks.push(unsub)
      }
    })
  }

  protected disconnectedCallback() {
    this.#disconnectCallbacks.forEach((callback) => {
      callback(this)
    })

    this.#connectCallbacks = []
    this.#disconnectCallbacks = []
  }
}
