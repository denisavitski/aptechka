import { CSSProperty } from '@packages/css-property'
import { intersector } from '@packages/intersector'
import { loopNumber } from '@packages/utils'

export class BillboardElement extends HTMLElement {
  #delay = new CSSProperty(this, '--delay', '2s')
  #intervalId: ReturnType<typeof setInterval> | undefined
  #isIntersecting = false
  #itemElements: Array<HTMLElement> = []
  #counter = 0

  public set(value: number) {
    this.#updateCounter(value)
    this.#clearAndSpawnInterval()
  }

  public shift(value: number) {
    this.set(this.#counter + value)
  }

  protected connectedCallback() {
    this.#itemElements = [
      ...this.querySelectorAll<HTMLElement>('[data-billboard-item]'),
    ]

    this.#itemElements[0]?.classList.add('current')

    this.#delay.subscribe(() => {
      this.#clearAndSpawnInterval()
    })

    this.#delay.observe()

    intersector.subscribe(this, this.#intersectionListener)
  }

  protected disconnectedCallback() {
    this.#delay.unobserve()

    intersector.unsubscribe(this.#intersectionListener)
    clearInterval(this.#intervalId)
  }

  #intersectionListener = (e: IntersectionObserverEntry) => {
    this.#isIntersecting = e.isIntersecting

    if (this.#isIntersecting) {
      this.#clearAndSpawnInterval()
    } else {
      clearInterval(this.#intervalId)
    }
  }

  #clearAndSpawnInterval = () => {
    clearInterval(this.#intervalId)

    if (this.#isIntersecting) {
      this.#intervalId = setInterval(
        this.#tick,
        parseFloat(this.#delay.current || '0') * 1000
      )
    }
  }

  #updateCounter(value: number) {
    this.#counter = loopNumber(value, this.#itemElements.length)

    this.#itemElements.forEach((itemElement, i) => {
      if (i === this.#counter) {
        itemElement.classList.add('current')
      } else {
        itemElement.classList.remove('current')
      }
    })
  }

  #tick = () => {
    this.#updateCounter(this.#counter + 1)
  }
}

if (!customElements.get('e-billboard')) {
  customElements.define('e-billboard', BillboardElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-billboard': BillboardElement
  }
}
