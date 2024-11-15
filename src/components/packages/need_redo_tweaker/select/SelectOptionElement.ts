import { SelectUserElement } from './SelectUserElement'
import { createStylesheet, element, slot } from '../element-constructor'
import { isBrowser } from '@packages/utils'

const stylesheet = createStylesheet({
  ':host': {
    width: '100%',
    height: '40px',
    display: 'inline-flex',
    alignItems: 'center',
  },
})

export class SelectOptionElement extends SelectUserElement {
  constructor() {
    super()

    if (isBrowser) {
      const shadow = this.attachShadow({ mode: 'open' })
      shadow.adoptedStyleSheets.push(stylesheet)

      element(this, {
        tabindex: 0,
        onClick: () => {
          this.#pick()
        },
        onKeydown: (e) => {
          if (e.code === 'Space') {
            this.#pick()
          }
        },
        children: slot(),
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

if (isBrowser && !customElements.get('e-select-option')) {
  customElements.define('e-select-option', SelectOptionElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-select-option': SelectOptionElement
  }
}
