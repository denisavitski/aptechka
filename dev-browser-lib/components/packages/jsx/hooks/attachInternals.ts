import { withCurrentComponent } from './withCurrentComponent'

export function attachInternals() {
  return withCurrentComponent((e) => {
    return e.attachInternals()
  })
}
