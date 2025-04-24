import { ScrollButtonElement } from './ScrollButtonElement'
import { ScrollSetOptions } from './ScrollElement'
import {
  getCumulativeOffsetLeft,
  getCumulativeOffsetTop,
  isBrowser,
} from '@packages/utils'

export class ScrollSectionButtonElement extends ScrollButtonElement {
  protected override handleClick(options: ScrollSetOptions) {
    this.scrollElement.setPosition(
      this.scrollElement.vertical
        ? getCumulativeOffsetTop(this)
        : getCumulativeOffsetLeft(this),
      options
    )
  }

  protected override connectedCallback() {
    super.connectedCallback()
  }

  protected override disconnectedCallback() {
    super.disconnectedCallback()
  }
}

if (isBrowser && !customElements.get('e-scroll-section-button')) {
  customElements.define('e-scroll-section-button', ScrollSectionButtonElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-scroll-section-button': ScrollSectionButtonElement
  }
}
