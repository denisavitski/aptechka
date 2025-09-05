import { disableHydration, enableHydration } from './h'

import { Fragment, h } from './h'
const _h = h
const _Fragment = Fragment

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
