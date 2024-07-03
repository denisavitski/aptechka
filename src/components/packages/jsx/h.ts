import { ElementConstructor } from '@packages/element-constructor'
import { camelToKebab } from '@packages/utils'
import {
  ComponentElement,
  ComponentElementParameters,
  nextComponentAttributes,
} from './ComponentElement'

export function h(
  tag: string | JSX.Component,
  attributes?: null | { [key: string]: any },
  ...children: JSX.ComponentChildren
) {
  children = children.flat()

  const stack: Array<any> = []

  const constructorChildren: Array<any> = []

  attributes = attributes || {}

  stack.push(...children.reverse())

  if (typeof tag === 'function') {
    if (tag === Fragment) {
      return Fragment(children)
    }

    attributes.children = stack.reverse()

    const flags = {
      noCustomElement: tag.noCustomElement,
      onlyRegister: attributes.__register,
    }

    delete attributes?.__register

    if (flags.noCustomElement) {
      const res = tag({
        ...attributes,
      })

      return res
    }

    const name = `e-${camelToKebab(tag.name)}`

    let Constructor = customElements.get(name) as typeof ComponentElement

    if (!Constructor) {
      Constructor = class extends ComponentElement {
        static formAssociated = (tag as JSX.Component).formAssociated

        constructor(parameters?: ComponentElementParameters) {
          super(
            flags.onlyRegister
              ? ({
                  tag,
                  attributes,
                } as ComponentElementParameters)
              : parameters
          )
        }
      }

      customElements.define(name, Constructor)
    }

    return flags.onlyRegister
      ? Constructor
      : new Constructor({ tag, attributes })
  }

  while (stack.length) {
    const child = stack.pop()

    if (Array.isArray(child)) {
      stack.push(...child)
    } else if (child != null) {
      constructorChildren.push(child)
    }
  }

  if (tag === 'component') {
    const constructed = Fragment(constructorChildren)
    nextComponentAttributes.value = attributes

    return constructed.node
  } else {
    const childrenType = attributes?.lightChildren
      ? 'lightChildren'
      : 'children'

    delete attributes?.children

    const element = tag
      ? new ElementConstructor(tag, {
          ...attributes,
          [childrenType]: constructorChildren,
        })
      : null

    return element
  }
}

export function Fragment(children: any) {
  return new ElementConstructor(document.createDocumentFragment(), {
    children: children,
  })
}
