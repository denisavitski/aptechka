import { disableHydration, enableHydration } from './h'

export function hydrate(
  Component: JSX.Component,
  params?: object,
  children?: any,
) {
  enableHydration()

  const componentElement = <Component {...params}>{children}</Component>

  disableHydration()

  return componentElement
}
