import '@packages/checkbox'
import { Store } from '@packages/store/Store'
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement'
import { define } from '@packages/custom-element'
import { createStylesheet, element } from '@packages/element-constructor'
import { aptechkaTheme } from '@packages/theme'

const stylesheet = createStylesheet({
  ':host': {
    width: '100%',
    display: 'inline-flex',
    height: 'max-content',
  },
  'e-checkbox': {
    width: 'var(--height-input)',
    height: 'var(--height-input)',
    borderRadius: aptechkaTheme.borderRadiusSmall.var,
  },
})

@define('e-tweaker-boolean-manager')
export class TweakerBooleanManagerElement extends TweakerStoreManagerElement<
  boolean,
  'boolean'
> {
  constructor(...stores: Array<Store<boolean, 'boolean'>>) {
    super(...stores)

    this.openShadow(stylesheet)

    element(this, {
      children: [
        element('e-checkbox', {
          onChange: (e) => {
            this.updateStores((e.currentTarget as HTMLInputElement).checked)
          },
          ref: (e) => {
            this.firstStore.subscribe((d) => {
              e.checked = d.current
            })
          },
        }),
      ],
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker-boolean-manager': TweakerBooleanManagerElement
  }
}
