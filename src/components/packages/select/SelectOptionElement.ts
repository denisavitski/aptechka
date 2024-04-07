import { define } from '@packages/custom-element'
import { SelectUserElement } from './SelectUserElement'
import {
  button,
  createStylesheet,
  element,
  slot,
} from '@packages/element-constructor'
import { aptechkaTheme } from '@packages/theme'
import { isBrowser } from '@packages/utils'

const stylesheet = createStylesheet({
  ':host': {
    width: '100%',
    height: aptechkaTheme.heightInput.var,
    display: 'inline-flex',
    alignItems: 'center',
  },

  button: {
    all: 'inherit',
  },
})

@define('e-select-option')
export class SelectOptionElement extends SelectUserElement {
  constructor() {
    super()

    if (isBrowser) {
      this.openShadow(stylesheet)

      element(this, {
        children: [
          button({
            onClick: () => {
              this.#pick()
            },
            children: slot(),
          }),
        ],
      })
    }
  }

  public get value() {
    return (
      (this.hasAttribute('value')
        ? this.getAttribute('value')
        : this.innerText) || ''
    )
  }

  protected override connectedCallback() {
    super.connectedCallback()

    if (this.hasAttribute('default')) {
      if (!this.selectElement.value) {
        this.selectElement.value = this.value
      }
    }

    this.selectElement.addEventListener('change', this.#changeListener)

    setTimeout(() => {
      this.#changeListener()
    })
  }

  protected disconnectedCallback() {
    this.selectElement.removeEventListener('change', this.#changeListener)
  }

  #changeListener = () => {
    if (this.selectElement.value === this.value) {
      this.style.display = 'none'
    } else {
      this.style.display = ''
    }
  }

  #pick() {
    this.selectElement.value = this.value
    this.selectElement.close()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-select-option': SelectOptionElement
  }
}
