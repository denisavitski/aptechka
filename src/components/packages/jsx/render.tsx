import { isDefining, isHydrating } from './h'

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

export function hydrate(
  Component: JSX.Component,
  params?: object,
  children?: any,
) {
  isHydrating.value = true

  const element = <Component {...params}>{children}</Component>

  isHydrating.value = false

  return element
}

export function define(
  Component: JSX.Component,
  params?: object,
  children?: any,
) {
  isDefining.value = true

  const element = <Component {...params}>{children}</Component>

  isDefining.value = false

  return element
}
