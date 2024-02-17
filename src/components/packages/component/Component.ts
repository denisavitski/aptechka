import { CustomElement } from '@packages/custom-element'
import {
  ElementConstructorTagObject,
  element,
} from '@packages/element-constructor'

export type ComponentDefaultProps = { element: HTMLElement }

export type ComponentConstructorCallback<Props extends object = {}> = (
  props: Props & ComponentDefaultProps
) => ElementConstructorTagObject<HTMLElement> | void | null | undefined

export type ComponentConnectCallback = (
  element: HTMLElement
) => void | (() => void)

export type ComponentElementCallback = (element: HTMLElement) => void

export type ComponentInitObject = { name: string } & ShadowRootInit

export type ComponentReturn<Props extends object = {}> = (
  props?: Props
) => HTMLElement

let currentComponentElement: ComponentElement<any> = null!

export const contexts = new Map<
  string,
  {
    element: HTMLElement
    value: any
  }
>()

export function onConnect(callback: ComponentConnectCallback) {
  currentComponentElement.addConnectCallback(callback)
}

export function onDisconnect(callback: ComponentElementCallback) {
  currentComponentElement.addDisconnectCallback(callback)
}

export function onBeforeCreate(callback: ComponentElementCallback) {
  callback(currentComponentElement)
}

export function onAfterCreate(callback: ComponentElementCallback) {
  currentComponentElement.addAfterCreateCallback(callback)
}

class ComponentElement<Props extends object = {}> extends CustomElement {
  #connectCallbacks = new Set<ComponentConnectCallback>()
  #disconnectCallbacks = new Set<ComponentElementCallback>()
  #afterCreateCallbacks = new Set<ComponentElementCallback>()

  constructor(callback: ComponentConstructorCallback<Props>, props: Props) {
    super()

    currentComponentElement = this

    const object = callback({
      element: this,
      ...props,
    })

    if (object) {
      element(this, object)
    }

    this.#afterCreateCallbacks.forEach((callback) => {
      callback(this)
    })

    this.#afterCreateCallbacks.clear()

    contexts.forEach((context, name) => {
      if (context.element === this) {
        contexts.delete(name)
      }
    })
  }

  public addConnectCallback(callback: ComponentConnectCallback) {
    this.#connectCallbacks.add(callback)
  }

  public addDisconnectCallback(callback: ComponentElementCallback) {
    this.#disconnectCallbacks.add(callback)
  }

  public addAfterCreateCallback(callback: ComponentElementCallback) {
    this.#afterCreateCallbacks.add(callback)
  }

  protected connectedCallback() {
    this.#connectCallbacks.forEach((connectCallback) => {
      const disconnect = connectCallback(this)

      if (disconnect) {
        this.#disconnectCallbacks.add(disconnect)
      }
    })

    this.#connectCallbacks.clear()
  }

  protected disconnectedCallback() {
    this.#disconnectCallbacks.forEach((disconnectCallback) => {
      disconnectCallback(this)
    })

    this.#disconnectCallbacks.clear()
  }
}

export function Component<Props extends object = {}>(
  name: string,
  callback: ComponentConstructorCallback<Props>
): ComponentReturn<Props> {
  return (props?: Props) => {
    const elementName = `e-${name}`

    let ComponentElementConstructor = customElements.get(
      elementName
    ) as typeof ComponentElement<Props>

    if (!ComponentElementConstructor) {
      ComponentElementConstructor = class extends ComponentElement<Props> {}
      customElements.define(elementName, ComponentElementConstructor)
    }

    const element = new ComponentElementConstructor(
      callback,
      props || ({} as Props)
    )

    return element
  }
}
