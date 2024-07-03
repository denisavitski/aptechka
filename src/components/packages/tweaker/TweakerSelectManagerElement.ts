import '@packages/select'

import { Store } from '@packages/store/Store'
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement'
import { define } from '@packages/custom-element'
import { createStylesheet, element, span } from '@packages/element-constructor'

import { SelectElement } from '@packages/select'
import { aptechkaTheme } from '@packages/theme'

const stylesheet = createStylesheet({
  'e-select': {
    width: '100%',
    '--arrow-color': aptechkaTheme.colorFont.var,
  },

  'e-select-head': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  'e-select-option': {
    transitionDuration: 'var(--duration-short)',
    transitionProperty: 'color',
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

@define('e-tweaker-select-manager')
export class TweakerSelectManagerElement extends TweakerStoreManagerElement<
  Store<string, 'select'>
> {
  constructor(...stores: Array<Store<string, 'select'>>) {
    super(...stores)

    this.openShadow(stylesheet)

    const variants = this.firstStore.passport?.manager?.variants || []

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

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker-select-manager': TweakerSelectManagerElement
  }
}
