import { ElementConstructor } from '@packages/element-constructor'
import { camelToKebab } from '@packages/utils'
import { ComponentElement, nextComponentAttributes } from './ComponentElement'

function getChildren(child: any) {
  const unpreparedChildren = Array.isArray(child) ? child : [child]
  let children: Array<any> = []

  unpreparedChildren.forEach((child) => {
    if (typeof child === 'function') {
      const res = new child({
        ...child.attributes,
        children: child.children,
      })

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

    const name = `e-${camelToKebab(tag.name)}`

    let Constructor = customElements.get(name) as typeof ComponentElement

    if (!Constructor) {
      Constructor = class extends ComponentElement {
        static formAssociated = (tag as JSX.Component).formAssociated

        constructor() {
          super({
            tag: tag as Function,
            attributes,
            children,
          })
        }
      }

      customElements.define(name, Constructor)
    }

    return Constructor
  }

  const readyChildren = children
    .map((child) => {
      return getChildren(child)
    })
    .flat()

  let constructedElement: ElementConstructor<any> = null!

  if (tag === 'component') {
    constructedElement = Fragment(readyChildren)
    nextComponentAttributes.value = attributes
  } else {
    constructedElement = new ElementConstructor(tag, {
      ...(attributes as any),
      children: readyChildren,
    })
  }

  return constructedElement.node
}

export function Fragment(children: any) {
  return new ElementConstructor(document.createDocumentFragment(), {
    children: children,
  })
}
