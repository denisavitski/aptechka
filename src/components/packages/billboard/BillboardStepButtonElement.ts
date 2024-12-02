import { findParentElement, isBrowser } from '@packages/utils'
import { BillboardElement } from './BillboardElement'
import { CSSProperty } from '@packages/css-property'

export class BillboardStepButtonElement extends HTMLElement {
  #step = new CSSProperty(this, '--step', 1)
  #billboardElement: BillboardElement | null = null

  constructor() {
    super()

    this.addEventListener('click', () => {
      if (this.#billboardElement) {
        this.#billboardElement.shift(this.#step.current)
      }
    })
  }

  protected connectedCallback() {
    this.tabIndex = 0

    this.#billboardElement = findParentElement(this, BillboardElement)

    this.#step.observe()
  }

  protected disconnectedCallback() {
    this.removeAttribute('tabindex')
    this.#step.unobserve()
  }
}

if (isBrowser && !customElements.get('e-billboard-step-button')) {
  customElements.define('e-billboard-step-button', BillboardStepButtonElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-billboard-step-button': BillboardStepButtonElement
  }
}
