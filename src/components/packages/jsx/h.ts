import { ElementConstructor } from '@packages/element-constructor'
import { camelToKebab } from '@packages/utils'
import {
  ComponentElement,
  ComponentElementParameters,
  nextComponentAttributes,
} from './ComponentElement'
import { customConstructors } from '.'

function deconservateChild(child: any) {
  const unpreparedChildren = Array.isArray(child) ? child : [child]
  let children: Array<any> = []

  unpreparedChildren.forEach((child) => {
    if (typeof child === 'function') {
      const res = child()

      children = [...children, ...deconservateChild(res)]
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

    if (tag.noCustomElement) {
      const res = tag({
        children,
        ...attributes,
      })

      return res
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

    const key = attributes?.key
    delete attributes?.key

    const result = onlyRegister
      ? Constructor
      : () => {
          const r = new Constructor({ tag, attributes, children })
          return r
        }

    return result
  }

  const deconservatedChildren = children
    .map((child) => {
      return deconservateChild(child)
    })
    .flat()

  if (tag === 'component') {
    delete attributes?.lightChildren
    const constructed = Fragment(deconservatedChildren)
    nextComponentAttributes.value = attributes

    return constructed.node
  } else {
    if (tag.includes('--')) {
      const splitted = tag.split('--')
      const tagSpace = splitted[0]

      const Constructor = customConstructors.get(tagSpace)

      if (Constructor) {
        new Constructor({ tag, attributes, children: deconservatedChildren })
      }
    } else {
      const childrenType = attributes?.lightChildren
        ? 'lightChildren'
        : 'children'

      delete attributes?.children

      return new ElementConstructor(tag, {
        ...(attributes as any),
        [childrenType]: deconservatedChildren,
      }).node
    }
  }
}

export function Fragment(children: any) {
  return new ElementConstructor(document.createDocumentFragment(), {
    children: children,
  })
}
