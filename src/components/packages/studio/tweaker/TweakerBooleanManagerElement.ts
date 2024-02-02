import { Store } from '@packages/store/Store'
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement'
import { define } from '@packages/custom-element'

@define('e-tweaker-boolean-manager')
export class TweakerBooleanManagerElement extends TweakerStoreManagerElement<
  string,
  'boolean'
> {
  constructor(store: Store<string, 'boolean'>) {
    super(store)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker-boolean-manager': TweakerBooleanManagerElement
  }
}
