import { isBrowser } from '@packages/client/utils'
import { TweakerElement } from './TweakerElement'

if (isBrowser) {
  document.body.appendChild(new TweakerElement())
}
