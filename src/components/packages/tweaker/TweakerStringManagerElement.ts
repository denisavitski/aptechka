import { aptechkaTheme } from '@packages/theme'
import { Store } from '@packages/store/Store'
import { createStylesheet, element, input } from '@packages/element-constructor'
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement'

const stylesheet = createStylesheet({
  ':host': {
    width: '100%',

    display: 'flex',
    alignItems: 'center',
  },

  input: {
    boxSizing: 'border-box',
    outline: 'none',
    fontVariantNumeric: 'tabular-nums',
    fontFamily: 'inherit',
    color: 'inherit',
    border: 'none',
    fontSize: 'var(--font-size-small)',

    height: 'var(--height-input)',
    width: '100%',

    margin: '0',
    padding: `0 var(--gap-small)`,

    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: aptechkaTheme.borderRadius.var,
  },
})

export class TweakerStringManagerElement<
  S extends Store<any, any> = Store<string, 'string'>
> extends TweakerStoreManagerElement<S> {
  constructor(...stores: Array<S>) {
    super(...stores)

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.adoptedStyleSheets.push(stylesheet)

    element(this, {
      children: [
        input({
          class: 'text-input',
          type: 'string',
          value: this.firstStore,
          onChange: (e) => {
            this.updateStores(
              (e.currentTarget as HTMLInputElement).value as any
            )
          },
        }),
      ],
    })
  }
}

if (!customElements.get('e-tweaker-string-manager')) {
  customElements.define('e-tweaker-string-manager', TweakerStringManagerElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker-string-manager': TweakerStringManagerElement
  }
}
