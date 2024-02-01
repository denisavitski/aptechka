import { Store } from '@packages/store/Store'
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement'
import { define } from '@packages/custom-element'

@define('e-tweaker-select-manager')
export class TweakerSelectManagerElement extends TweakerStoreManagerElement<
  string,
  'select'
> {
  constructor(store: Store<string, 'select'>) {
    super(store)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker-select-manager': TweakerSelectManagerElement
  }
}
