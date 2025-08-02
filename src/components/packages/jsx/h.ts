import { camelToKebab } from '@packages/utils'
import { ComponentElement } from './ComponentElement'
import { Attributes, setAttributes } from './utils/attributes/setAttributes'
import { Children, appendChildren } from './utils/children/appendChildren'

class ComponentProps {
  constructor(
    public attributes: Attributes | undefined,
    public children: Children
  ) {}
}

export function h(
  jsxTag: string | Function,
  attributes?: Attributes,
  ...children: Children
) {
  if (typeof jsxTag === 'string') {
    if (jsxTag !== 'component') {
      const element: HTMLElement = document.createElement(jsxTag)

      appendChildren(element, ...children)
      setAttributes(element, attributes)

      return element
    } else {
      return new ComponentProps(attributes, children)
    }
  } else {
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

    if (res instanceof HTMLElement) {
      appendChildren(element, res)
    } else if (res instanceof ComponentProps) {
      setAttributes(element, res.attributes)
      appendChildren(element, ...res.children)
    }

    return element
  }
}

export function Fragment(...children: Children) {}
