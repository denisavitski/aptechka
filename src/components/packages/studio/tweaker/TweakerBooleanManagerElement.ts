import { Store } from '@packages/store/Store'
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement'
import { define } from '@packages/custom-element'
import { createStylesheet, element, input } from '@packages/element-constructor'
import { aptechkaTheme } from '@packages/theme'

const stylesheet = createStylesheet({
  ':host': {
    width: '100%',
    display: 'inline-flex',
    height: 'max-content',
  },

  input: {
    padding: '0',
    margin: '0',
    width: `calc(${aptechkaTheme.heightInput.var} * 0.5)`,
    height: `calc(${aptechkaTheme.heightInput.var} * 0.5)`,
    borderRadius: aptechkaTheme.borderRadius.var,
    overflow: 'hidden',
    accentColor: aptechkaTheme.colorLight.var,
  },
})

@define('e-tweaker-boolean-manager')
export class TweakerBooleanManagerElement extends TweakerStoreManagerElement<
  boolean,
  'boolean'
> {
  constructor(store: Store<boolean, 'boolean'>) {
    super(store)

    this.openShadow(stylesheet)

    element(this, {
      shadowChildren: [
        input({
          attributes: {
            type: 'checkbox',
          },
          events: {
            change: (e) => {
              this.store.current = (e.currentTarget as HTMLInputElement).checked
            },
          },
          created: (e) => {
            this.store.subscribe((d) => {
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
