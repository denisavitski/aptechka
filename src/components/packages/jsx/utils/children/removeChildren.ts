import { Store } from '@packages/store'
import { filterChildren } from './filterChildren'
import { findTextNode } from './findTextNode'

export function removeChildren(element: Element, ...children: JSX.Children) {
  const filteredChildren = filterChildren(children)

  filteredChildren.forEach((child) => {
    if (typeof child === 'string') {
      findTextNode(element, child)?.remove()
    } else if (child instanceof Element) {
      child.remove()
    } else if (child instanceof Store) {
      removeChildren(element, child.current)
    }
  })
}
