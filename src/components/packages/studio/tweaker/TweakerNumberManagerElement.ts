import { Store } from '@packages/store/Store'
import { define } from '@packages/custom-element'
import { TweakerNumberLikeManagerElement } from './TweakerNumberLikeManagerElement'

@define('e-tweaker-number-manager')
export class TweakerNumberManagerElement extends TweakerNumberLikeManagerElement<'number'> {
  constructor(store: Store<number, 'number'>) {
    super(store)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker-number-manager': TweakerNumberManagerElement
  }
}
