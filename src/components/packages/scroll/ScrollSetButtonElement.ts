import { CSSProperty } from '@packages/css-property'
import { ScrollButtonElement } from './ScrollButtonElement'
import { ScrollSetOptions } from './ScrollElement'
import { isBrowser } from '@packages/utils'

export class ScrollSetButtonElement extends ScrollButtonElement {
  #set = new CSSProperty(this, '--set', 1)

  protected override handleClick(options: ScrollSetOptions) {
    this.scrollElement.scrollToSection(this.#set.current, options)
  }

  protected override connectedCallback() {
    super.connectedCallback()
    this.#set.observe()
  }

  protected override disconnectedCallback() {
    super.disconnectedCallback()
    this.#set.close()
  }
}

if (isBrowser && !customElements.get('e-scroll-set-button')) {
  customElements.define('e-scroll-set-button', ScrollSetButtonElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-scroll-set-button': ScrollSetButtonElement
  }
}
