import { debounce, isBrowser } from '@packages/utils'
import { ScrollBehaviour, ScrollElement } from './ScrollElement'
import { ScrollUserElement } from './ScrollUserElement'

class BulletButton {
  #element: HTMLButtonElement = null!
  #scrollElement: ScrollElement = null!
  #index: number = null!
  #behaviour: ScrollBehaviour = null!

  constructor(
    scrollElement: ScrollElement,
    index: number,
    behaviour: ScrollBehaviour
  ) {
    if (isBrowser) {
      this.#element = document.createElement('button')
      this.#scrollElement = scrollElement
      this.#behaviour = behaviour
      this.#index = index

      this.#element.addEventListener('click', this.#clickListener)
      this.#scrollElement.counter.subscribe(this.#counterChangeListener)
      this.#counterChangeListener()
    }
  }

  public get element() {
    return this.#element
  }

  public destroy() {
    this.#element.removeEventListener('click', this.#clickListener)
    this.#scrollElement.counter.unsubscribe(this.#counterChangeListener)
    this.#element.remove()
  }

  #clickListener = () => {
    this.#scrollElement.scrollToSection(this.#index, {
      behaviour: this.#behaviour,
    })
  }

  #counterChangeListener = () => {
    this.#element.classList.toggle(
      'current',
      this.#scrollElement.counter.current === this.#index
    )
  }
}

export class ScrollBulletButtonsElement extends ScrollUserElement {
  #contentElement: HTMLElement = null!
  #buttons: Array<BulletButton> = []

  protected override connectedCallback() {
    super.connectedCallback()

    this.scrollElement.addEventListener(
      'sectionsChange',
      this.#sectionsChangeListener
    )

    this.scrollElement.sectionsInViewCSSProperty.subscribe(
      this.#sectionsChangeListener
    )

    this.scrollElement.loopCSSProperty.subscribe(this.#sectionsChangeListener)

    this.#contentElement = document.createElement('div')
    this.appendChild(this.#contentElement)
  }

  protected disconnectedCallback() {
    this.scrollElement.removeEventListener(
      'sectionsChange',
      this.#sectionsChangeListener
    )

    this.scrollElement.sectionsInViewCSSProperty.unsubscribe(
      this.#sectionsChangeListener
    )

    this.scrollElement.loopCSSProperty.unsubscribe(this.#sectionsChangeListener)

    this.#buttons.forEach((b) => b.destroy())
    this.#buttons = []
    this.#contentElement.remove()
  }

  #sectionsChangeListener = debounce(() => {
    this.#buttons.forEach((b) => b.destroy())

    this.#buttons = []

    let length = 0

    if (this.scrollElement.loopCSSProperty.current) {
      length = this.scrollElement.sections.length
    } else {
      length =
        this.scrollElement.sections.length -
        Math.max(this.scrollElement.sectionsInViewCSSProperty.current - 1, 0)
    }

    for (let index = 0; index < length; index++) {
      const button = new BulletButton(
        this.scrollElement,
        index,
        (this.getAttribute('behaviour') as ScrollBehaviour) || 'smooth'
      )

      this.#contentElement.appendChild(button.element)

      this.#buttons.push(button)
    }
  }, 0)
}

if (isBrowser && !customElements.get('e-scroll-bullet-buttons')) {
  customElements.define('e-scroll-bullet-buttons', ScrollBulletButtonsElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-scroll-bullet-buttons': ScrollBulletButtonsElement
  }
}
