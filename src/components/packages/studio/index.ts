import { isBrowser } from '@packages/utils'
import { StudioElement } from './StudioElement'
export { StudioElement } from './StudioElement'

if (isBrowser) {
  document.body.appendChild(new StudioElement())
}
