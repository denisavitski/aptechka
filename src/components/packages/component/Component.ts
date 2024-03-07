import {
  ElementConstructorTagObject,
  element,
} from '@packages/element-constructor'

export type ComponentDefaultProps<El extends HTMLElement = HTMLElement> = {
  element: El
}

export type ComponentConstructorCallback<
  Props extends object = {},
  El extends HTMLElement = HTMLElement
> = (
  props: Props & ComponentDefaultProps<El>
) => ElementConstructorTagObject<El> | void | null | undefined

export type ComponentConnectCallback = (
  element: HTMLElement
) => void | (() => void)

export type ComponentElementCallback = (element: HTMLElement) => void
export type ComponentBeforeCreateCallback<R = void> = (
  element: HTMLElement
) => R

export type ComponentInitObject = { name: string } & ShadowRootInit

export type ComponentReturn<Props extends object = {}> = (
  props?: Props
) => HTMLElement

export interface ComponentElement extends HTMLElement {
  addConnectCallback(callback: ComponentConnectCallback): void
  addDisconnectCallback(callback: ComponentElementCallback): void
  addAfterCreateCallback(callback: ComponentElementCallback): void
}

export interface ComponentOptions {
  formAssociated?: boolean
}

let currentComponentElement: ComponentElement = null!

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

export function onBeforeCreate<R>(callback: ComponentBeforeCreateCallback<R>) {
  return callback(currentComponentElement)
}

export function onAfterCreate(callback: ComponentElementCallback) {
  currentComponentElement.addAfterCreateCallback(callback)
}

export function Component<Props extends object = {}>(
  name: string,
  callback: ComponentConstructorCallback<Props>,
  options?: ComponentOptions
): ComponentReturn<Props>
export function Component<
  Props extends object = {},
  BaseElementConstructor extends typeof HTMLElement = typeof HTMLElement
>(
  Constructor: BaseElementConstructor,
  name: string,
  callback: ComponentConstructorCallback<
    Props,
    InstanceType<BaseElementConstructor>
  >,
  options?: ComponentOptions
): ComponentReturn<Props>
export function Component<Props extends object = {}>(
  ...args: any[]
): ComponentReturn<Props> {
  const Constructor =
    typeof args[0] === 'string'
      ? HTMLElement
      : (args[0] as CustomElementConstructor)

  const name = typeof args[0] === 'string' ? args[0] : (args[1] as string)

  const callback =
    typeof args[0] === 'string'
      ? args[1]
      : (args[2] as ComponentConstructorCallback<Props>)

  const elementName = `e-${name}`

  const options = (typeof args[0] === 'string' ? args[2] : args[3]) as
    | ComponentOptions
    | undefined

  let ComponentElementConstructor = customElements.get(
    elementName
  ) as CustomElementConstructor

  if (!ComponentElementConstructor) {
    ComponentElementConstructor = class extends Constructor {
      #connectCallbacks = new Set<ComponentConnectCallback>()
      #disconnectCallbacks = new Set<ComponentElementCallback>()
      #afterCreateCallbacks = new Set<ComponentElementCallback>()

      constructor(props: Props) {
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
        //@ts-ignore
        super.connectedCallback?.()

        this.#connectCallbacks.forEach((connectCallback) => {
          const disconnect = connectCallback(this)

          if (disconnect) {
            this.#disconnectCallbacks.add(disconnect)
          }
        })

        this.#connectCallbacks.clear()
      }

      protected disconnectedCallback() {
        //@ts-ignore
        super.disconnectedCallback?.()

        this.#disconnectCallbacks.forEach((disconnectCallback) => {
          disconnectCallback(this)
        })

        this.#disconnectCallbacks.clear()
      }
    }

    if (options?.formAssociated) {
      ;(ComponentElementConstructor as any).formAssociated = true
    }

    customElements.define(elementName, ComponentElementConstructor)
  }

  return (props?: Props) => {
    return new ComponentElementConstructor(props || ({} as Props))
  }
}
