import { isBrowser } from '@packages/utils'
import { TweakerElement } from './TweakerElement'

if (isBrowser) {
  document.body.appendChild(new TweakerElement())
}
