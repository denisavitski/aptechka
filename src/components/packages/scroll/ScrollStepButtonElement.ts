import { define } from '@packages/custom-element'
import { ScrollButtonElement } from './ScrollButtonElement'
import { ScrollBehaviour } from './ScrollElement'

@define('e-scroll-step-button')
export class ScrollStepButtonElement extends ScrollButtonElement {
  protected override handleClick() {
    const step = this.getAttribute('step')
    const behaviour = this.getAttribute('behaviour') as ScrollBehaviour

    this.scrollElement.shiftSections(parseInt(step || '1'), behaviour)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-scroll-step-button': ScrollStepButtonElement
  }
}
