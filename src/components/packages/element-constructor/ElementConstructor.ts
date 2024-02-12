import { Store } from '@packages/store'
import { isBrowser, camelToKebab } from '@packages/utils'

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

export type ElementConstructorEventNames = keyof ElementConstructorEventMap

export type ElementConstructorEventValue<E extends Event> =
  | {
      callback: (event: E) => void
      options?: AddEventListenerOptions
    }
  | ((event: E) => void)

export type ElementConstructorEvents = Partial<{
  [EventName in
    | ElementConstructorEventNames
    | `custom:${string}`]: EventName extends ElementConstructorEventNames
    ? ElementConstructorEventValue<HTMLElementEventMap[EventName]>
    : ElementConstructorEventValue<CustomEvent>
}>

export type ElementConstructorNativeAttribute<
  TagName extends ElementConstructorTagNames,
  E = ElementConstructorTagNameMap[TagName]
> = {
  [K in keyof E]: E[K] extends string ? K : never
}[keyof E]

export type ElementConstructorNativeAttributes<
  T extends ElementConstructorTagNames
> = Partial<{
  [K in ElementConstructorNativeAttribute<T>]: any
}>

export type ElementConstructorCustomAttributes = {
  [key: string]: any
}

export type ElementConstructorAttributes<T extends ElementConstructorTagNames> =
  ElementConstructorNativeAttributes<T> | ElementConstructorCustomAttributes

export type ElementConstructorParent = Node | ElementConstructor

export type ElementConstructorRefCallback<
  TagName extends ElementConstructorTagNames
> = (element: ElementConstructorTagNameMap[TagName]) => void

export type ElementConstructorRef<TagName extends ElementConstructorTagNames> =
  { current: ElementConstructorTagNameMap[TagName] }

export type ElementConstructorTagObject<
  TagName extends ElementConstructorTagNames = ElementConstructorTagNames
> = {
  class?: ElementConstructorClass
  style?: TagName extends 'style'
    ? ElementConstructorJSS
    : ElementConstructorStyle
  events?: ElementConstructorEvents
  attributes?: ElementConstructorAttributes<TagName>
  children?: any
  shadowChildren?: any
  parent?: ElementConstructorParent
  svg?: boolean
  ref?: ElementConstructorRefCallback<TagName> | ElementConstructorRef<TagName>
}

export type ElementConstructorObject =
  | Partial<{
      [T in ElementConstructorTagNames]: ElementConstructorTagObject<T>
    }>
  | {
      [key: `${string}-${string}`]: ElementConstructorTagObject<'div'>
    }

export type ElementConstructorType = HTMLElement | SVGElement

export class ElementConstructor<
  T extends ElementConstructorTagNames = ElementConstructorTagNames
> {
  #rootElements: Array<Node> = []
  #unsubscribeCallbacks: Array<Function> = []

  constructor(object: ElementConstructorObject)
  constructor(value: string, object: ElementConstructorTagObject<T>)
  constructor(element: Node, object: ElementConstructorTagObject<T>)
  constructor(...args: any[]) {
    const p1 = args[0]
    const p2 = args[1]

    if (isBrowser) {
      if (typeof p1 === 'string') {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = p1
        const element = wrapper.firstElementChild as HTMLElement
        this.#rootElements = [element]
        this.#applyProperties(element, p2)
      } else if (p1 instanceof Node) {
        this.#rootElements = [p1]
        this.#applyProperties(p1, p2)
      } else {
        this.#rootElements = this.#createElements(p1)
      }
    }
  }

  public get unsubscribeCallbacks() {
    return this.#unsubscribeCallbacks
  }

  public get rootElements() {
    return this.#rootElements
  }

  public destroy = () => {
    this.#unsubscribeCallbacks.forEach((unsubscribe) => {
      unsubscribe()
    })

    this.#unsubscribeCallbacks = []
  }

  #createElements(object: ElementConstructorObject) {
    const elements: Array<ElementConstructorType> = []

    for (const k in object) {
      const tagName = k as keyof ElementConstructorObject
      const properties = object[tagName] as ElementConstructorTagObject<any>
      const element = this.#createElement(tagName, properties?.svg)

      if (properties) {
        this.#applyProperties(element, properties)
      }

      elements.push(element)
    }

    return elements
  }

  #createElement(tagName: ElementConstructorTagNames, isSVG = false) {
    let element: HTMLElement | SVGElement = null!

    if (tagName.includes('-')) {
      element = new (customElements.get(tagName)!)()
    } else if (isSVG) {
      element = document.createElementNS('http://www.w3.org/2000/svg', tagName)
    } else {
      element = document.createElement(tagName)
    }

    return element
  }

  #isSvgOrHtmlElement(node: Node) {
    return node instanceof HTMLElement || node instanceof SVGElement
  }

  #applyProperties(node: Node, properties?: ElementConstructorTagObject<any>) {
    const isSvgOrHtml = this.#isSvgOrHtmlElement(node)

    for (const k in properties) {
      const propertyName = k as keyof ElementConstructorTagObject<any>

      if (propertyName === 'class' && isSvgOrHtml) {
        this.#createClassList(
          node as ElementConstructorType,
          properties[propertyName]
        )
      } else if (propertyName === 'style' && isSvgOrHtml) {
        this.#createStyle(
          node as ElementConstructorType,
          properties[propertyName]
        )
      } else if (propertyName === 'events' && isSvgOrHtml) {
        this.#createEvents(
          node as ElementConstructorType,
          properties[propertyName]
        )
      } else if (propertyName === 'attributes' && isSvgOrHtml) {
        this.#createAttributes(
          node as ElementConstructorType,
          properties[propertyName]
        )
      } else if (propertyName === 'children') {
        this.#createChildren(node, properties[propertyName])
      } else if (propertyName === 'shadowChildren') {
        this.#createChildren(
          node instanceof Element ? node.shadowRoot || node : node,
          properties[propertyName]
        )
      } else if (propertyName === 'parent') {
        this.#createParent(node, properties[propertyName])
      }
    }

    if (properties?.ref) {
      if (typeof properties?.ref === 'function') {
        properties.ref(node)
      } else {
        properties.ref.current = node
      }
    }
  }

  #createClassList(element: Element, classObject?: ElementConstructorClass) {
    if (!classObject) {
      return
    } else if (typeof classObject === 'string') {
      element.classList.add(classObject)
    } else if (Array.isArray(classObject)) {
      classObject.forEach((v) => {
        this.#createClassList(element, v)
      })
    } else if (typeof classObject === 'object') {
      if (classObject instanceof Store) {
        this.#manageStringStoreClass(
          element,
          classObject as
            | ElementConstructorStringStoreClass
            | ElementConstructorStringArrayStoreClass
        )
      } else {
        for (const className in classObject) {
          const isActive = classObject[className]

          if (isActive instanceof Store) {
            this.#manageBooleanStoreClass(element, className, isActive)
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
    element: Element,
    store:
      | ElementConstructorStringStoreClass
      | ElementConstructorStringArrayStoreClass
  ) {
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

  #manageBooleanStoreClass(
    element: Element,
    className: string,
    store: Store<boolean>
  ) {
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

  #createStyle(
    element: ElementConstructorType,
    object?: ElementConstructorStyle | ElementConstructorJSS
  ) {
    if (!object) {
      return
    }

    const isJSS = element.tagName === 'style' || element.tagName === 'STYLE'

    if (isJSS) {
      this.#createJSSStyle(element, object as ElementConstructorJSS)
    } else {
      this.#createAttributeStyle(element, object as ElementConstructorStyle)
    }
  }

  #createAttributeStyle(
    element: ElementConstructorType,
    object: ElementConstructorStyle
  ) {
    for (const k in object) {
      const token = k as ElementConstructorStyleToken
      const value = object[token]

      if (value instanceof Store) {
        this.#unsubscribeCallbacks.push(
          value.subscribe(({ current }) => {
            this.#setStyleProperty(element, token, current)
          })
        )
      } else {
        this.#setStyleProperty(element, token, value)
      }
    }
  }

  #createJSSStyle(
    element: ElementConstructorType,
    object: ElementConstructorJSS
  ) {
    for (const key in object) {
      const value = (object as any)[key]

      if (typeof value === 'object' && !(value instanceof Store)) {
        element.appendChild(new Text(`${key} {`))
        this.#createJSSStyle(element, value)
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
    element: ElementConstructorType,
    token: ElementConstructorStyleToken,
    value?: string | null | undefined
  ) {
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

  #createEvents(element: Element, events?: ElementConstructorEvents) {
    if (!events) {
      return
    }

    for (const k in events) {
      const eventName = k as keyof ElementConstructorEvents
      const listener = events[eventName]

      if (typeof listener === 'object') {
        element.addEventListener(
          eventName,
          listener.callback as EventListener,
          listener.options
        )
      } else if (typeof listener === 'function') {
        element.addEventListener(eventName, listener as EventListener)
      }
    }
  }

  #createAttributes(
    element: ElementConstructorType,
    attributes?: ElementConstructorAttributes<any>
  ) {
    for (const attributeName in attributes) {
      const value = attributes[attributeName]

      if (value instanceof Store) {
        this.#unsubscribeCallbacks.push(
          value.subscribe(({ current }) => {
            this.#setAttribute(element, attributeName, current)
          })
        )
      } else {
        this.#setAttribute(element, attributeName, value)
      }
    }
  }

  #setAttribute(
    element: ElementConstructorType,
    name: string,
    value: string | boolean | number | null | undefined
  ) {
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
        this.#unsubscribeCallbacks.push(child.destroy)
        child.rootElements.forEach((e) => {
          root.appendChild(e)
        })
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
          return v.rootElements
        } else {
          return this.#getOrCreateNode(v)
        }
      })
      .flat()
      .filter(Boolean) as Array<Node | ElementConstructorType>

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

  #createParent(element: Node, parent?: ElementConstructorParent) {
    if (!parent) {
      return
    }

    const parentNode =
      parent instanceof ElementConstructor ? parent.rootElements[0] : parent

    parentNode.appendChild(element)
  }
}

export function element(object: ElementConstructorObject): ElementConstructor
export function element<
  T extends ElementConstructorTagNames = ElementConstructorTagNames
>(value: string, object?: ElementConstructorTagObject<T>): ElementConstructor
export function element(
  element: HTMLElement,
  object: ElementConstructorTagObject<any>
): ElementConstructor
export function element(...args: any[]) {
  return new (ElementConstructor as any)(...args)
}

export function elementFactory(
  object: ElementConstructorObject
): () => ElementConstructor
export function elementFactory(
  element: HTMLElement,
  object: ElementConstructorTagObject<any>
): () => ElementConstructor
export function elementFactory(...args: any[]) {
  return () => {
    return new (ElementConstructor as any)(...args)
  }
}
