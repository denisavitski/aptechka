import { CustomElement } from '@packages/custom-element'
import { type TickerCallback, ticker } from '@packages/ticker'
import { windowResizer } from '@packages/window-resizer'
import { define } from '@packages/custom-element'
import { en3 } from '@packages/en3/core/en3'

import { En3Fluid } from './En3Fluid'

@define('en3-fluid')
export class En3FluidElement extends CustomElement {
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

declare global {
  interface HTMLElementTagNameMap {
    'e-fluid': En3FluidElement
  }
}
