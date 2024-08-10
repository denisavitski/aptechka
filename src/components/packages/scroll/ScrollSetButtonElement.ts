import { ScrollButtonElement } from './ScrollButtonElement'
import { ScrollBehaviour } from './ScrollElement'

export class ScrollSetButtonElement extends ScrollButtonElement {
  protected override handleClick() {
    const index = this.getAttribute('index')
    const behaviour = this.getAttribute('behaviour') as ScrollBehaviour

    this.scrollElement.scrollToSection(parseInt(index || '0'), { behaviour })
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
