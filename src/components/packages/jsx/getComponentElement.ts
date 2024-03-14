import { isESClass } from '@packages/utils'
import { ComponentElement } from './ComponentElement'
import { h } from './h'

export function getComponentElement(
  Component: any,
  attributes: JSX.AllAttributes | null = null,
  ...children: JSX.ComponentChildren
) {
  let instance: ComponentElement = null!

  if (isESClass(Component)) {
    instance = new Component()
  } else {
    const ComponentElement = h(Component, attributes, ...children)
    instance = new ComponentElement()
  }

  return instance
}
