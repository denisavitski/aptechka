import { Fragment, h } from './h'
const _h = h
const _Fragment = Fragment

export function render(
  container: ParentNode,
  Component: JSX.Component,
  params?: object,
  children?: any,
) {
  const element = <Component {...params}>{children}</Component>
  container.append(element)

  return element
}
