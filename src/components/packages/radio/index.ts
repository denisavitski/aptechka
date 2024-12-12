import { dispatchEvent } from '@packages/utils'

export interface RadioEvents {
  radioChange: CustomEvent<string | undefined>
}

export class RadioElement<T extends string = string> extends HTMLElement {
  #buttonElements: Array<HTMLElement> = []
  #value: T | undefined
  #currentButtonElement: HTMLElement | null = null

  public get value() {
    return this.#value
  }

  public get name() {
    return this.getAttribute('name')
  }

  public get currentButtonElement() {
    return this.#currentButtonElement
  }

  public setValue(value: T | undefined) {
    if (value && value !== this.#value) {
      this.#value = value

      this.#buttonElements.forEach((element) => {
        if (element.getAttribute('data-value') === this.#value) {
          element.setAttribute('data-checked', '')
          this.#currentButtonElement = element
        } else {
          element.removeAttribute('data-checked')
        }
      })

      dispatchEvent(this, 'radioChange', {
        detail: this.#value,
        bubbles: true,
      })
    }
  }

  protected connectedCallback() {
    this.#buttonElements = [
      ...this.querySelectorAll<HTMLElement>('[data-radio-button]'),
    ]

    if (document.readyState === 'complete') {
      this.#loadListener()
    } else {
      addEventListener('load', this.#loadListener)
    }
  }

  protected disconnectedCallback() {
    this.#buttonElements.forEach((element) => {
      element.removeEventListener('click', this.#buttonClickListener)
    })

    removeEventListener('load', this.#loadListener)

    document.documentElement.removeEventListener(
      'radioChange',
      this.#documentRadioChangeListener
    )
  }

  #loadListener = () => {
    if (this.isConnected) {
      document.documentElement.addEventListener(
        'radioChange',
        this.#documentRadioChangeListener
      )

      this.#buttonElements.forEach((element) => {
        element.addEventListener('click', this.#buttonClickListener)

        if (element.hasAttribute('data-checked')) {
          this.setValue(element.getAttribute('data-value') as T)
        }
      })
    }
  }

  #buttonClickListener = (e: Event) => {
    const ct = e.currentTarget as HTMLElement

    const value = ct.getAttribute('data-value')

    if (value) {
      this.setValue(value as T)
    }
  }

  #documentRadioChangeListener = (event: RadioEvents['radioChange']) => {
    const ct = event.target as RadioElement

    if (ct !== this && ct.name === this.name) {
      this.setValue(event.detail as T)
    }
  }
}

if (!customElements.get('e-radio')) {
  customElements.define('e-radio', RadioElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-radio': RadioElement
  }

  interface HTMLElementEventMap extends RadioEvents {}
}
