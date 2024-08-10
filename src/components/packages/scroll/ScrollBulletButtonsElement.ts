import { debounce } from '@packages/utils'
import { ScrollBehaviour, ScrollElement } from './ScrollElement'
import { ScrollUserElement } from './ScrollUserElement'

class BulletButton {
  #element: HTMLButtonElement
  #scrollElement: ScrollElement
  #index: number
  #behaviour: ScrollBehaviour

  constructor(
    scrollElement: ScrollElement,
    index: number,
    behaviour: ScrollBehaviour
  ) {
    this.#element = document.createElement('button')
    this.#scrollElement = scrollElement
    this.#behaviour = behaviour
    this.#index = index

    this.#element.addEventListener('click', this.#clickListener)
    this.#scrollElement.counter.subscribe(this.#counterChangeListener)
    this.#counterChangeListener()
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
  #buttons: Array<BulletButton> = []

  protected override connectedCallback() {
    super.connectedCallback()

    this.scrollElement.addEventListener(
      'sectionsChange',
      this.#sectionsChangeListener
    )

    this.#sectionsChangeListener()
  }

  protected disconnectedCallback() {
    this.scrollElement.removeEventListener(
      'sectionsChange',
      this.#sectionsChangeListener
    )

    this.#buttons.forEach((b) => b.destroy())
    this.#buttons = []
  }

  #sectionsChangeListener = debounce(() => {
    this.#buttons.forEach((b) => b.destroy())

    this.#buttons = []

    for (let index = 0; index < this.scrollElement.sections.length; index++) {
      const button = new BulletButton(
        this.scrollElement,
        index,
        (this.getAttribute('behaviour') as ScrollBehaviour) || 'smooth'
      )

      this.appendChild(button.element)

      this.#buttons.push(button)
    }
  }, 0)
}

if (!customElements.get('e-scroll-bullet-buttons')) {
  customElements.define('e-scroll-bullet-buttons', ScrollBulletButtonsElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-scroll-bullet-buttons': ScrollBulletButtonsElement
  }
}
