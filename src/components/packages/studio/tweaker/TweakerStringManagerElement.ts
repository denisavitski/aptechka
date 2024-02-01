import { Store } from '@packages/store/Store'
import { define } from '@packages/custom-element'
import { TweakerStringLikeManagerElement } from './TweakerStringLikeManagerElement'

@define('e-tweaker-string-manager')
export class TweakerStringManagerElement extends TweakerStringLikeManagerElement<'string'> {
  constructor(store: Store<string, 'string'>) {
    super(store)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker-string-manager': TweakerStringManagerElement
  }
}
