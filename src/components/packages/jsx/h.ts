import {
  ElementConstructor,
  ElementConstructorTagNames,
  ElementConstructorTagObject,
} from '@packages/element-constructor'

import {
  ComponentCustomElement,
  ComponentCustomElementCreateCallback,
} from './ComponentCustomElement'

type HConstructorObject =
  ElementConstructorTagObject<ElementConstructorTagNames> & {
    shadow?: boolean
  }

let componentConstructorObject: HConstructorObject | undefined

export function h(
  tag: string | JSX.Component,
  attrs: any,
  ...children: JSX.ComponentChild[]
): JSX.Element {
  if (typeof tag === 'function') {
    if ((tag as any).isFragment) {
      return tag({ ...attrs, children })
    }

    const customName = `component-${tag.name.toLowerCase()}`

    let CustomElement = customElements.get(
      customName
    ) as typeof ComponentCustomElement

    if (!CustomElement) {
      CustomElement = class extends ComponentCustomElement {
        constructor(callback: ComponentCustomElementCreateCallback) {
          super(callback)
        }
      }

      customElements.define(customName, CustomElement)
    }

    return new CustomElement((e) => {
      const res = tag({ ...attrs, children })

      if (!componentConstructorObject && res) {
        e.appendChild(res)
      } else if (componentConstructorObject) {
        if (componentConstructorObject.shadow) {
          e.attachShadow({ mode: 'open' })
        }

        new ElementConstructor(e, componentConstructorObject)
      }

      componentConstructorObject = undefined
    })
  }

  const constructorObject: HConstructorObject = {
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
        constructorObject.created = value
      } else if (name === 'shadow') {
        constructorObject.shadow = true
      } else {
        if (!constructorObject.attributes) {
          constructorObject.attributes = {}
        }

        ;(constructorObject.attributes as any)[name] = value
      }
    }
  }

  if (tag === 'component') {
    componentConstructorObject = constructorObject
    return Fragment({ children })
  } else {
    return new ElementConstructor({
      [tag as ElementConstructorTagNames]: constructorObject,
    }).rootElements[0]
  }
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
