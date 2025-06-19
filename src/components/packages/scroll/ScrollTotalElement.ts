import { isBrowser } from '@packages/utils'
import { ScrollUserElement } from './ScrollUserElement'

export class ScrollTotalElement extends ScrollUserElement {
  protected override async connectedCallback() {
    super.connectedCallback()

    this.scrollElement.sectionsInViewCSSProperty.subscribe(
      this.#sectionsChangeListener
    )
    this.scrollElement.addEventListener(
      'scrollSectionsChange',
      this.#sectionsChangeListener
    )
    this.#sectionsChangeListener()
  }

  protected disconnectedCallback() {
    this.scrollElement.sectionsInViewCSSProperty.unsubscribe(
      this.#sectionsChangeListener
    )
    this.scrollElement.removeEventListener(
      'scrollSectionsChange',
      this.#sectionsChangeListener
    )
  }

  #sectionsChangeListener = () => {
    const value = this.scrollElement.limit + 1
    const pad = parseInt(this.getAttribute('pad') || '0')
    this.textContent = value.toString().padStart(pad, '0')
  }
}

if (isBrowser && !customElements.get('e-scroll-total')) {
  customElements.define('e-scroll-total', ScrollTotalElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-scroll-total': ScrollTotalElement
  }
}
