import { withCurrentComponent } from './withCurrentComponent'

export function attachShadow(init?: ShadowRootInit) {
  return withCurrentComponent((e) => {
    return e.attachShadow({ mode: 'open', ...init })
  })
}
