import { onBeforeCreate } from '../Component'

export function attachShadow(options?: Omit<ShadowRootInit, 'mode'>) {
  return onBeforeCreate((e) => {
    return e.attachShadow({ ...options, mode: 'open' })
  })
}

export function attachInternals() {
  return onBeforeCreate((e) => {
    return e.attachInternals()
  })
}
