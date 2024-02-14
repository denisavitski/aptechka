import {
  ElementConstructor,
  ElementConstructorTagNames,
  ElementConstructorTagObject,
} from '@packages/element-constructor'

import {
  ComponentElement,
  ComponentElementConstructorCallback,
} from './ComponentElement'

type HConstructorObject =
  ElementConstructorTagObject<ElementConstructorTagNames> & {
    shadow?: boolean
  }

let componentConstructorObject: HConstructorObject | undefined

export function h(
  tag: string | JSX.Component,
  attrs: JSX.HTMLAttributes | JSX.UnknownAttributes | null,
  ...children: Array<JSX.ComponentChild | ElementConstructor<any>>
): JSX.Element | ElementConstructor<any> {
  children = children.flat()

  if (typeof tag === 'function') {
    if ((tag as any).isFragment) {
      return (tag as any)({ ...attrs, children })
    }

    const customName = `component-${tag.name.toLowerCase()}`

    let CustomElement = customElements.get(
      customName
    ) as typeof ComponentElement

    if (!CustomElement) {
      CustomElement = class extends ComponentElement {
        constructor(callback: ComponentElementConstructorCallback) {
          super(callback)
        }
      }

      customElements.define(customName, CustomElement)
    }

    return new CustomElement((e) => {
      const res = tag({ ...attrs, children })

      let elementConstructor: ElementConstructor<any> = null!

      if (!componentConstructorObject && res) {
        elementConstructor = new ElementConstructor(e, {
          children: res,
        })
      } else if (componentConstructorObject) {
        if (componentConstructorObject.shadow) {
          e.attachShadow({ mode: 'open' })
        }

        elementConstructor = new ElementConstructor(
          e,
          componentConstructorObject
        )
      }

      componentConstructorObject = undefined

      return elementConstructor
    })
  }

  const constructorObject: HConstructorObject = {
    shadowChildren: children,
  }

  if (attrs) {
    for (const name of Object.keys(attrs)) {
      const value = attrs[name as keyof JSX.HTMLAttributes]

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
      } else if (name === 'shadow') {
        constructorObject.shadow = value !== 'false' ? true : false
      } else if (name === 'forceSvg') {
        constructorObject.forceSvg = value !== 'false' ? true : false
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
    const elementConstructor = new ElementConstructor(tag, constructorObject)

    return elementConstructor
  }
}

export function Fragment({
  children,
}: {
  children: Array<JSX.ComponentChild | ElementConstructor>
}) {
  return new ElementConstructor(document.createDocumentFragment(), {
    children: children,
  })
}

Fragment.isFragment = true
