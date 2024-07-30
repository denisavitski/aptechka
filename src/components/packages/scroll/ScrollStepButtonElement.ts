import { ScrollButtonElement } from './ScrollButtonElement'
import { ScrollBehaviour } from './ScrollElement'

export class ScrollStepButtonElement extends ScrollButtonElement {
  protected override handleClick() {
    const step = this.getAttribute('step')
    const behaviour = this.getAttribute('behaviour') as ScrollBehaviour

    this.scrollElement.shiftSections(parseInt(step || '1'), { behaviour })
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
