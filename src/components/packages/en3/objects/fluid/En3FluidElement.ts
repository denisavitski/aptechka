import { type TickerCallback, ticker } from '@packages/ticker'
import { windowResizer } from '@packages/window-resizer'
import { en3 } from '@packages/en3/core/en3'

import { En3Fluid } from './En3Fluid'

export class En3FluidElement extends HTMLElement {
  #fluid: En3Fluid = null!

  public get fluid() {
    return this.#fluid
  }

  protected connectedCallback() {
    this.#fluid = new En3Fluid()
    en3.view.add(this.#fluid)

    windowResizer.subscribe(this.#resizeListener)
    ticker.subscribe(this.#tickerListener)
  }

  protected disconnectedCallback() {
    en3.view.remove(this.#fluid)
    this.#fluid.dispose()

    windowResizer.unsubscribe(this.#resizeListener)
    ticker.unsubscribe(this.#tickerListener)
  }

  #resizeListener = () => {
    this.#fluid.resize()
  }

  #tickerListener: TickerCallback = () => {
    if (en3.width) {
      this.#fluid.update()
    }
  }
}

if (!customElements.get('e-fluid')) {
  customElements.define('e-fluid', En3FluidElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-fluid': En3FluidElement
  }
}
