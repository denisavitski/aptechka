import { Store } from '@packages/store'
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement'
import { createStylesheet, element, input } from './element-constructor'
import { aptechkaTheme } from './theme'
import { isBrowser } from '@packages/utils'

const stylesheet = createStylesheet({
  ':host': {
    width: '100%',
    display: 'inline-flex',
    height: 'max-content',
  },

  input: {
    width: '100%',
    height: 'var(--height-input)',
    padding: '0',
    background: 'none',
    borderRadius: aptechkaTheme.borderRadius.var,
    border: 'none',
    blockSize: 'unset',
  },

  'input::-webkit-color-swatch, input::-webkit-color-swatch-wrapper': {
    boxSizing: 'border-box',
    padding: '0px',
    border: 'none',
    borderRadius: aptechkaTheme.borderRadius.var,
    height: `calc(var(--height-input) * 0.93)`,
  },
})

export class TweakerColorManagerElement extends TweakerStoreManagerElement<
  Store<string>
> {
  constructor(...stores: Array<Store<string>>) {
    super(...stores)

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.adoptedStyleSheets = [...shadow.adoptedStyleSheets, stylesheet]

    element(this, {
      children: [
        input({
          type: 'color',
          value: this.firstStore,
          onInput: (e) => {
            this.updateStores((e.currentTarget as HTMLInputElement).value)
          },
        }),
      ],
    })
  }
}

if (isBrowser && !customElements.get('e-tweaker-color-manager')) {
  customElements.define('e-tweaker-color-manager', TweakerColorManagerElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker-color-manager': TweakerColorManagerElement
  }
}
