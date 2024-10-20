import { elementResizer } from '@packages/element-resizer'

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

    this.#targetElement.style.removeProperty('--width')
    this.#targetElement.style.removeProperty('--height')
  }

  #resizeListener = () => {
    this.#targetElement.style.removeProperty('--width')
    this.#targetElement.style.removeProperty('--height')

    setTimeout(() => {
      const width = this.offsetWidth
      const height = this.offsetHeight

      this.#targetElement.style.setProperty('--width', width + 'px')
      this.#targetElement.style.setProperty('--height', height + 'px')
    }, 0)
  }
}

if (!customElements.get('e-size-element')) {
  customElements.define('e-size-element', SizeElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-size-element': SizeElement
  }
}
