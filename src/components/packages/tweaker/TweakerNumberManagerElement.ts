import { Store, StoreManagerType, StoreMiddleware } from '@packages/store'
import { define } from '@packages/custom-element'
import { TweakerStringManagerElement } from './TweakerStringManagerElement'
import { clamp } from '@packages/utils'

@define('e-tweaker-number-manager')
export class TweakerNumberManagerElement<
  M extends Extract<StoreManagerType, 'number' | 'range'> = 'number'
> extends TweakerStringManagerElement<number, M> {
  #step: number
  #min: number
  #max: number

  constructor(...stores: Array<Store<number, M>>) {
    super(...stores)

    this.#min = this.firstStore.passport?.manager?.min || 0
    this.#max = this.firstStore.passport?.manager?.max || 1
    this.#step = this.firstStore.passport?.manager?.step || 0.01
  }

  protected get min() {
    return this.#min
  }

  protected get max() {
    return this.#max
  }

  protected get step() {
    return this.#step
  }

  protected toFixed(value: number) {
    const remainLength = this.#step.toString().split('.')[1]?.length || 0

    if (remainLength) {
      return +value.toFixed(remainLength)
    } else {
      return Math.ceil(value)
    }
  }

  protected connectedCallback() {
    this.firstStore.addMiddleware(this.#storeMiddleware)
  }

  protected disconnectedCallback() {
    this.firstStore.removeMiddleware(this.#storeMiddleware)
  }

  #storeMiddleware: StoreMiddleware<number> = (v) => {
    const number = typeof v === 'string' ? parseFloat(v) || this.min : v

    const clamped = clamp(number, this.#min, this.#max)

    const fixed = this.toFixed(clamped)

    return fixed
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-tweaker-number-manager': TweakerNumberManagerElement
  }
}
