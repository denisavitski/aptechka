import { Store } from '@packages/store/Store'
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement'
import { define } from '@packages/custom-element'
import { createStylesheet, element, input } from '@packages/element-constructor'
import { studioTheme } from '../studioTheme'

const stylesheet = createStylesheet({
  ':host': {
    width: '100%',
    display: 'inline-flex',
    height: 'max-content',
  },

  input: {
    padding: '0',
    margin: '0',
    width: `calc(${studioTheme.sizeInputHeight.var} * 0.5)`,
    height: `calc(${studioTheme.sizeInputHeight.var} * 0.5)`,
    borderRadius: studioTheme.sizeBorderRadius.var,
    overflow: 'hidden',
    accentColor: studioTheme.colorLight.var,
  },
})

@define('e-tweaker-boolean-manager')
export class TweakerBooleanManagerElement extends TweakerStoreManagerElement<
  boolean,
  'boolean'
> {
  constructor(store: Store<boolean, 'boolean'>) {
    super(store)

    this.attachShadow({ mode: 'open' }).adoptedStyleSheets.push(stylesheet)

    element(this, {
      shadowChildren: [
        input({
          attributes: {
            type: 'checkbox',
          },
          events: {
            input: (e) => {
              this.store.current = (e.currentTarget as HTMLInputElement).checked
            },
          },
          created: (e) => {
            e.checked = this.store.current
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
