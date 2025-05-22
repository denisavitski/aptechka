import { elementResizer } from '@packages/element-resizer'
import { isBrowser } from '@packages/utils'

export class SizeElement extends HTMLElement {
  #targetElement: HTMLElement = this

  protected connectedCallback() {
    const targetName = this.getAttribute('target')?.trim()

    if (targetName) {
      if (targetName === 'parent') {
        this.#targetElement = this.parentElement || this
      } else {
        this.#targetElement = document.querySelector(targetName) || this
      }
    }

    elementResizer.subscribe(this, this.#resizeListener)
  }

  protected disconnectedCallback() {
    elementResizer.unsubscribe(this.#resizeListener)
  }

  #setVar(varName: string, value?: string) {
    const prefix = this.dataset.prefix || ''

    if (value) {
      this.#targetElement.style.setProperty(`--${prefix}${varName}`, value)
    } else {
      this.#targetElement.style.removeProperty(`--${prefix}${varName}`)
    }
  }

  #resizeListener = () => {
    this.#targetElement.style.removeProperty('--width')
    this.#targetElement.style.removeProperty('--height')
    this.#setVar('width')
    this.#setVar('height')

    setTimeout(() => {
      const width = this.offsetWidth
      const height = this.offsetHeight

      this.#setVar('width', width + 'px')
      this.#setVar('height', height + 'px')
    }, 0)
  }
}

if (isBrowser && !customElements.get('e-size-element')) {
  customElements.define('e-size-element', SizeElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-size-element': SizeElement
  }
}
