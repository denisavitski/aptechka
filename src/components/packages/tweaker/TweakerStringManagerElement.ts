import { aptechkaTheme } from '@packages/theme'
import { Store } from '@packages/store/Store'
import { define } from '@packages/custom-element'
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

@define('e-tweaker-string-manager')
export class TweakerStringManagerElement<
  S extends Store<any, any> = Store<string, 'string'>
> extends TweakerStoreManagerElement<S> {
  #content = new Store<Array<any>>([])

  constructor(...stores: Array<S>) {
    super(...stores)

    this.openShadow(stylesheet)

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
