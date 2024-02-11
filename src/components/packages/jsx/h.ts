import {
  ElementConstructor,
  ElementConstructorTagNames,
  ElementConstructorTagObject,
} from '@packages/element-constructor'

import { ComponentWrapper } from './ComponentWrapper'

export function h(
  tag: string | JSX.Component,
  attrs: any,
  ...children: JSX.ComponentChild[]
): JSX.Element {
  if (typeof tag === 'function') {
    if ((tag as any).isFragment) {
      return tag({ ...attrs, children })
    }

    const wrapper = new ComponentWrapper(() =>
      (tag as Function)({ ...attrs, children })
    )

    return wrapper.elementOrFragment
  }

  const constructorObject: ElementConstructorTagObject = {
    shadowChildren: children,
  }

  if (attrs) {
    for (const name of Object.keys(attrs)) {
      const value = attrs[name]

      if (name.startsWith('on')) {
        if (!constructorObject.events) {
          constructorObject.events = {}
        }

        constructorObject.events![name.split('on')[1].toLowerCase() as any] =
          value
      } else if (name === 'class') {
        constructorObject.class = value
      } else if (name === 'style') {
        constructorObject.style = value
      } else if (name === 'ref') {
        constructorObject.ref = value
      } else {
        if (!constructorObject.attributes) {
          constructorObject.attributes = {}
        }

        ;(constructorObject.attributes as any)[name] = value
      }
    }
  }

  return new ElementConstructor({
    [tag as ElementConstructorTagNames]: constructorObject,
  }).rootElements[0]
}

export function Fragment({ children }: { children: JSX.ComponentChild[] }) {
  const element = document.createDocumentFragment()

  if (children) {
    children = Array.isArray(children) ? children : [children]

    children.forEach((child) => {
      if (child instanceof Node) {
        element.append(child)
      } else if (child) {
        element.append(document.createTextNode(child.toString()))
      }
    })
  }

  return element
}

Fragment.isFragment = true
