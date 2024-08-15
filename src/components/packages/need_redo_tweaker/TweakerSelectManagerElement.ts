import './select'

import { Store } from '@packages/store/vanilla'
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement'
import { createStylesheet, element, span } from './element-constructor'

import { SelectElement } from './select'
import { aptechkaTheme } from './theme'

const stylesheet = createStylesheet({
  'e-select': {
    display: 'block',
    width: '100%',

    '--arrow-color': aptechkaTheme.colorFont.var,
  },

  'e-select-head': {
    width: '100%',
    height: 'var(--height-input)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 'var(--font-size-small)',
  },

  'e-select-option': {
    height: 'var(--height-input)',
    transitionDuration: 'var(--duration-short)',
    transitionProperty: 'color',
    fontSize: 'var(--font-size-small)',
  },

  'e-select-option:hover': {
    color: aptechkaTheme.colorActive.var,
  },

  svg: {
    width: '16px',
    height: '16px',
    fill: aptechkaTheme.colorFont.var,
    transitionProperty: 'transform',
    transitionDuration: 'var(--duration-short)',
  },

  '.opened svg': {
    transform: 'scaleY(-1)',
  },
})

export class TweakerSelectManagerElement extends TweakerStoreManagerElement<
  Store<string>
> {
  constructor(...stores: Array<Store<string>>) {
    super(...stores)

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.adoptedStyleSheets.push(stylesheet)

    const variants = this.firstStore.__manager?.variants || []

    element(this, {
      children: element('e-select', {
        value: this.firstStore,
        onChange: (e) => {
          this.updateStores((e.currentTarget as SelectElement).value)
        },
        lightChildren: [
          element('e-select-head', {
            lightChildren: [
              span({
                'data-value-holder': '',
              }),
            ],
          }),
          // @ts-ignore
          ...variants.map((v, i) =>
            element('e-select-option', {
              lightChildren: v,
              default: i === 0 ? true : null,
            })
          ),
        ],
      }),
    })
  }
}

if (!customElements.get('e-tweaker-select-manager')) {
  customElements.define('e-tweaker-select-manager', TweakerSelectManagerElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker-select-manager': TweakerSelectManagerElement
  }
}
