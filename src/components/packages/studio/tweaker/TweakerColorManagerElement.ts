import { Store } from '@packages/store/Store'
import { define } from '@packages/custom-element'
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement'
import { createStylesheet, element, input } from '@packages/element-constructor'
import { studioTheme } from '../studioTheme'

const stylesheet = createStylesheet({
  ':host': {
    width: '100%',
    display: 'inline-flex',
    height: 'max-content',
  },

  input: {
    width: '100%',
    height: studioTheme.sizeInputHeight.var,
    padding: '0',
    background: 'none',
    borderRadius: studioTheme.sizeBorderRadius.var,
    border: 'none',
    blockSize: 'unset',
  },

  'input::-webkit-color-swatch, input::-webkit-color-swatch-wrapper': {
    boxSizing: 'border-box',
    padding: '0px',
    border: 'none',
    borderRadius: studioTheme.sizeBorderRadius.var,
    height: `calc(${studioTheme.sizeInputHeight.var} * 0.93)`,
  },
})

@define('e-tweaker-color-manager')
export class TweakerColorManagerElement extends TweakerStoreManagerElement<
  string,
  'color'
> {
  constructor(store: Store<string, 'color'>) {
    super(store)

    this.attachShadow({ mode: 'open' }).adoptedStyleSheets.push(stylesheet)

    element(this, {
      shadowChildren: [
        input({
          attributes: {
            type: 'color',
            value: this.store,
          },
          events: {
            input: (e) => {
              this.store.current = (e.currentTarget as HTMLInputElement).value
            },
          },
        }),
      ],
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker-color-manager': TweakerColorManagerElement
  }
}
