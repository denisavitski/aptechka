import { CSSProperty } from '@packages/css-property'
import { intersector } from '@packages/intersector'
import { dispatchEvent, loopNumber } from '@packages/utils'

export interface BillboardEvents {
  billboardChange: CustomEvent<{
    counter: number
  }>
}

export class BillboardElement extends HTMLElement {
  #autoplay = new CSSProperty<string | false>(this, '--autoplay', false)
  #intervalId: ReturnType<typeof setInterval> | undefined
  #isIntersecting = false
  #itemElements: Array<HTMLElement> = []
  #counter = 0

  public get counter() {
    return this.#counter
  }

  public get itemElements() {
    return this.#itemElements
  }

  public addItem(element: HTMLElement) {
    this.#itemElements.push(element)
    this.#checkLength()
  }

  public set(value: number) {
    this.#updateCounter(value)
    this.#tryAutoplay()
  }

  public shift(value: number) {
    this.set(this.#counter + value)
  }

  protected connectedCallback() {
    this.#itemElements = [
      ...this.querySelectorAll<HTMLElement>('[data-billboard-item]'),
    ]

    this.#itemElements[0]?.classList.add('current')

    this.#checkLength()

    this.#autoplay.subscribe((e) => {
      if (e.current) {
        intersector.subscribe(this, this.#intersectionListener)
        this.#tryAutoplay()
      } else {
        this.#isIntersecting = true
        intersector.unsubscribe(this.#intersectionListener)
        clearInterval(this.#intervalId)
        this.#updateCounter(0)
      }
    })

    this.#autoplay.observe()
  }

  protected disconnectedCallback() {
    this.#autoplay.unobserve()

    intersector.unsubscribe(this.#intersectionListener)
    clearInterval(this.#intervalId)
  }

  #checkLength() {
    if (this.#itemElements.length > 1) {
      this.classList.add('has-length')
    } else {
      this.classList.remove('has-length')
    }
  }

  #tryAutoplay() {
    if (this.#autoplay.current !== false) {
      this.#clearAndSpawnInterval()
    }
  }

  #intersectionListener = (e: IntersectionObserverEntry) => {
    this.#isIntersecting = e.isIntersecting

    if (this.#isIntersecting) {
      this.#tryAutoplay()
    } else {
      clearInterval(this.#intervalId)
    }
  }

  #clearAndSpawnInterval = () => {
    clearInterval(this.#intervalId)

    if (this.#isIntersecting) {
      this.#intervalId = setInterval(
        this.#tick,
        parseFloat(this.#autoplay.current || '0') * 1000
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

    dispatchEvent(this, 'billboardChange', {
      detail: {
        counter: this.#counter,
      },
    })

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
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
  interface HTMLElementEventMap extends BillboardEvents {}
}
