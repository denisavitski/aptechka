import '@packages/select'

import { Store } from '@packages/store/Store'
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement'
import { define } from '@packages/custom-element'
import {
  createStylesheet,
  custom,
  element,
  span,
} from '@packages/element-constructor'

import { SelectElement } from '@packages/select'
import { aptechkaTheme } from '@packages/theme'

const stylesheet = createStylesheet({
  'e-select': {
    width: '100%',
    '--arrow-color': aptechkaTheme.colorLight.var,
  },

  'e-select-head': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  'e-select-option': {
    transitionDuration: aptechkaTheme.durationShort.var,
    transitionProperty: 'color',
  },

  'e-select-option:hover': {
    color: aptechkaTheme.colorActive.var,
  },

  svg: {
    width: '16px',
    height: '16px',
    fill: aptechkaTheme.colorLight.var,
    transitionProperty: 'transform',
    transitionDuration: aptechkaTheme.durationShort.var,
  },

  '.opened svg': {
    transform: 'scaleY(-1)',
  },
})

@define('e-tweaker-select-manager')
export class TweakerSelectManagerElement extends TweakerStoreManagerElement<
  string,
  'select'
> {
  constructor(...stores: Array<Store<string, 'select'>>) {
    super(...stores)

    this.openShadow(stylesheet)

    const variants = this.firstStore.passport?.manager?.variants || []

    element(this, {
      shadowChildren: custom('e-select', {
        attributes: {
          value: this.firstStore,
        },
        events: {
          change: (e) => {
            this.updateStores((e.currentTarget as SelectElement).value)
          },
        },
        children: [
          custom('e-select-head', {
            children: [
              span({
                attributes: {
                  'data-value-holder': '',
                },
              }),
            ],
          }),
          ...variants.map((v, i) =>
            custom('e-select-option', {
              children: v,
              attributes: {
                default: i === 0 ? true : null,
              },
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
