import {
  ElementConstructor,
  ElementConstructorAttributes,
  ElementConstructorClass,
  ElementConstructorEvents,
  ElementConstructorRef,
  ElementConstructorStyle,
} from '@packages/element-constructor'

import {
  ComponentCustomElement,
  ConnectCallback,
} from './ComponentCustomElement'

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
        constructor(callback: ConnectCallback) {
          super(callback)
        }
      }

      customElements.define(customName, CustomElement)
    }

    return new CustomElement((e) => {
      const res = tag({ ...attrs, children })

      if (tag.shadow) {
        e.attachShadow({ mode: 'open' })
      }

      if (res) {
        if (tag.shadow) {
          e.shadowRoot!.appendChild(res)
        } else {
          e.appendChild(res)
        }
      }
    })
  }

  const attributes: ElementConstructorAttributes<any> = {}
  let style: ElementConstructorStyle = {}
  let className: ElementConstructorClass | undefined
  let ref: ElementConstructorRef<any> | undefined
  const events: ElementConstructorEvents = {}

  if (attrs) {
    for (const name of Object.keys(attrs)) {
      const value = attrs[name]

      if (name.startsWith('on')) {
        events[name.split('on')[1].toLowerCase() as any] = value
      } else if (name === 'class') {
        className = value
      } else if (name === 'style') {
        style = value
      } else if (name === 'ref') {
        ref = value
      } else {
        attributes[name] = value
      }
    }
  }

  return new ElementConstructor({
    [tag as 'div']: {
      style,
      events,
      attributes,
      class: className,
      shadowChildren: children,
      created: ref,
    },
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
