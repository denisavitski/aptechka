import '@packages/checkbox'
import { Store, StoreMiddleware } from '@packages/store/Store'
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement'
import { define } from '@packages/custom-element'
import { createStylesheet, element, input } from '@packages/element-constructor'
import { aptechkaTheme } from '@packages/theme'
import { clamp, toStep } from '@packages/utils'

const stylesheet = createStylesheet({
  ':host': {
    width: '100%',

    display: 'flex',
    alignItems: 'center',
    gap: 'var(--gap-small)',
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

@define('e-tweaker-numbers-manager')
export class TweakerNumbersManagerElement extends TweakerStoreManagerElement<
  Store<Array<number>, 'numbers'>
> {
  #inputElements: Array<HTMLInputElement> = []

  #step: number
  #min: number
  #max: number

  constructor(...stores: Array<Store<Array<number>, 'numbers'>>) {
    super(...stores)

    this.openShadow(stylesheet)

    this.#min = this.firstStore.passport?.manager?.min || -Infinity
    this.#max = this.firstStore.passport?.manager?.max || Infinity
    this.#step = this.firstStore.passport?.manager?.step || 0.01

    element(this, {
      children: this.firstStore.current.map((v) => {
        return input({
          type: 'number',
          ref: (e) => this.#inputElements.push(e),
          value: v,
          onChange: () => {
            this.updateStores(
              this.#inputElements.map((el) => parseFloat(el.value))
            )
          },
        })
      }),
    })

    this.firstStore.subscribe((e) => {
      e.current.map((v, i) => {
        const el = this.#inputElements[i]

        if (el) {
          el.value = v.toString()
        }
      })
    })
  }

  protected connectedCallback() {
    this.firstStore.addMiddleware(this.#storeMiddleware)
  }

  protected disconnectedCallback() {
    this.firstStore.removeMiddleware(this.#storeMiddleware)
  }

  #storeMiddleware: StoreMiddleware<Array<number>> = (arr) => {
    arr.map((v, i) => {
      const number = typeof v === 'string' ? parseFloat(v) || this.#min : v

      const clamped = clamp(number, this.#min, this.#max)

      const fixed = toStep(clamped, this.#step)

      arr[i] = fixed
    })

    return arr
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker-numbers-manager': TweakerNumbersManagerElement
  }
}
