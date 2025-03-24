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

    this.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && !this.hasAttribute('keydown-disabled')) {
        e.preventDefault()
        this.click()
      }
    })
  }

  protected async connectedCallback() {
    await customElements.whenDefined('e-billboard')

    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0')
    }

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'button')
    }

    this.#step.observe()

    this.tabIndex = 0

    this.#billboardElement = findParentElement(this, BillboardElement)

    this.#billboardElement?.addEventListener(
      'billboardChange',
      this.#changeListener
    )

    setTimeout(() => {
      this.#changeListener()
    }, 0)
  }

  protected disconnectedCallback() {
    this.removeAttribute('tabindex')
    this.removeAttribute('role')

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
