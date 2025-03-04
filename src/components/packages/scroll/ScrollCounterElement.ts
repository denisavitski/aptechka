import { isBrowser } from '@packages/utils'
import { ScrollUserElement } from './ScrollUserElement'

export class ScrollCounterElement extends ScrollUserElement {
  protected override async connectedCallback() {
    super.connectedCallback()

    this.scrollElement.counter.subscribe(this.#counterChangeListener)
  }

  protected disconnectedCallback() {
    this.scrollElement.counter.unsubscribe(this.#counterChangeListener)
  }

  #counterChangeListener = () => {
    this.textContent = `${this.scrollElement.counter.current + 1}`
  }
}

if (isBrowser && !customElements.get('e-scroll-counter')) {
  customElements.define('e-scroll-counter', ScrollCounterElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-scroll-counter': ScrollCounterElement
  }
}
