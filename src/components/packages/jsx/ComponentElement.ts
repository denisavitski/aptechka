import { ElementConstructor } from '@packages/element-constructor'

export interface ComponentElementParameters {
  tag: Function
  attributes: null | { [key: string]: any }
}

export type ComponentCreateCallback<T = void> = (e: ComponentElement) => T

export type ComponentConnectCallback = (
  e: ComponentElement
) => void | (() => void)

export type ComponentDisconnectCallback = (e: ComponentElement) => void

export let currentComponentElement: ComponentElement = null!

export const nextComponentAttributes: { value: { [key: string]: any } | null } =
  {
    value: null,
  }

export let contextStack: Array<Map<string, any>> = []

export class ComponentElement extends HTMLElement {
  #connectCallbacks: Set<ComponentConnectCallback> = new Set()
  #disconnectCallbacks: Set<ComponentDisconnectCallback> = new Set()
  #contextMap: Map<string, any> = new Map()

  constructor(parameters?: ComponentElementParameters) {
    super()

    const prevComponentElement = currentComponentElement
    currentComponentElement = this

    this.#shareContext()

    const res = parameters?.tag({
      ...parameters.attributes,
    })

    const childrenType = nextComponentAttributes.value?.lightChildren
      ? 'lightChildren'
      : 'children'

    new ElementConstructor(this, {
      ...nextComponentAttributes.value,
      [childrenType]: res,
    })

    currentComponentElement = prevComponentElement
    nextComponentAttributes.value = null

    this.#unshareContext()
  }

  public addConnectCallback(callback: ComponentConnectCallback) {
    this.#connectCallbacks.add(callback)
  }

  public addDisconnectCallback(callback: ComponentConnectCallback) {
    this.#disconnectCallbacks.add(callback)
  }

  public createContext(name: string, value: any) {
    this.#contextMap.set(name, value)
  }

  protected connectedCallback() {
    currentComponentElement = this

    this.#connectCallbacks.forEach((callback) => {
      const disconnectCallback = callback(this)

      if (disconnectCallback) {
        this.#disconnectCallbacks.add(disconnectCallback)
      }
    })

    currentComponentElement = null!

    this.addEventListener('beforeChildrenChange', this.#shareContext)
    this.addEventListener('afterChildrenChange', this.#unshareContext)
  }

  protected disconnectedCallback() {
    this.#disconnectCallbacks.forEach((callback) => {
      callback(this)
    })

    this.removeEventListener('beforeChildrenChange', this.#shareContext)
    this.removeEventListener('afterChildrenChange', this.#unshareContext)
  }

  #shareContext = () => {
    contextStack.push(this.#contextMap)
  }

  #unshareContext = () => {
    contextStack = contextStack.filter((cs) => cs !== this.#contextMap)
  }
}
