import { h } from './h'

export function register(
  Component: any,
  attributes: JSX.AllAttributes | null = null,
  ...children: JSX.ComponentChildren
) {
  return h(Component, { ...attributes, register: true }, ...children)
}
