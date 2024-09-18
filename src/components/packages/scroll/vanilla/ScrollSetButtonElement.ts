import { ScrollButtonElement } from './ScrollButtonElement'
import { ScrollBehaviour, ScrollSetOptions } from './ScrollElement'

export class ScrollSetButtonElement extends ScrollButtonElement {
  protected override handleClick(options: ScrollSetOptions) {
    const index = this.getAttribute('index')

    this.scrollElement.scrollToSection(parseInt(index || '0'), options)
  }
}

if (!customElements.get('e-scroll-set-button')) {
  customElements.define('e-scroll-set-button', ScrollSetButtonElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-scroll-set-button': ScrollSetButtonElement
  }
}
