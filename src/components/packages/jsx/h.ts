import { ElementConstructor } from '@packages/element-constructor'
import { camelToKebab } from '@packages/utils'
import {
  ComponentElement,
  ComponentElementParameters,
  nextComponentAttributes,
} from './ComponentElement'

function getChildren(child: any) {
  const unpreparedChildren = Array.isArray(child) ? child : [child]
  let children: Array<any> = []

  unpreparedChildren.forEach((child) => {
    if (typeof child === 'function') {
      const res = child()

      children = [...children, ...getChildren(res)]
    } else {
      children.push(child)
    }
  })

  return children
}

export function h(
  tag: string | JSX.Component,
  attributes: null | JSX.AllAttributes,
  ...children: JSX.ComponentChildren
) {
  if (typeof tag === 'function') {
    if (tag === Fragment) {
      return Fragment(children)
    }

    const onlyRegister = attributes?.__register

    delete attributes?.__register

    const name = `c-${camelToKebab(tag.name)}`

    let Constructor = customElements.get(name) as typeof ComponentElement

    if (!Constructor) {
      Constructor = class extends ComponentElement {
        static formAssociated = (tag as JSX.Component).formAssociated

        constructor(parameters?: ComponentElementParameters) {
          super(
            onlyRegister
              ? ({
                  tag,
                  attributes,
                  children,
                } as ComponentElementParameters)
              : parameters
          )
        }
      }

      customElements.define(name, Constructor)
    }

    return onlyRegister
      ? Constructor
      : () => {
          const r = new Constructor({ tag, attributes, children })
          return r
        }
  }

  const readyChildren = children
    .map((child) => {
      return getChildren(child)
    })
    .flat()

  let constructedElement: ElementConstructor<any> = null!

  if (tag === 'component') {
    delete attributes?.lightChildren
    constructedElement = Fragment(readyChildren)
    nextComponentAttributes.value = attributes
  } else {
    const childrenType = attributes?.lightChildren
      ? 'lightChildren'
      : 'children'

    delete attributes?.children

    constructedElement = new ElementConstructor(tag, {
      ...(attributes as any),
      [childrenType]: readyChildren,
    })
  }

  return constructedElement.node
}

export function Fragment(children: any) {
  return new ElementConstructor(document.createDocumentFragment(), {
    children: children,
  })
}
