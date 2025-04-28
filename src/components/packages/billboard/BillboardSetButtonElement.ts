import { findParentElement, isBrowser, whenDefined } from '@packages/utils'
import { BillboardElement, BillboardItem } from './BillboardElement'
import { CSSProperty } from '@packages/css-property'

export class BillboardSetButtonElement extends HTMLElement {
  public handleClick: ((event: Event) => boolean) | undefined

  #item: BillboardItem = null!
  #index = new CSSProperty(this, '--index', 0)
  #billboardElement: BillboardElement | null = null

  constructor() {
    super()

    this.addEventListener('click', (event) => {
      if (this.#billboardElement) {
        if (!this.handleClick || this.handleClick(event)) {
          this.#billboardElement.set(this.#index.current)
        }
      }
    })

    this.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && !this.hasAttribute('keydown-disabled')) {
        e.preventDefault()
        this.click()
      }
    })
  }

  protected async connectedCallback() {
    await whenDefined('e-billboard')

    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0')
    }

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'button')
    }

    this.#billboardElement = findParentElement(this, BillboardElement)

    if (this.#billboardElement) {
      this.#item = new BillboardItem(this, this.#billboardElement)

      this.#billboardElement.addEventListener(
        'billboardChange',
        this.#changeListener
      )

      this.#changeListener()

      this.#index.subscribe(this.#changeListener)

      this.#index.observe()
    }
  }

  protected disconnectedCallback() {
    this.removeAttribute('tabindex')
    this.removeAttribute('role')

    this.#index.unsubscribe(this.#changeListener)

    this.#index.unobserve()

    this.#billboardElement?.removeEventListener(
      'billboardChange',
      this.#changeListener
    )

    this.#item.destroy()
  }

  #changeListener = () => {
    this.#item.updateClasses(this.#index.current)
  }
}

if (isBrowser && !customElements.get('e-billboard-set-button')) {
  customElements.define('e-billboard-set-button', BillboardSetButtonElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-billboard-set-button': BillboardSetButtonElement
  }
}
