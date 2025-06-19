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
    const value = this.scrollElement.limit
    const pad = parseInt(this.getAttribute('pad') || '0')
    this.textContent = value.toString().padStart(pad, '0')
  }
}

if (isBrowser && !customElements.get('e-scroll-total')) {
  customElements.define('e-scroll-total', ScrollCounterElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-scroll-total': ScrollCounterElement
  }
}
