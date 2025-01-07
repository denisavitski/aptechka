import { createStylesheet, findScrollParentElement } from '@packages/utils'

const stylesheet = createStylesheet(/*css*/ `
  :host {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 12345;

    width: 100%;
    height: 100%;

    pointer-events: none;

    user-select: none;
  }

  ::slotted(img) {
    display: block !important;
    width: 100% !important;
    height: max-content !important;
    object-fit: cover !important;
  }

  ::slotted(picture) {
    display: contents;
  }

  input {
    position: fixed;
    z-index: 1;
    top: 2vmin;
    left: 2vmin;

    width: 10vmin;

    accent-color: var(--range-input-color, black);

    pointer-events: auto;


    opacity: 0.1;

    transition: opacity 0.4s;
  }

  input:hover {
    opacity: 1
  }
`)

export class PixelPerfectElement extends HTMLElement {
  #scrollParentElement: HTMLElement | null = null
  #imageElement: HTMLElement | null = null
  #rangeInputElement: HTMLInputElement

  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.adoptedStyleSheets = [...shadow.adoptedStyleSheets, stylesheet]

    shadow.innerHTML = `
      <slot></slot>
      <input type="range" min="0" max="1" step="0.01" value="${
        this.getAttribute('opacity') || 0
      }"/>
    `

    this.#rangeInputElement = shadow.querySelector('input')!

    this.#rangeInputElement.addEventListener('input', this.#rangeInputListener)
  }

  protected connectedCallback() {
    this.#scrollParentElement = findScrollParentElement(this)

    this.#scrollParentElement?.addEventListener('scroll', this.#scrollListener)

    const imageElement =
      this.shadowRoot!.querySelector('slot')?.assignedElements()[0]

    if (imageElement instanceof HTMLElement) {
      this.#imageElement = imageElement

      const pictureImage = this.#imageElement.querySelector('img')

      if (pictureImage) {
        this.#imageElement = pictureImage

        pictureImage.style.cssText = `
          display: block;
          width: 100%;
          height: max-content;
          object-fit: cover;
        `
      }
    }

    this.#rangeInputListener()
  }

  protected disconnectedCallback() {
    this.#scrollParentElement?.removeEventListener(
      'scroll',
      this.#scrollListener
    )
  }

  #scrollListener = () => {
    if (!this.#imageElement) {
      return
    }

    const x = this.#scrollParentElement!.scrollLeft * -1
    const y = this.#scrollParentElement!.scrollTop * -1

    this.#imageElement.style.transform = `translate3d(${x}px, ${y}px, 0px)`
  }

  #rangeInputListener = () => {
    if (this.#imageElement) {
      this.#imageElement.style.opacity = this.#rangeInputElement.value
    }
  }
}

if (!customElements.get('e-pixel-perfect')) {
  customElements.define('e-pixel-perfect', PixelPerfectElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-pixel-perfect': PixelPerfectElement
  }
}
