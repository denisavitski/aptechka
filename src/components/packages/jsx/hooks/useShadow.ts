import { useCreate } from './useCreate'

export function useShadow(init?: ShadowRootInit) {
  return useCreate((e) => {
    return e.attachShadow({ mode: 'open', ...init })
  })
}
