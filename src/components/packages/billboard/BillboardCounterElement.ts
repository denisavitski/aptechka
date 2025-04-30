import { findParentElement, isBrowser, whenDefined } from '@packages/utils'
import { BillboardElement } from './BillboardElement'

export class BillboardCounterElement extends HTMLElement {
  #billboardElement: BillboardElement | null = null

  protected async connectedCallback() {
    await whenDefined('e-billboard')

    this.#billboardElement = findParentElement(this, BillboardElement)

    this.#billboardElement?.addEventListener(
      'billboardChange',
      this.#changeListener
    )

    this.#changeListener()
  }

  protected disconnectedCallback() {
    this.#billboardElement?.removeEventListener(
      'billboardChange',
      this.#changeListener
    )
  }

  #changeListener = () => {
    const value = (this.#billboardElement?.counter || 0) + 1
    const pad = parseInt(this.getAttribute('pad') || '0')
    this.textContent = value.toString().padStart(pad, '0')
  }
}

if (isBrowser && !customElements.get('e-billboard-counter')) {
  customElements.define('e-billboard-counter', BillboardCounterElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-billboard-counter': BillboardCounterElement
  }
}
