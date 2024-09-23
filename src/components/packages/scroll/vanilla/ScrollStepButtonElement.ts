import { CSSProperty } from '@packages/css-property'
import { ScrollButtonElement } from './ScrollButtonElement'
import { ScrollSetOptions } from './ScrollElement'

export class ScrollStepButtonElement extends ScrollButtonElement {
  #step = new CSSProperty(this, '--step', 1)

  protected override handleClick(options: ScrollSetOptions) {
    this.scrollElement.shiftSections(this.#step.current, options)
  }

  protected override connectedCallback() {
    super.connectedCallback()

    this.#step.subscribe(() => {
      this.#scrollLineListener()
    })

    this.#step.observe()

    this.scrollElement.addEventListener('scrollLine', this.#scrollLineListener)
    this.#scrollLineListener()
  }

  protected override disconnectedCallback() {
    super.disconnectedCallback()

    this.#step.close()

    this.removeAttribute('disabled')
  }

  #scrollLineListener = () => {
    if (!this.scrollElement.loopCSSProperty.current) {
      if (
        (this.#step.current > 0 && this.scrollElement.scrollLine === 'end') ||
        (this.#step.current < 0 && this.scrollElement.scrollLine === 'start')
      ) {
        this.setAttribute('disabled', '')
      } else {
        this.removeAttribute('disabled')
      }
    } else {
      this.removeAttribute('disabled')
    }
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
