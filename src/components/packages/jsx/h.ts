import { Store } from '@packages/store'
import { camelToKebab, diff, patch } from '@packages/utils'
import { ComponentElement } from './ComponentElement'
import { setAttributes } from './utils/attributes/setAttributes'
import { createElement } from './utils/children/createElement'
import { filterChildren } from './utils/children/filterChildren'
import { hydrateTextNode } from './utils/children/hydrateTextNode'
import { storeChildren } from './utils/children/storeChildren'
import { subscribeToStore } from './utils/elementStoreSubscription'

export class Props {
  constructor(
    public tag: string,
    public attributes: JSX.Attributes | undefined,
    public children: JSX.Children,
  ) {}
}

export class ComponentProps extends Props {}
export class ElementProps extends Props {}
export class HeadProps extends Props {}

export const isHydrating = { value: false }
export const isDefining = { value: false }

export function appendChildren(
  element: Element,
  attributes: any,
  children: any,
  isSVG = false,
) {
  const filteredChildren = filterChildren(children)

  setAttributes(element, attributes)

  filteredChildren.forEach((child, index) => {
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

      if (isHydrating.value) {
        const existingChild = element.children[index]
        if (
          existingChild &&
          existingChild.nodeName.toLowerCase() === child.tag
        ) {
          childElement = existingChild
          appendChildren(childElement, child.attributes, child.children, isSVG)
        } else {
          childElement = createElement(child.tag, isSVG)
          appendChildren(childElement, child.attributes, child.children, isSVG)
          element.append(childElement)
        }
      } else {
        childElement = createElement(child.tag, isSVG)
        appendChildren(childElement, child.attributes, child.children, isSVG)
        element.append(childElement)
      }
    } else if (child instanceof HeadProps) {
      const headElement = document.createElement(child.tag)
      appendChildren(headElement, child.attributes, child.children)
      const patches = diff(document.head, headElement)
      patch(document.head, patches)
    } else {
      if (!isHydrating.value) {
        element.append(child)
      } else {
        hydrateTextNode(element, child, index)
      }
    }
  })
}

export const indexMap: Map<string, number> = new Map()

export function h(
  jsxTag: string | Function,
  attributes?: JSX.Attributes,
  ...children: JSX.Children
) {
  children = children.filter(Boolean).length
    ? children
    : (attributes as any)?.children

  delete (attributes as any)?.children

  if (children) {
    children = children.flat(2)
  }

  if (typeof jsxTag === 'string') {
    if (jsxTag === 'component') {
      return new ComponentProps(jsxTag, attributes, children)
    } else if (jsxTag === 'shadow') {
      return new ComponentProps(jsxTag, attributes, children)
    } else if (jsxTag === 'head') {
      return new HeadProps(jsxTag, attributes, children)
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

    const fillComponent = (element: ComponentElement) => {
      const props: JSX.ComponentBaseProps = {
        ...attributes,
        children,
      }

      const res = (jsxTag as Function)(props)

      if (__JSX_HMR_DEV__) {
        element.__props__ = props
      }

      if (res instanceof ElementProps) {
        appendChildren(element, {}, res)
      } else if (res instanceof ComponentProps) {
        appendChildren(element, res.attributes, res.children)
      }
    }

    const name = `e-${camelToKebab(jsxTag.name)}`

    let Constructor = customElements.get(name) as typeof ComponentElement

    if (!Constructor) {
      Constructor = class extends ComponentElement {
        static formAssociated = (jsxTag as JSX.Component).formAssociated

        constructor() {
          super()

          if (isDefining.value) {
            fillComponent(this)
          }
        }
      }

      customElements.define(name, Constructor)
    }

    if (isDefining.value) {
      return
    }

    const index = (indexMap.get(name) || 0) + 1
    indexMap.set(name, index)

    const id = attributes?.__hydrationId
      ? attributes.__hydrationId
      : `${jsxTag.name}-${index}`

    let element: ComponentElement

    if (isHydrating.value) {
      const existingElement = document.querySelector(`${name}[data-id="${id}"]`)

      if (existingElement && existingElement instanceof Constructor) {
        element = existingElement
      } else {
        element = new Constructor()
        element.setAttribute('data-id', id)
      }
    } else {
      element = new Constructor()
      element.setAttribute('data-id', id)
    }

    fillComponent(element)

    return element
  }
}

export function Fragment(children: any) {
  const fragment = document.createDocumentFragment()
  appendChildren(fragment as any, undefined, children)

  return fragment
}
