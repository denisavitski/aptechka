import { Store } from '@packages/store'
import { define } from '@packages/custom-element'
import { TweakerStringManagerElement } from './TweakerStringManagerElement'

@define('e-tweaker-link-manager')
export class TweakerLinkManagerElement extends TweakerStringManagerElement<
  string,
  'link'
> {
  constructor(store: Store<string, 'link'>) {
    super(store)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker-link-manager': TweakerLinkManagerElement
  }
}
