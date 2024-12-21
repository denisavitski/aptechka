import { findParentElement, isBrowser } from '@packages/utils'
import { BillboardElement } from './BillboardElement'
import { CSSProperty } from '@packages/css-property'

export class BillboardSetButtonElement extends HTMLElement {
  #step = new CSSProperty(this, '--set', 0)
  #billboardElement: BillboardElement | null = null

  constructor() {
    super()

    this.addEventListener('click', () => {
      if (this.#billboardElement) {
        this.#billboardElement.set(this.#step.current)
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

if (isBrowser && !customElements.get('e-billboard-set-button')) {
  customElements.define('e-billboard-set-button', BillboardSetButtonElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-billboard-set-button': BillboardSetButtonElement
  }
}
