import { Store, StoreManagerType } from '@packages/store/Store'
import { define } from '@packages/custom-element'
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement'
import { createStylesheet, element, input } from '@packages/element-constructor'
import { studioTheme } from '../studioTheme'

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
    fontSize: studioTheme.sizePropertyValueFont.var,
  },

  '.text-input': {
    height: '30px',
    width: '100%',

    margin: '0',
    padding: `0 ${studioTheme.sizePaddingSmall.var}`,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: studioTheme.sizeBorderRadius.var,
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

  constructor(store: Store<T, M>) {
    super(store)

    this.attachShadow({ mode: 'open' }).adoptedStyleSheets.push(stylesheet)

    element(this, {
      shadowChildren: [
        input({
          class: 'text-input',
          attributes: {
            type: 'string',
            value: this.store,
          },
          events: {
            change: (e) => {
              this.store.current = (e.currentTarget as HTMLInputElement)
                .value as any
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
