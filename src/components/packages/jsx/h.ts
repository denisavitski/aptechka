import { Store } from '@packages/store'
import { camelToKebab, diff, patch } from '@packages/utils'
import { ComponentElement } from './ComponentElement'
import { setAttributes } from './utils/attributes/setAttributes'
import { createElement } from './utils/children/createElement'
import { filterChildren } from './utils/children/filterChildren'
import { hydrateTextNode } from './utils/children/hydrateTextNode'
import { storeChildren } from './utils/children/storeChildren'
import { subscribeToStore } from './utils/elementStoreSubscription'

class Props {
  constructor(
    public tag: string,
    public attributes: JSX.Attributes | undefined,
    public children: JSX.Children,
  ) {}
}

class ComponentProps extends Props {}
class ElementProps extends Props {}
class HeadProps extends Props {}

function appendChildren(
  element: Element,
  attributes: any,
  children: any,
  isSVG = false,
) {
  const filteredChildren = filterChildren(children)

  setAttributes(element, attributes)

  filteredChildren.forEach((child, index) => {
    handleChild(element, child, index, isSVG)
  })
}

function handleChild(
  element: Element,
  child: any,
  index: number,
  isSVG: boolean,
) {
  if (child instanceof Store) {
    handleStoreChild(element, child)
  } else if (child instanceof ComponentProps) {
    handleComponentProps(element, child)
  } else if (child instanceof ElementProps) {
    handleElementProps(element, child, index, isSVG)
  } else if (child instanceof HeadProps) {
    handleHeadProps(child)
  } else {
    handleTextNode(element, child, index)
  }
}

function handleStoreChild(element: Element, child: Store) {
  subscribeToStore(element, child, () => {
    storeChildren(element, child)
  })
}

function handleComponentProps(element: Element, child: ComponentProps) {
  if (child.tag === 'shadow' && element.shadowRoot) {
    appendChildren(element.shadowRoot as any, child.attributes, child.children)
  } else {
    appendChildren(element, child.attributes, child.children)
  }
}

function handleElementProps(
  element: Element,
  child: ElementProps,
  index: number,
  isSVG: boolean,
) {
  let childElement: Element | null = null

  if (isHydrating.value) {
    const existingChild = element.children[index]
    if (existingChild?.nodeName.toLowerCase() === child.tag) {
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
}

function handleHeadProps(child: HeadProps) {
  const headElement = document.createElement(child.tag)
  appendChildren(headElement, child.attributes, child.children)
  const patches = diff(document.head, headElement)
  patch(document.head, patches)
}

function handleTextNode(element: Element, child: any, index: number) {
  if (!isHydrating.value) {
    element.append(child)
  } else {
    hydrateTextNode(element, child, index)
  }
}

function processChildren(
  attributes: JSX.Attributes | undefined,
  children: JSX.Children,
) {
  let result = children.filter(Boolean).length ? children : attributes?.children
  return result ? result.flat(2) : []
}

function handleStringTag(
  tag: string,
  attributes: JSX.Attributes | undefined,
  children: JSX.Children,
) {
  switch (tag) {
    case 'component':
    case 'shadow':
      return new ComponentProps(tag, attributes, children)
    case 'head':
      return new HeadProps(tag, attributes, children)
    default:
      return new ElementProps(tag, attributes, children)
  }
}

function handleFunctionTag(
  jsxTag: Function,
  attributes: JSX.Attributes | undefined,
  children: JSX.Children,
) {
  if (jsxTag === Fragment) {
    return Fragment(children)
  }

  if ((jsxTag as JSX.Component).template) {
    return jsxTag({ ...attributes })
  }

  return createCustomElement(jsxTag, attributes, children)
}

function createCustomElement(
  jsxTag: Function,
  attributes: JSX.Attributes | undefined,
  children: JSX.Children,
) {
  const name = `e-${camelToKebab(jsxTag.name)}`
  const Constructor = getOrDefineCustomElement(name, jsxTag)

  if (isDefining.value) {
    return undefined as any
  }

  const id = generateElementId(jsxTag.name, attributes)
  const element = getOrCreateElement(name, id, Constructor)

  fillComponentElement(element, jsxTag, attributes, children)

  return element
}

function getOrDefineCustomElement(name: string, jsxTag: Function) {
  let Constructor = customElements.get(name) as typeof ComponentElement

  if (!Constructor) {
    Constructor = class extends ComponentElement {
      static formAssociated = (jsxTag as JSX.Component).formAssociated

      constructor() {
        super()

        if (isDefining.value) {
          fillComponentElement(this, jsxTag, {}, [])
        }
      }
    }

    customElements.define(name, Constructor)
  }

  return Constructor
}

function generateElementId(
  tagName: string,
  attributes: JSX.Attributes | undefined,
) {
  if (attributes?.__hydrationId) {
    return attributes.__hydrationId
  }

  const index = (indexMap.get(tagName) || 0) + 1
  indexMap.set(tagName, index)
  return `${tagName}-${index}`
}

function getOrCreateElement(
  name: string,
  id: string,
  Constructor: typeof ComponentElement,
) {
  if (isHydrating.value) {
    const selector = `${name}[data-id="${id}"]`
    const existingElement = document.querySelector(selector)

    if (existingElement && existingElement instanceof Constructor) {
      return existingElement
    }
  }

  const element = new Constructor()
  element.setAttribute('data-id', id)
  return element
}

function fillComponentElement(
  element: ComponentElement,
  jsxTag: Function,
  attributes: JSX.Attributes | undefined,
  children: JSX.Children,
) {
  const props: JSX.ComponentBaseProps = {
    ...attributes,
    children,
  }

  const result = jsxTag(props)

  if (__JSX_HMR_DEV__) {
    element.__props__ = props
  }

  if (result instanceof ElementProps) {
    appendChildren(element, {}, result)
  } else if (result instanceof ComponentProps) {
    appendChildren(element, result.attributes, result.children)
  }
}

export const isHydrating = { value: false }
export const isDefining = { value: false }
export const indexMap = new Map<string, number>()

export function h(
  jsxTag: string | Function,
  attributes?: JSX.Attributes,
  ...children: JSX.Children
) {
  const processedChildren = processChildren(attributes, children)
  const processedAttributes = { ...attributes }
  delete processedAttributes.children

  if (typeof jsxTag === 'string') {
    return handleStringTag(jsxTag, processedAttributes, processedChildren)
  }

  return handleFunctionTag(jsxTag, processedAttributes, processedChildren)
}

export function Fragment(children: JSX.Children) {
  const fragment = document.createDocumentFragment()
  appendChildren(fragment as unknown as Element, undefined, children)
  return fragment
}
