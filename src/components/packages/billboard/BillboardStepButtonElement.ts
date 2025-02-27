import { findParentElement, isBrowser } from '@packages/utils'
import { BillboardElement } from './BillboardElement'
import { CSSProperty } from '@packages/css-property'

export class BillboardStepButtonElement extends HTMLElement {
  public handleClick: ((event: Event) => boolean) | undefined
  #step = new CSSProperty(this, '--step', 1)
  #billboardElement: BillboardElement | null = null

  constructor() {
    super()

    this.addEventListener('click', (event) => {
      if (this.#billboardElement) {
        if (!this.handleClick || this.handleClick(event)) {
          this.#billboardElement.shift(this.#step.current)
        }
      }
    })
  }

  protected async connectedCallback() {
    await customElements.whenDefined('e-billboard')

    this.#step.observe()

    this.tabIndex = 0

    this.#billboardElement = findParentElement(this, BillboardElement)

    this.#billboardElement?.addEventListener(
      'billboardChange',
      this.#changeListener
    )

    this.#changeListener()
  }

  protected disconnectedCallback() {
    this.removeAttribute('tabindex')
    this.#step.unobserve()

    this.#billboardElement?.removeEventListener(
      'billboardChange',
      this.#changeListener
    )
  }

  #changeListener = () => {
    if (!this.#billboardElement) {
      return
    }

    if (
      !this.#billboardElement.loop.current &&
      ((this.#billboardElement.counter === 0 && this.#step.current <= 0) ||
        (this.#billboardElement.counter ===
          this.#billboardElement.itemElements.length - 1 &&
          this.#step.current >= 0))
    ) {
      this.setAttribute('disabled', '')
    } else {
      this.removeAttribute('disabled')
    }
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
