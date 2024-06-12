import { define } from '@packages/custom-element'
import { SelectUserElement } from './SelectUserElement'
import { SelectOptionElement } from './SelectOptionElement'
import { createStylesheet, element, slot } from '@packages/element-constructor'
import arrowIcon from '@assets/icons/arrow.svg?raw'
import { aptechkaTheme } from '@packages/theme'
import { isBrowser } from '@packages/utils'

const stylesheet = createStylesheet({
  ':host': {
    width: '100%',
    height: '40px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  '.default-arrow': {
    flexShrink: '0',
    width: 'var(--arrow-size, 1em)',
    height: 'var(--arrow-size, 1em)',
    fill: `var(--arrow-color, ${aptechkaTheme.colorMain.var})`,
    transitionProperty: 'transform',
    transitionDuration: `var(--duration, ${'var(--duration-short)'})`,
  },

  ':host(.opened) .default-arrow': {
    transform: 'scaleY(-1)',
  },
})

@define('e-select-head')
export class SelectHeadElement extends SelectUserElement {
  #valueElement: HTMLElement = null!

  constructor() {
    super()

    if (isBrowser) {
      this.openShadow(stylesheet)

      element(this, {
        children: [
          slot(),
          slot({
            name: 'arrow',
            children: element(arrowIcon, { class: 'default-arrow' }),
          }),
        ],
      })

      this.slot = 'head'
    }
  }

  protected override connectedCallback() {
    super.connectedCallback()

    this.#valueElement =
      this.querySelector<HTMLElement>('[data-value-holder]') || this

    this.selectElement.addEventListener('change', this.#changeListener)
    this.#changeListener()

    this.selectElement.addEventListener('selectToggle', this.#toggleListener)
  }

  protected disconnectedCallback() {
    this.selectElement.removeEventListener('change', this.#changeListener)
    this.selectElement.removeEventListener('selectToggle', this.#toggleListener)
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

  #toggleListener = () => {
    this.classList.toggle('opened', this.selectElement.opened)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-select-head': SelectHeadElement
  }
}
