import { Store } from '@packages/store/Store'
import { define } from '@packages/custom-element'
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement'

@define('e-tweaker-color-manager')
export class TweakerColorManagerElement extends TweakerStoreManagerElement<
  string,
  'color'
> {
  constructor(store: Store<string, 'color'>) {
    super(store)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker-color-manager': TweakerColorManagerElement
  }
}
