export type ComponentCustomElementCreateCallback = (
  element: HTMLElement
) => void
export type ComponentCustomElementConnectCallback = (
  element: HTMLElement
) => (() => void) | void
export type ComponentCustomElementDisconnectCallback = (
  element: HTMLElement
) => void

export let currentComponentElement = null! as ComponentCustomElement

export class ComponentCustomElement extends HTMLElement {
  public createCallbacks: Set<ComponentCustomElementCreateCallback> = new Set()
  public connectCallbacks: Set<ComponentCustomElementConnectCallback> =
    new Set()
  public disconnectCallbacks: Set<ComponentCustomElementDisconnectCallback> =
    new Set()

  constructor(callback: ComponentCustomElementConnectCallback) {
    super()

    currentComponentElement = this

    callback(this)

    this.createCallbacks.forEach((callback) => {
      callback(this)
    })
  }

  protected connectedCallback() {
    this.connectCallbacks.forEach((callback) => {
      const disconnect = callback(this)

      if (disconnect) {
        this.disconnectCallbacks.add(callback)
      }
    })
  }

  protected disconnectedCallback() {
    this.disconnectCallbacks.forEach((callback) => {
      callback(this)
    })
  }
}
