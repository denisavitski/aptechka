import { ElementConstructor } from '@packages/element-constructor'
import { Store } from '@packages/store'

export type ComponentElementCreateCallback = (element: ComponentElement) => void
export type ComponentElementConnectCallback = (
  element: ComponentElement
) => (() => void) | void
export type ComponentElementDisconnectCallback = (
  element: ComponentElement
) => void
export type ComponentElementConstructorCallback = (
  eleemnt: ComponentElement
) => ElementConstructor

export let currentComponentElement = null! as ComponentElement

export class ComponentElement extends HTMLElement {
  public createCallbacks: Set<ComponentElementCreateCallback> = new Set()
  public connectCallbacks: Set<ComponentElementConnectCallback> = new Set()
  public disconnectCallbacks: Set<ComponentElementDisconnectCallback> =
    new Set()

  public stores: Set<Store<any, any, any>> = new Set()

  #elementConstructor: ElementConstructor

  constructor(callback: ComponentElementConstructorCallback) {
    super()

    currentComponentElement = this

    this.#elementConstructor = callback(this)

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

    this.#elementConstructor.destroy()

    this.disconnectCallbacks.clear()
    this.connectCallbacks.clear()
    this.stores.forEach((store) => store.close())
    this.stores.clear()
  }
}
