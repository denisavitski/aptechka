import { ElementConstructor } from '@packages/element-constructor'

export interface ComponentElementParameters {
  tag: Function
  attributes: null | { [key: string]: any }
  children: any[]
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

export class ComponentElement extends HTMLElement {
  #connectCallbacks: Set<ComponentConnectCallback> = new Set()
  #disconnectCallbacks: Set<ComponentDisconnectCallback> = new Set()
  #contexts: Map<string, any> = new Map()

  constructor(parameters: ComponentElementParameters) {
    super()

    currentComponentElement = this

    const res = parameters.tag({
      ...parameters.attributes,
      children: parameters.children,
    })

    new ElementConstructor(this, {
      children: res,
      ...nextComponentAttributes.value,
    })

    currentComponentElement = null!
    nextComponentAttributes.value = null
  }

  public addConnectCallback(callback: ComponentConnectCallback) {
    this.#connectCallbacks.add(callback)
  }

  public addDisconnectCallback(callback: ComponentConnectCallback) {
    this.#disconnectCallbacks.add(callback)
  }

  public createContext(name: string, value: any) {
    this.#contexts.set(name, value)
  }

  public getContext(name: string) {
    return this.#contexts.get(name)
  }

  public findContext(name: string) {
    return this.#findParentContextComponent(name)
  }

  protected connectedCallback() {
    this.#connectCallbacks.forEach((callback) => {
      const disconnectCallback = callback(this)

      if (disconnectCallback) {
        this.#disconnectCallbacks.add(disconnectCallback)
      }
    })
  }

  protected disconnectedCallback() {
    this.#disconnectCallbacks.forEach((callback) => {
      callback(this)
    })
  }

  #findParentContextComponent(
    contextName: string,
    _element: Element | null = this
  ): any {
    if (!_element) {
      return null
    }

    if (_element && 'findContext' in _element) {
      const context = (_element as ComponentElement).getContext(contextName)

      if (context) {
        return context
      }
    }

    let parentElement: Element | null = null

    if (_element.parentElement) {
      parentElement = _element.parentElement
    } else {
      const rootNode = _element.getRootNode()

      if (rootNode instanceof ShadowRoot) {
        parentElement = rootNode.host
      }
    }

    if (parentElement) {
      return this.#findParentContextComponent(contextName, parentElement)
    }

    return null
  }
}
