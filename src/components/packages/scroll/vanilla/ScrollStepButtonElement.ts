import { ScrollButtonElement } from './ScrollButtonElement'
import { ScrollSetOptions } from './ScrollElement'

export class ScrollStepButtonElement extends ScrollButtonElement {
  protected override handleClick(options: ScrollSetOptions) {
    const step = this.getAttribute('step')
    this.scrollElement.shiftSections(parseInt(step || '1'), options)
  }
}

if (!customElements.get('e-scroll-step-button')) {
  customElements.define('e-scroll-step-button', ScrollStepButtonElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-scroll-step-button': ScrollStepButtonElement
  }
}
