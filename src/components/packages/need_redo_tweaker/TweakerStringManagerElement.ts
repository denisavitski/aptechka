import { aptechkaTheme } from './theme'
import { Store } from '@packages/store'
import { createStylesheet, element, input } from './element-constructor'
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement'
import { isBrowser } from '@packages/utils'

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
  S extends Store<any> = Store<string>
> extends TweakerStoreManagerElement<S> {
  constructor(...stores: Array<S>) {
    super(...stores)

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.adoptedStyleSheets = [...shadow.adoptedStyleSheets, stylesheet]

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

if (isBrowser && !customElements.get('e-tweaker-string-manager')) {
  customElements.define('e-tweaker-string-manager', TweakerStringManagerElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker-string-manager': TweakerStringManagerElement
  }
}
