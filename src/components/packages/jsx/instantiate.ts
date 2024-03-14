import { isESClass } from '@packages/utils'
import { ComponentElement } from './ComponentElement'
import { h } from './h'

export function instantiate(
  Component: any,
  attributes: JSX.AllAttributes | null = null,
  ...children: JSX.ComponentChildren
) {
  let element: ComponentElement = null!

  if (isESClass(Component)) {
    element = new Component()
  } else {
    const ElementConstructor = h(Component, attributes, ...children)
    element = new ElementConstructor()
  }

  return element
}
