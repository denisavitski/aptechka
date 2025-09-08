import { disableHydration, enableHydration } from './h'

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
  enableHydration()

  const element = <Component {...params}>{children}</Component>

  disableHydration()

  return element
}
