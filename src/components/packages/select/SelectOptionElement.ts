import { define } from '@packages/custom-element'
import { SelectUserElement } from './SelectUserElement'
import {
  button,
  createStylesheet,
  element,
  slot,
} from '@packages/element-constructor'

const stylesheet = createStylesheet({
  button: {
    cursor: 'default',
    background: 'none',
    border: 'none',
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    padding: '0',
    margin: '0',
  },
})

@define('e-select-option')
export class SelectOptionElement extends SelectUserElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' }).adoptedStyleSheets.push(stylesheet)

    element(this, {
      shadowChildren: button({
        children: slot(),
        events: {
          click: () => {
            this.selectElement.value = this.value
            this.selectElement.close()
          },
        },
      }),
    })
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
}

declare global {
  interface HTMLElementTagNameMap {
    'e-select-option': SelectOptionElement
  }
}
