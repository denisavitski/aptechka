import { Store } from '@packages/store'
import { camelToKebab } from '@packages/utils'
import { ComponentElement } from './ComponentElement'
import { setAttributes } from './utils/attributes/setAttributes'
import { filterChildren } from './utils/children/filterChildren'
import { storeChildren } from './utils/children/storeChildren'
import { subscribeToStore } from './utils/elementStoreSubscription'

class ComponentProps {
  constructor(
    public tag: string,
    public attributes: JSX.Attributes | undefined,
    public children: JSX.Children,
  ) {}
}

class ElementProps {
  constructor(
    public tag: string,
    public attributes: JSX.Attributes | undefined,
    public children: JSX.Children,
  ) {}
}

export function appendChildren(
  element: Element,
  attributes: JSX.Attributes | undefined,
  children: JSX.Children,
  isSVG = false,
) {
  const filteredChildren = filterChildren(children)

  setAttributes(element, attributes)

  filteredChildren.forEach((child) => {
    if (child instanceof Store) {
      subscribeToStore(element, child, () => {
        storeChildren(element, child)
      })
    } else if (child instanceof ComponentProps) {
      if (child.tag === 'shadow' && element.shadowRoot) {
        appendChildren(
          element.shadowRoot as any,
          child.attributes,
          child.children,
        )
      } else {
        appendChildren(element, child.attributes, child.children)
      }
    } else if (child instanceof ElementProps) {
      let childElement: Element = null!

      if (child.tag === 'svg') {
        childElement = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'svg',
        )
        appendChildren(childElement, child.attributes, child.children, true)
      } else {
        childElement = isSVG
          ? document.createElementNS('http://www.w3.org/2000/svg', child.tag)
          : document.createElement(child.tag)
      }

      appendChildren(childElement, child.attributes, child.children, isSVG)
      element.append(childElement)
    } else {
      element.append(child)
    }
  })
}

export function h(
  jsxTag: string | Function,
  attributes?: JSX.Attributes,
  ...children: JSX.Children
) {
  if (typeof jsxTag === 'string') {
    if (jsxTag === 'component') {
      return new ComponentProps(jsxTag, attributes, children)
    } else if (jsxTag === 'shadow') {
      return new ComponentProps(jsxTag, attributes, children)
    } else {
      return new ElementProps(jsxTag, attributes, children)
    }
  } else {
    if (jsxTag === Fragment) {
      return Fragment(children)
    }

    if ((jsxTag as JSX.Component).template) {
      const res = jsxTag({
        ...attributes,
      })

      return res
    }

    const name = `e-${camelToKebab(jsxTag.name)}`

    let Constructor = customElements.get(name) as typeof ComponentElement

    if (!Constructor) {
      Constructor = class extends ComponentElement {
        static formAssociated = (jsxTag as JSX.Component).formAssociated

        constructor() {
          super()
        }
      }

      customElements.define(name, Constructor)
    }

    const element = new Constructor()

    const props: JSX.ComponentBaseProps = {
      ...attributes,
      children,
    }

    const res = jsxTag(props)

    if (__JSX_HMR_DEV__) {
      element.__props__ = props
    }

    if (res instanceof ComponentProps || res instanceof ElementProps) {
      if (res?.children || res.attributes) {
        appendChildren(element, res.attributes, res.children)
      }
    }

    return element
  }
}

export function Fragment(children: any) {
  const fragment = document.createDocumentFragment()
  appendChildren(fragment as any, undefined, children)

  return fragment
}

declare const __JSX_HMR_DEV__: boolean
