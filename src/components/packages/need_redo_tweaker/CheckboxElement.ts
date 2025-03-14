import { isBrowser } from '@packages/utils'
import {
  createStylesheet,
  element,
  input,
  label,
  slot,
  span,
} from './element-constructor'
import { aptechkaTheme } from './theme'
import checkIcon from '@assets/icons/check.svg?raw'

const stylesheet = createStylesheet({
  ':host': {
    position: 'relative',
    display: 'inline-block',
    width: '30px',
    height: '30px',
    borderRadius: aptechkaTheme.borderRadiusSmall.var,
    overflow: 'hidden',
  },

  'label, .fake': {
    display: 'block',
  },

  'label, .fake, .default': {
    width: '100%',
    height: '100%',
  },

  '.real': {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '0px',
    height: '0px',
    visibility: 'hidden',
    margin: '0',
  },

  '.default': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: aptechkaTheme.colorMainAux.var,
  },

  '.default svg': {
    width: '60%',
    height: '60%',
    fill: aptechkaTheme.colorFont.var,
    opacity: 0,
    transition: 'var(--duration-short)',
  },

  ':host(.checked) .default svg': {
    opacity: 1,
  },
})

export class CheckboxElement extends HTMLElement {
  static formAssociated = true

  #inputElement: HTMLInputElement = null!
  #internals: ElementInternals

  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.adoptedStyleSheets = [...shadow.adoptedStyleSheets, stylesheet]
    this.#internals = this.attachInternals()

    element(this, {
      children: label({
        children: [
          span({
            class: 'fake',
            children: slot({
              children: [
                span({
                  class: 'default',
                  children: [checkIcon],
                }),
              ],
            }),
          }),
          input({
            ref: (e) => {
              this.#inputElement = e
              e.required = this.hasAttribute('required')
              e.value = this.getAttribute('value') || ''
              e.checked = this.hasAttribute('checked')
              e.name = this.getAttribute('name') || ''

              this.#setFormValue()
            },
            class: 'real',
            type: 'checkbox',
            onChange: () => {
              this.#setFormValue()

              this.dispatchEvent(
                new Event('change', {
                  composed: true,
                })
              )
            },
          }),
        ],
      }),
    })
  }

  public get checked() {
    return this.#inputElement.checked
  }

  public set checked(state: boolean) {
    this.#inputElement.checked = state
    this.#setFormValue()
  }

  public get value() {
    return this.#inputElement.value
  }

  public set value(value: string) {
    this.#inputElement.value = value
    this.#setFormValue()
  }

  #setFormValue() {
    if (this.checked) {
      this.#internals.setFormValue(this.value)
    } else {
      this.#internals.setFormValue(null)
    }

    this.classList.toggle('checked', this.checked)
  }
}

if (isBrowser && !customElements.get('e-checkbox')) {
  customElements.define('e-checkbox', CheckboxElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-checkbox': CheckboxElement
  }
}
