import { Store } from '@packages/store/Store'
import { define } from '@packages/custom-element'
import { TweakerNumberLikeManagerElement } from './TweakerNumberLikeManagerElement'

@define('e-tweaker-range-manager')
export class TweakerRangeManagerElement extends TweakerNumberLikeManagerElement<'range'> {
  constructor(store: Store<number, 'range'>) {
    super(store)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker-range-manager': TweakerRangeManagerElement
  }
}
