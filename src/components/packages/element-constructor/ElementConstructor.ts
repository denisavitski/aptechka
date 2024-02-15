import { Store } from '@packages/store'
import { SplitFirst, camelToKebab, isBrowser } from '@packages/utils'
import { knownSvgTags } from './knownSvgTags'
import { connector } from '@packages/connector'

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
  [K in keyof E]: E[K] extends string ? K : never
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

export type ElementConstructorTagObject<
  T extends ElementConstructorTagNames | Node = ElementConstructorTagNames
> = {
  class?: ElementConstructorClass
  style?: T extends 'style' ? ElementConstructorJSS : ElementConstructorStyle
  children?: any
  ref?: ElementConstructorRefCallback<T> | ElementConstructorRef<T>
  forceSvg?: boolean
  lightChildren?: any
  onDestroy?: () => void
} & ElementConstructorAttributes<T> &
  ElementConstructorEvents

export class ElementConstructor<
  T extends ElementConstructorTagNames | Node = ElementConstructorTagNames,
  N = T extends ElementConstructorTagNames
    ? ElementConstructorTagNameMap[T]
    : Node
> {
  #node: N
  #unsubscribeCallbacks: Array<Function> = []

  constructor(value: T, object?: ElementConstructorTagObject<T>)
  constructor(value: string, object?: ElementConstructorTagObject<T>)
  constructor(value: Node, object?: ElementConstructorTagObject<T>)
  constructor(...args: any[]) {
    const p1 = args[0] as T
    const p2 = args[1] as ElementConstructorTagObject<T> | undefined

    this.#node = this.#createNode(p1, p2?.forceSvg)

    this.#applyProperties(p2)
  }

  public get node() {
    return this.#node
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
    const isSvgOrHtml = this.#isSvgOrHtmlElement(this.#node)

    const ref = properties.ref
    const onDestroy = properties.onDestroy

    delete properties.ref
    delete properties.onDestroy

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
      if (typeof properties?.ref === 'function') {
        properties.ref(this.#node as any)
      } else {
        properties.ref.current = this.#node as any
      }
    }

    if (onDestroy) {
      this.#unsubscribeCallbacks.push(onDestroy)
    }

    if (isBrowser && this.#unsubscribeCallbacks.length) {
      const watchNode =
        this.#node instanceof DocumentFragment
          ? this.#node.firstChild
          : this.#node

      connector.subscribe(watchNode as Node, {
        disconnectCallback: this.#destroy,
        unsubscribeAfterDisconnect: true,
        maxWaitSec: 20,
      })
    }
  }

  #createClassList(classObject?: ElementConstructorClass) {
    const element = this.#node as HTMLElement

    if (!classObject) {
      return
    } else if (typeof classObject === 'string') {
      element.classList.add(classObject)
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
            element.classList.add(className)
          } else {
            element.classList.remove(className)
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
    const element = this.#node as HTMLElement

    this.#unsubscribeCallbacks.push(
      store.subscribe(({ current, previous }) => {
        if (previous) {
          ;[previous].flat().forEach((v) => {
            if (v) {
              element.classList.remove(v)
            }
          })
        }

        if (current) {
          ;[current].flat().forEach((v) => {
            if (v) {
              element.classList.add(v)
            }
          })
        }
      })
    )
  }

  #manageBooleanStoreClass(className: string, store: Store<boolean>) {
    const element = this.#node as HTMLElement

    this.#unsubscribeCallbacks.push(
      store.subscribe(({ current }) => {
        if (current) {
          element.classList.add(className)
        } else {
          element.classList.remove(className)
        }
      })
    )
  }

  #createStyle(object?: ElementConstructorStyle | ElementConstructorJSS) {
    if (!object) {
      return
    }

    const element = this.#node as HTMLElement

    const isJSS = element.tagName === 'style' || element.tagName === 'STYLE'

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
        this.#unsubscribeCallbacks.push(
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
    const element = this.#node as HTMLElement

    for (const key in object) {
      const value = (object as any)[key]

      if (typeof value === 'object' && !(value instanceof Store)) {
        element.appendChild(new Text(`${key} {`))
        this.#createJSSStyle(value)
        element.appendChild(new Text(`}`))
      } else {
        if (value instanceof Store) {
          const text = new Text()

          this.#unsubscribeCallbacks.push(
            value.subscribe((e) => {
              if (e.current) {
                text.nodeValue = `${camelToKebab(key)}: ${e.current};`
              } else {
                text.nodeValue = ''
              }
            })
          )

          element.appendChild(text)
        } else {
          element.appendChild(new Text(`${camelToKebab(key)}: ${value};`))
        }
      }
    }
  }

  #setStyleProperty(
    token: ElementConstructorStyleToken,
    value?: string | null | undefined
  ) {
    const element = this.#node as HTMLElement

    if (token.includes('--')) {
      if (value) {
        element.style.setProperty(token, value)
      } else {
        element.style.removeProperty(token)
      }
    } else {
      if (value) {
        element.style[token as any] = value
      } else {
        element.style[token as any] = ''
      }
    }
  }

  #createEvents(events?: ElementConstructorEvents) {
    if (!events) {
      return
    }

    const element = this.#node as HTMLElement

    for (const k in events) {
      const eventName = k as keyof ElementConstructorEvents
      const readyEventName = eventName
        .split('on')
        .slice(1)
        .map((v, i) => {
          return i === 0 ? v.toLocaleLowerCase() : v
        })
        .join('on')

      const listener = events[eventName]

      if (typeof listener === 'object') {
        element.addEventListener(
          readyEventName,
          listener.callback as EventListener,
          listener.options
        )
      } else if (typeof listener === 'function') {
        element.addEventListener(readyEventName, listener as EventListener)
      }
    }
  }

  #createAttributes(attributes?: ElementConstructorAttributes<any>) {
    for (const attributeName in attributes) {
      const value = attributes[attributeName]

      if (value instanceof Store) {
        this.#unsubscribeCallbacks.push(
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

        this.#unsubscribeCallbacks.push(
          child.subscribe(({ current }) => {
            this.#replaceChildren(
              storeRootElement,
              this.#getChildrenArray(current),
              Array.from(storeRootElement.childNodes)
            )
          })
        )
      } else if (child instanceof ElementConstructor) {
        this.#unsubscribeCallbacks.push(child.#destroy)
        root.appendChild(child.node)
      } else if (child instanceof Function) {
        this.#createChildren(root, child())
      } else {
        const childNodeOrUndefined = this.#getOrCreateNode(child)

        if (childNodeOrUndefined instanceof Node) {
          root.appendChild(childNodeOrUndefined)
        }
      }
    })
  }

  #getChildrenArray(children: any) {
    const arr = [children]
      .flat()
      .map((v) => {
        if (v instanceof ElementConstructor) {
          return v.node
        } else {
          return this.#getOrCreateNode(v)
        }
      })
      .flat()
      .filter(Boolean) as Array<Node>

    return arr
  }

  #replaceChildren(
    rootElement: HTMLElement,
    newChildren: Array<Node>,
    currentChildren: Array<Node>
  ) {
    currentChildren.forEach((currentChild, index) => {
      if (index < newChildren.length) {
        const newChild = newChildren[index]

        if (!this.#areNodesEqual(currentChild, newChild)) {
          rootElement.replaceChild(newChild, currentChild)
        }
      } else {
        rootElement.removeChild(currentChild)
      }
    })

    for (let i = currentChildren.length; i < newChildren.length; i++) {
      rootElement.appendChild(newChildren[i])
    }
  }

  #areNodesEqual(currentChild: Node, newChild: any) {
    if (!newChild) {
      return false
    }

    if (newChild instanceof Node) {
      return currentChild.isEqualNode(newChild)
    } else {
      return currentChild.textContent === newChild.toString()
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
        return new Text(str)
      }
    } else {
      return undefined
    }
  }

  #destroy = () => {
    this.#unsubscribeCallbacks.forEach((callback) => {
      callback()
    })

    this.#unsubscribeCallbacks = []
  }
}
