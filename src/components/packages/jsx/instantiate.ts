import { h } from './h'

export function instantiate(
  Component: any,
  attributes: JSX.AllAttributes | null = null,
  ...children: JSX.ComponentChildren
) {
  return h(Component, attributes, ...children)()
}
