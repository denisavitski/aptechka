export type ConnectCallback = (element: HTMLElement) => (() => void) | void
export type DisconnectCallback = (element: HTMLElement) => void

export let currentComponentElement = null! as ComponentCustomElement

export class ComponentCustomElement extends HTMLElement {
  public connectCallbacks: Set<ConnectCallback> = new Set()
  public disconnectCallbacks: Set<ConnectCallback> = new Set()

  constructor(callback: ConnectCallback) {
    super()

    currentComponentElement = this

    callback(this)
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
