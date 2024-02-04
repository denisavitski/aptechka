import { define } from '@packages/custom-element'
import { SelectUserElement } from './SelectUserElement'
import { SelectOptionElement } from './SelectOptionElement'

@define('e-select-head')
export class SelectHeadElement extends SelectUserElement {
  #valueElement: HTMLElement = null!

  constructor() {
    super()

    this.slot = 'head'
  }

  protected override connectedCallback() {
    super.connectedCallback()

    this.#valueElement =
      this.querySelector<HTMLElement>('[data-value-holder]') || this

    this.selectElement.addEventListener('change', this.#changeListener)
    this.#changeListener()
  }

  protected disconnectedCallback() {
    this.selectElement.removeEventListener('change', this.#changeListener)
  }

  #changeListener = () => {
    const slot =
      this.selectElement.shadowRoot!.querySelector<HTMLSlotElement>(
        '.body slot'
      )!
    const currentOption = (
      slot.assignedElements() as Array<SelectOptionElement>
    ).find((e) => {
      return e.value === this.selectElement.value
    })

    if (currentOption) {
      this.#valueElement.innerHTML = currentOption.innerHTML
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-select-head': SelectHeadElement
  }
}
