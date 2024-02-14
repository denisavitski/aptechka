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

export let contexts: Map<
  string,
  {
    componentElement: ComponentElement
    value: any
  }
> = new Map()

export class ComponentElement extends HTMLElement {
  #createCallbacks: Set<ComponentElementCreateCallback> = new Set()
  #connectCallbacks: Set<ComponentElementConnectCallback> = new Set()
  #disconnectCallbacks: Set<ComponentElementDisconnectCallback> = new Set()

  #stores: Set<Store<any, any, any>> = new Set()

  #elementConstructor: ElementConstructor

  constructor(callback: ComponentElementConstructorCallback) {
    super()

    currentComponentElement = this

    this.#elementConstructor = callback(this)

    contexts.forEach((context, key) => {
      if (context.componentElement === this) {
        contexts.delete(key)
      }
    })

    this.#createCallbacks.forEach((callback) => {
      callback(this)
    })
  }

  public addCreateCallback(callback: ComponentElementCreateCallback) {
    this.#createCallbacks.add(callback)
  }

  public addConnectCallback(callback: ComponentElementConnectCallback) {
    this.#connectCallbacks.add(callback)
  }

  public addDisconnectCallback(callback: ComponentElementDisconnectCallback) {
    this.#createCallbacks.add(callback)
  }

  public attachStore(store: Store<any, any, any>) {
    this.#stores.add(store)
  }

  protected connectedCallback() {
    this.#connectCallbacks.forEach((callback) => {
      const disconnect = callback(this)

      if (disconnect) {
        this.#disconnectCallbacks.add(callback)
      }
    })
  }

  protected disconnectedCallback() {
    this.#disconnectCallbacks.forEach((callback) => {
      callback(this)
    })

    this.#elementConstructor.destroy()

    this.#disconnectCallbacks.clear()
    this.#connectCallbacks.clear()
    this.#stores.forEach((store) => store.close())
    this.#stores.clear()
  }
}
