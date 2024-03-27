import { define } from '@packages/custom-element'
import { PopoverElement } from './PopoverElement'
import { AbstractButtonElement } from '@packages/abstract-elements'

export type PopoverButtonType = 'open' | 'close' | 'toggle'

@define('e-popover-button')
export class PopoverButtonElement extends AbstractButtonElement {
  #popoverElement: PopoverElement | undefined

  public get popoverElement() {
    return this.#popoverElement
  }

  public click() {
    if (this.#popoverElement) {
      const type = this.getAttribute('type') || 'open'

      if (
        type === 'open' ||
        (type === 'toggle' && !this.#popoverElement.opened.current)
      ) {
        this.#popoverElement.open()
      } else if (
        type === 'close' ||
        (type === 'toggle' && this.#popoverElement.opened.current)
      ) {
        this.#popoverElement.close()
      }
    }
  }

  protected connectedCallback() {
    const targetId = this.getAttribute('target')

    if (targetId) {
      const popoverElement =
        document.querySelector(`#${targetId}`) ||
        (this.getRootNode() as ParentNode).querySelector(`#${targetId}`)

      if (popoverElement) {
        this.#popoverElement = popoverElement as PopoverElement
      } else {
        console.warn(this, `target ${targetId} not found`)
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-popover-button': PopoverButtonElement
  }
}
