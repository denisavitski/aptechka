export type ComponentConnectCallback = () => void
export type ComponentDisconnectCallback = () => void
export type ComponentInternalsCallback = (internals: ElementInternals) => void

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
      callback()
    })
  }

  protected disconnectedCallback() {
    this.#disconnectCallbacks.forEach((callback) => {
      callback()
    })

    this.#connectCallbacks = []
    this.#disconnectCallbacks = []
  }
}
