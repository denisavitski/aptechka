import { Store, StoreManagerType } from '@packages/store/Store'
import { define } from '@packages/custom-element'
import { createStylesheet, element, input } from '@packages/element-constructor'

import { TweakerStoreManagerElement } from './TweakerStoreManagerElement'
import { aptechkaTheme } from '@packages/theme'

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
    fontSize: aptechkaTheme.fontSizeSmall.var,
  },

  '.text-input': {
    height: aptechkaTheme.heightInput.var,
    width: '100%',

    margin: '0',
    padding: `0 ${aptechkaTheme.gapSmall.var}`,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: aptechkaTheme.borderRadius.var,
  },
})

@define('e-tweaker-string-manager')
export class TweakerStringManagerElement<
  T extends string | number = string,
  M extends Extract<
    StoreManagerType,
    'string' | 'number' | 'range' | 'link'
  > = 'string'
> extends TweakerStoreManagerElement<T, M> {
  #content = new Store<Array<any>>([])

  constructor(...stores: Array<Store<T, M>>) {
    super(...stores)

    this.openShadow(stylesheet)

    element(this, {
      shadowChildren: [
        input({
          class: 'text-input',
          attributes: {
            type: 'string',
            value: this.firstStore,
          },
          events: {
            change: (e) => {
              this.updateStores(
                (e.currentTarget as HTMLInputElement).value as any
              )
            },
          },
        }),
        this.#content,
      ],
    })
  }

  protected appendContent(value: any) {
    this.#content.current = [...this.#content.current, value]
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker-string-manager': TweakerStringManagerElement
  }
}
