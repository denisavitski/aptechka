import { Store, StoreMiddleware } from '@packages/store'
import { define } from '@packages/custom-element'
import { TweakerStringManagerElement } from './TweakerStringManagerElement'
import { clamp } from '@packages/utils'

@define('e-tweaker-number-manager')
export class TweakerNumberManagerElement<
  S extends Store<number, any> = Store<number, 'number'>
> extends TweakerStringManagerElement<S> {
  #step: number
  #min: number
  #max: number

  constructor(...stores: Array<S>) {
    super(...stores)

    this.#min = this.firstStore.passport?.manager?.min || -Infinity
    this.#max = this.firstStore.passport?.manager?.max || Infinity
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
