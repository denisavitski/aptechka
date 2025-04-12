import { findParentElement, isBrowser, whenDefined } from '@packages/utils'
import { BillboardElement } from './BillboardElement'

export class BillboardBulletsElement extends HTMLElement {
  #billboardElement: BillboardElement | null = null
  #contentElement: HTMLElement = null!
  #buttonElements: Array<HTMLElement> = []

  public get buttonElements() {
    return this.#buttonElements
  }

  protected async connectedCallback() {
    await whenDefined('e-billboard')

    this.#billboardElement = findParentElement(this, BillboardElement)

    if (this.#billboardElement) {
      if (this.isConnected) {
        this.innerHTML = ''

        const length = this.#billboardElement!.length

        this.#contentElement = document.createElement('div')

        for (let index = 0; index < length; index++) {
          const button = document.createElement('button')
          button.setAttribute('aria-label', `Go to item ${index + 1}`)
          this.#buttonElements.push(button)
          this.#contentElement.appendChild(button)
        }

        this.appendChild(this.#contentElement)

        this.#buttonElements.forEach((element) => {
          element.addEventListener('click', this.#clickListener)
        })

        this.#billboardElement?.addEventListener(
          'billboardChange',
          this.#billboardChangeListener
        )

        this.#billboardChangeListener()
      }
    }
  }

  protected disconnectedCallback() {
    this.#buttonElements.forEach((element) => {
      element.removeEventListener('click', this.#clickListener)
    })

    this.#billboardElement?.removeEventListener(
      'billboardChange',
      this.#billboardChangeListener
    )

    this.innerHTML = ''

    this.#buttonElements = []
  }

  #clickListener = (e: Event) => {
    const ct = e.currentTarget as HTMLElement

    const index = this.#buttonElements.findIndex((el) => el === ct)

    if (index >= 0) {
      this.#billboardElement!.set(index)
    }
  }

  #billboardChangeListener = () => {
    this.#buttonElements.forEach((element, i) => {
      if (i === this.#billboardElement!.counter) {
        element.classList.add('current')
      } else {
        element.classList.remove('current')
      }
    })
  }
}

if (isBrowser && !customElements.get('e-billboard-bullets')) {
  customElements.define('e-billboard-bullets', BillboardBulletsElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-billboard-bullets': BillboardBulletsElement
  }
}
