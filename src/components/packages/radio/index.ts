import { dispatchEvent } from '@packages/utils'

export interface RadioEvents {
  radioChange: CustomEvent<string | undefined>
}

export class RadioElement<T extends string = string> extends HTMLElement {
  #listenerElements: Array<HTMLElement> = []
  #buttonElements: Array<HTMLElement> = []
  #value: T | undefined
  #currentButtonElement: HTMLElement | null = null

  #disabled = false

  public get value() {
    return this.#value
  }

  public get name() {
    return this.getAttribute('name')
  }

  public get currentButtonElement() {
    return this.#currentButtonElement
  }

  public get disabled() {
    return this.#disabled
  }

  public disable() {
    this.#disabled = true
  }

  public enable() {
    this.#disabled = false
  }

  public addButton(element: HTMLElement) {
    this.#buttonElements.push(element)

    element.addEventListener('click', this.#buttonClickListener)
  }

  public removeButton(element: HTMLElement) {
    const founded = this.#buttonElements.find((el) => el === element)

    if (founded) {
      founded.removeEventListener('click', this.#buttonClickListener)
      this.#buttonElements = this.#buttonElements.filter((el) => el !== element)
    }
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

      if (this.#currentButtonElement) {
        this.#listenerElements.forEach((element) => {
          element.innerHTML =
            this.#currentButtonElement!.getAttribute('data-name') || value
        })
      }

      dispatchEvent(this, 'radioChange', {
        detail: this.#value,
        bubbles: true,
      })
    }
  }

  protected connectedCallback() {
    this.#listenerElements = [
      ...this.querySelectorAll<HTMLElement>('[data-radio-listener]'),
    ]

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
    if (!this.#disabled) {
      const ct = e.currentTarget as HTMLElement

      const value = ct.getAttribute('data-value')

      if (value) {
        this.setValue(value as T)
      }
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
