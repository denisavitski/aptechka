import { onBeforeCreate } from '../Component'

export function attachShadow(options?: Omit<ShadowRootInit, 'mode'>) {
  onBeforeCreate((e) => {
    e.attachShadow({ ...options, mode: 'open' })
  })
}
