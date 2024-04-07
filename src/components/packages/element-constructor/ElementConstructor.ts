import { Store } from '@packages/store'
import {
  SplitFirst,
  camelToKebab,
  isBrowser,
  isESClass,
  uncapitalize,
} from '@packages/utils'
import { knownSvgTags } from './knownSvgTags'
import {
  ConnectorConnectCallback,
  ConnectorDisconnectCallback,
  connector,
} from '@packages/connector'

export type StoreOr<T> = T | Store<T>

export type ElementConstructorTagNameMap = HTMLElementTagNameMap &
  SVGElementTagNameMap

export type ElementConstructorTagNames = keyof ElementConstructorTagNameMap

export type ElementConstructorStringStoreClass =
  | Store<string | null | undefined>
  | Store<string>

export type ElementConstructorStringArrayStoreClass =
  | Store<Array<string | null | undefined>>
  | Store<Array<string>>

export type ElementConstructorClass =
  | string
  | Array<
      | string
      | ElementConstructorStringStoreClass
      | ElementConstructorStringArrayStoreClass
    >
  | ElementConstructorStringStoreClass
  | ElementConstructorStringArrayStoreClass
  | { [key: string]: boolean | Store<boolean> }

export type ElementConstructorStyleToken = Exclude<
  Extract<keyof CSSStyleDeclaration, string> | `--${string}`,
  'length' | 'parentRule'
>

export type ElementConstructorStyleValue = string | Store<any>

export type ElementConstructorStyle = Partial<{
  [K in ElementConstructorStyleToken]: ElementConstructorStyleValue
}>

export type ElementConstructorJSSWrapper = {
  [key: string]: object | ElementConstructorStyle
}

export type ElementConstructorJSS =
  | ElementConstructorStyle
  | {
      [key: string]: ElementConstructorJSSWrapper | ElementConstructorStyle
    }

export type ElementConstructorEventMap = HTMLElementEventMap &
  SVGElementEventMap

export type ElementConstructorNativeAttribute<
  T extends ElementConstructorTagNames | Node = ElementConstructorTagNames,
  E = T extends ElementConstructorTagNames
    ? ElementConstructorTagNameMap[T]
    : Node
> = {
  [K in keyof E]: E[K] extends string | null ? K : never
}[keyof E]

export type ElementConstructorNativeAttributes<
  T extends ElementConstructorTagNames | Node = ElementConstructorTagNames
> = Partial<{
  [K in ElementConstructorNativeAttribute<T>]: any
}>

export type ElementConstructorCustomAttributes = {
  [key: string]: any
}

export type ElementConstructorAttributes<
  T extends ElementConstructorTagNames | Node = ElementConstructorTagNames
> = ElementConstructorNativeAttributes<T> | ElementConstructorCustomAttributes

export type ElementConstructorParent = Node | ElementConstructor

export type ElementConstructorRefCallback<
  T extends ElementConstructorTagNames | Node = ElementConstructorTagNames
> = (
  element: T extends ElementConstructorTagNames
    ? ElementConstructorTagNameMap[T]
    : Node
) => void

export type ElementConstructorRef<
  T extends ElementConstructorTagNames | Node = ElementConstructorTagNames
> = {
  current: T extends ElementConstructorTagNames
    ? ElementConstructorTagNameMap[T]
    : Node
}

export type ElementConstructorEventValue<E extends Event> =
  | {
      callback: (event: E) => void
      options?: AddEventListenerOptions
    }
  | ((event: E) => void)

export type ElementConstructorEvents = Partial<{
  [K in `on${Capitalize<
    keyof ElementConstructorEventMap
  >}`]: ElementConstructorEventValue<
    ElementConstructorEventMap[Extract<
      Uncapitalize<SplitFirst<K, 'on'>[1]>,
      keyof ElementConstructorEventMap
    >]
  >
}>

export type ElementConstructorChildrenChangeCallback = () => void

export type ElementConstructorTagObject<
  T extends ElementConstructorTagNames | Node = ElementConstructorTagNames
> = {
  class?: ElementConstructorClass
  style?: T extends 'style' ? ElementConstructorJSS : ElementConstructorStyle
  children?: any
  ref?: ElementConstructorRefCallback<T> | ElementConstructorRef<T>
  forceSvg?: boolean
  lightChildren?: any
  onDisconnect?: ConnectorDisconnectCallback
  onConnect?: ConnectorConnectCallback
} & ElementConstructorAttributes<T> &
  ElementConstructorEvents

export class ElementConstructor<
  T extends ElementConstructorTagNames | Node = ElementConstructorTagNames,
  N = T extends ElementConstructorTagNames
    ? ElementConstructorTagNameMap[T]
    : Node
> {
  #node: N = null!
  #connectCallbacks: Set<Function> = new Set()
  #disconnectCallbacks: Set<Function> = new Set()
  #connectorUnsubscribeCallback: (() => void) | undefined
  #storeRootElements: Array<HTMLElement> | undefined
  #events:
    | Array<{
        name: string
        callback: any
        options?: any
      }>
    | undefined

  constructor(value: T, object?: ElementConstructorTagObject<T>)
  constructor(value: string, object?: ElementConstructorTagObject<T>)
  constructor(value: Node, object?: ElementConstructorTagObject<T>)
  constructor(...args: any[]) {
    if (isBrowser) {
      const p1 = args[0] as T
      const p2 = args[1] as ElementConstructorTagObject<T> | undefined

      this.#node = this.#createNode(p1, p2?.forceSvg)

      this.#applyProperties(p2)
    }
  }

  public get node() {
    return this.#node
  }

  public set node(v) {
    this.#detachEvents()

    this.#node = v

    this.#connectorUnsubscribeCallback?.()

    if (this.#node instanceof Element) {
      this.#storeRootElements = [
        ...this.#node.querySelectorAll<HTMLElement>('store-root'),
      ]
    }

    this.#attachEvents()

    this.#watchNode()
  }

  #createNode(value: any, forceSvg?: boolean) {
    let node: N = null!

    if (value instanceof Node) {
      node = value as N
    } else if (typeof value === 'string') {
      if (!value.includes('<') && value.includes('-')) {
        node = new (customElements.get(value)!)() as N
      } else if (value.includes('<')) {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = value
        node = wrapper.firstElementChild as N
      } else if (knownSvgTags.has(value) || forceSvg) {
        node = document.createElementNS(
          'http://www.w3.org/2000/svg',
          value
        ) as N
      } else {
        node = document.createElement(value) as N
      }
    } else {
      node = document.createElement('div') as N
    }

    return node
  }

  #isSvgOrHtmlElement(node: N) {
    return node instanceof HTMLElement || node instanceof SVGElement
  }

  #applyProperties(properties?: any) {
    if (!properties) return

    const isSvgOrHtml = this.#isSvgOrHtmlElement(this.#node)

    const ref = properties.ref
    delete properties.ref

    if (properties?.onConnect) {
      this.#connectCallbacks.add(properties.onConnect)
      delete properties.onConnect
    }

    if (properties?.onDisconnect) {
      this.#disconnectCallbacks.add(properties.onDisconnect)
      delete properties.onDisconnect
    }

    let attributes: any
    let events: any

    for (const propertyName in properties) {
      const value = properties[propertyName]

      if (propertyName === 'class' && isSvgOrHtml) {
        this.#createClassList(value)
      } else if (propertyName === 'style' && isSvgOrHtml) {
        this.#createStyle(value)
      } else if (propertyName === 'lightChildren') {
        this.#createChildren(this.#node as any, value)
      } else if (propertyName === 'children') {
        this.#createChildren(
          this.#node instanceof Element
            ? this.#node.shadowRoot || this.#node
            : (this.#node as any),
          value
        )
      } else if (propertyName.startsWith('on')) {
        if (!events) {
          events = {}
        }

        events[propertyName] = value
      } else {
        if (!attributes) {
          attributes = {}
        }

        attributes[propertyName] = value
      }
    }

    this.#createAttributes(attributes)
    this.#createEvents(events)

    if (ref) {
      if (typeof ref === 'function') {
        ref(this.#node as any)
      } else {
        ref.current = this.#node as any
      }
    }

    this.#watchNode()
  }

  #watchNode() {
    if (
      isBrowser &&
      (this.#disconnectCallbacks.size || this.#connectCallbacks.size)
    ) {
      const watchNode =
        this.#node instanceof DocumentFragment
          ? this.#node.firstChild
          : this.#node

      this.#connectorUnsubscribeCallback = connector.subscribe(
        watchNode as Node,
        {
          connectCallback: this.#connect,
          disconnectCallback: this.#disconnect,
          unsubscribeAfterDisconnect: true,
          maxWaitSec: 20,
        }
      )
    }
  }

  #createClassList(classObject?: ElementConstructorClass) {
    if (!classObject) {
      return
    } else if (typeof classObject === 'string') {
      ;(this.#node as HTMLElement).classList.add(classObject)
    } else if (Array.isArray(classObject)) {
      classObject.forEach((v) => {
        this.#createClassList(v)
      })
    } else if (typeof classObject === 'object') {
      if (classObject instanceof Store) {
        this.#manageStringStoreClass(
          classObject as
            | ElementConstructorStringStoreClass
            | ElementConstructorStringArrayStoreClass
        )
      } else {
        for (const className in classObject) {
          const isActive = classObject[className]

          if (isActive instanceof Store) {
            this.#manageBooleanStoreClass(className, isActive)
          } else if (isActive) {
            ;(this.#node as HTMLElement).classList.add(className)
          } else {
            ;(this.#node as HTMLElement).classList.remove(className)
          }
        }
      }
    }
  }

  #manageStringStoreClass(
    store:
      | ElementConstructorStringStoreClass
      | ElementConstructorStringArrayStoreClass
  ) {
    this.#disconnectCallbacks.add(
      store.subscribe(({ current, previous }) => {
        if (previous) {
          ;[previous].flat().forEach((v) => {
            if (v) {
              ;(this.#node as Element).classList.remove(v)
            }
          })
        }

        if (current) {
          ;[current].flat().forEach((v) => {
            if (v) {
              ;(this.#node as Element).classList.add(v)
            }
          })
        }
      })
    )
  }

  #manageBooleanStoreClass(className: string, store: Store<boolean>) {
    this.#disconnectCallbacks.add(
      store.subscribe(({ current }) => {
        if (current) {
          ;(this.#node as Element).classList.add(className)
        } else {
          ;(this.#node as Element).classList.remove(className)
        }
      })
    )
  }

  #createStyle(object?: ElementConstructorStyle | ElementConstructorJSS) {
    if (!object) {
      return
    }

    const isJSS =
      (this.#node as HTMLElement).tagName === 'style' ||
      (this.#node as HTMLElement).tagName === 'STYLE'

    if (isJSS) {
      this.#createJSSStyle(object as ElementConstructorJSS)
    } else {
      this.#createAttributeStyle(object as ElementConstructorStyle)
    }
  }

  #createAttributeStyle(object: ElementConstructorStyle) {
    for (const k in object) {
      const token = k as ElementConstructorStyleToken
      const value = object[token]

      if (value instanceof Store) {
        this.#disconnectCallbacks.add(
          value.subscribe(({ current }) => {
            this.#setStyleProperty(token, current)
          })
        )
      } else {
        this.#setStyleProperty(token, value)
      }
    }
  }

  #createJSSStyle(object: ElementConstructorJSS) {
    for (const key in object) {
      const value = (object as any)[key]

      if (typeof value === 'object' && !(value instanceof Store)) {
        ;(this.#node as HTMLElement).appendChild(
          document.createTextNode(`${key} {`)
        )
        this.#createJSSStyle(value)
        ;(this.#node as HTMLElement).appendChild(document.createTextNode(`}`))
      } else {
        if (value instanceof Store) {
          const text = document.createTextNode('')

          this.#disconnectCallbacks.add(
            value.subscribe((e) => {
              if (e.current) {
                text.nodeValue = `${camelToKebab(key)}: ${e.current};`
              } else {
                text.nodeValue = ''
              }
            })
          )
          ;(this.#node as HTMLElement).appendChild(text)
        } else {
          ;(this.#node as HTMLElement).appendChild(
            document.createTextNode(`${camelToKebab(key)}: ${value};`)
          )
        }
      }
    }
  }

  #setStyleProperty(
    token: ElementConstructorStyleToken,
    value?: string | null | undefined
  ) {
    if (token.includes('--')) {
      if (value) {
        ;(this.#node as HTMLElement).style.setProperty(token, value)
      } else {
        ;(this.#node as HTMLElement).style.removeProperty(token)
      }
    } else {
      if (value) {
        ;(this.#node as HTMLElement).style[token as any] = value
      } else {
        ;(this.#node as HTMLElement).style[token as any] = ''
      }
    }
  }

  #createEvents(events?: ElementConstructorEvents) {
    if (!events) {
      return
    }

    if (!this.#events) {
      this.#events = []
    }

    for (const k in events) {
      const eventName = k as keyof ElementConstructorEvents
      const readyEventName = uncapitalize(
        eventName.split('on').slice(1).join('on')
      )

      const listener = events[eventName]

      if (typeof listener === 'object') {
        this.#events.push({
          name: readyEventName,
          callback: listener.callback,
          options: listener.options,
        })
      } else if (typeof listener === 'function') {
        this.#events.push({
          name: readyEventName,
          callback: listener,
        })
      }
    }

    this.#attachEvents()
  }

  #attachEvents() {
    this.#events?.forEach((event) => {
      ;(this.#node as HTMLElement).addEventListener(
        event.name,
        event.callback,
        event.options
      )
    })
  }

  #detachEvents() {
    this.#events?.forEach((event) => {
      ;(this.#node as HTMLElement).removeEventListener(
        event.name,
        event.callback,
        event.options
      )
    })
  }

  #createAttributes(attributes?: ElementConstructorAttributes<any>) {
    for (const attributeName in attributes) {
      const value = attributes[attributeName]

      if (value instanceof Store) {
        this.#disconnectCallbacks.add(
          value.subscribe(({ current }) => {
            this.#setAttribute(attributeName, current)
          })
        )
      } else {
        this.#setAttribute(attributeName, value)
      }
    }
  }

  #setAttribute(
    name: string,
    value: string | boolean | number | null | undefined
  ) {
    const element = this.#node as HTMLElement

    if (
      name in element &&
      !(element.constructor as any)?.observedAttributes?.includes(name)
    ) {
      if (value != undefined) {
        ;(element as any)[name as any] = value.toString()
      }
    } else {
      if (value != undefined) {
        element.setAttribute(name, value.toString())
      }
    }
  }

  #createChildren(root: Node | ShadowRoot, children?: any) {
    if (!children) {
      return
    }

    children = [children].flat()

    children.forEach((child: any) => {
      if (child instanceof Store) {
        const storeRootElement = document.createElement('div')

        storeRootElement.style.display = 'contents'
        root.appendChild(storeRootElement)

        if (!this.#storeRootElements) {
          this.#storeRootElements = []
        }

        const storeRootElementIndex = this.#storeRootElements.length

        storeRootElement.setAttribute('store-root', '')

        this.#storeRootElements.push(storeRootElement)

        this.#disconnectCallbacks.add(
          child.subscribe(({ current, previous }) => {
            const rootElement = this.#storeRootElements![storeRootElementIndex]

            rootElement.dispatchEvent(
              new CustomEvent('beforeChildrenChange', {
                bubbles: true,
                composed: true,
              })
            )

            const currentNodes = Array.from(rootElement.childNodes)

            const currentItems = [current].flat()
            const previousItems = [previous].flat()

            const nodesToDelete: Array<Node> = []

            const previousItemsWithDeletedItems: Array<any> = []

            previousItems.forEach((previousItem, index) => {
              if (!currentItems.includes(previousItem) && currentNodes[index]) {
                nodesToDelete.push(currentNodes[index])
              } else {
                previousItemsWithDeletedItems.push(previousItem)
              }
            })

            currentItems.forEach((currentItem, index) => {
              if (previousItemsWithDeletedItems[index]) {
                if (currentItem !== previousItemsWithDeletedItems[index]) {
                  const newNode = this.#getNode(currentItem)
                  const currentNode = currentNodes[index]

                  if (newNode instanceof Node) {
                    if (!currentNode.isEqualNode(newNode)) {
                      rootElement.replaceChild(newNode, currentNode)
                    }
                  } else {
                    rootElement.removeChild(currentNode)
                  }
                }
              } else {
                const newNode = this.#getNode(currentItem)

                if (newNode instanceof Node) {
                  storeRootElement.appendChild(newNode)
                }
              }
            })

            nodesToDelete.forEach((node) => {
              rootElement.removeChild(node)
            })

            rootElement.dispatchEvent(
              new CustomEvent('afterChildrenChange', {
                bubbles: true,
                composed: true,
              })
            )
          })
        )
      } else if (child instanceof ElementConstructor) {
        this.#appendChild(root, child.node)
      } else if (child instanceof Function) {
        this.#createChildren(root, isESClass(child) ? new child() : child())
      } else {
        const childNodeOrUndefined = this.#getOrCreateNode(child)

        if (childNodeOrUndefined instanceof Node) {
          this.#appendChild(root, childNodeOrUndefined)
        }
      }
    })
  }

  #appendChild(root: Node | ShadowRoot, node: Node) {
    if (
      !(root instanceof ShadowRoot) &&
      node instanceof HTMLElement &&
      node.tagName === 'STYLE'
    ) {
      this.#connectCallbacks.add(() => {
        const styleTags = [...document.head.querySelectorAll('style')]

        if (!styleTags.find((s) => s.outerHTML === node.outerHTML)) {
          document.head.appendChild(node)
        }
      })

      this.#disconnectCallbacks.add(() => {
        node.remove()
      })
    } else {
      root.appendChild(node)
    }
  }

  #getNode(child: any) {
    if (child instanceof ElementConstructor) {
      return child.node
    } else if (typeof child === 'function') {
      return isESClass(child) ? new child() : child()
    } else {
      return this.#getOrCreateNode(child)
    }
  }

  #getOrCreateNode(child: any) {
    if (child instanceof Node) {
      return child
    } else if (child != undefined) {
      const str = String(child)

      if (str.trim().startsWith('<') && str.trim().endsWith('>')) {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = str
        return wrapper.firstElementChild!
      } else {
        return document.createTextNode(str)
      }
    } else {
      return undefined
    }
  }

  #connect: ConnectorConnectCallback = () => {
    this.#connectCallbacks.forEach((callback) => {
      callback()
    })

    this.#connectCallbacks.clear()
  }

  #disconnect: ConnectorDisconnectCallback = (expired) => {
    this.#disconnectCallbacks.forEach((callback) => {
      callback(expired)
    })

    this.#disconnectCallbacks.clear()

    this.#detachEvents()
  }
}

declare global {
  interface HTMLElementEventMap {
    beforeChildrenChange: CustomEvent
  }

  interface HTMLElementEventMap {
    afterChildrenChange: CustomEvent
  }
}
