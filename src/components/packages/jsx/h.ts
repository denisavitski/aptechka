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

export function appendChildren(element: Element, ...children: JSX.Children) {
  const filteredChildren = filterChildren(children)

  filteredChildren.forEach((child) => {
    if (child instanceof Store) {
      subscribeToStore(element, child, (e) => {
        storeChildren(element, child.id, e.current)
      })
    } else if (child instanceof ComponentProps) {
      setAttributes(element, child.attributes)

      if (child.tag === 'shadow' && element.shadowRoot) {
        appendChildren(element.shadowRoot as any, ...child.children)
      } else {
        appendChildren(element, ...child.children)
      }
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
      const element: HTMLElement = document.createElement(jsxTag)

      appendChildren(element, ...children)
      setAttributes(element, attributes)

      return element
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

    appendChildren(element, ...res.children)

    return element
  }
}

export function Fragment(children: any) {
  const fragment = document.createDocumentFragment()
  appendChildren(fragment as any, ...children)

  return fragment
}
