import { define } from '@packages/custom-element'
import { ScrollButtonElement } from './ScrollButtonElement'
import { ScrollBehaviour } from './ScrollElement'

@define('e-scroll-set-button')
export class ScrollSetButtonElement extends ScrollButtonElement {
  protected override handleClick() {
    const index = this.getAttribute('index')
    const behaviour = this.getAttribute('behaviour') as ScrollBehaviour

    this.scrollElement.scrollToSection(parseInt(index || '0'), behaviour)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-scroll-set-button': ScrollSetButtonElement
  }
}
