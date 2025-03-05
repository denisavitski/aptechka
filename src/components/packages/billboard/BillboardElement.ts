import { CSSProperty } from '@packages/css-property'
import { intersector } from '@packages/intersector'
import {
  Axes2D,
  clamp,
  dispatchEvent,
  loopNumber,
  setupDrag,
} from '@packages/utils'

export interface BillboardEvents {
  billboardChange: CustomEvent<{
    counter: number
  }>
}

export class BillboardElement extends HTMLElement {
  public handleSet: ((number: number) => boolean) | undefined

  #resize = new CSSProperty<boolean>(this, '--resize', true)
  #loop = new CSSProperty<boolean>(this, '--loop', true)
  #autoplay = new CSSProperty<string | false>(this, '--autoplay', false)
  #swipe = new CSSProperty<Axes2D | false>(this, '--swipe', 'x')
  #intervalId: ReturnType<typeof setInterval> | undefined
  #isIntersecting = false
  #itemElements: Array<HTMLElement> = []
  #counter = 0

  public get counter() {
    return this.#counter
  }

  public get loop() {
    return this.#loop
  }

  public get autoplay() {
    return this.#autoplay
  }

  public get swipe() {
    return this.#swipe
  }

  public get itemElements() {
    return this.#itemElements
  }

  public addItem(element: HTMLElement) {
    this.#itemElements.push(element)
    this.#updateCounter()
  }

  public set(value: number) {
    if (!this.handleSet || this.handleSet(value)) {
      this.#updateCounter(value)
      this.#tryAutoplay()
    }
  }

  public shift(value: number) {
    this.set(this.#counter + value)
  }

  protected connectedCallback() {
    this.#itemElements = [
      ...this.querySelectorAll<HTMLElement>(
        `[data-billboard-item${this.id ? `="${this.id}"` : ''}]`
      ),
    ]

    this.#itemElements[0]?.classList.add('current')

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
    this.#swipe.observe()
    this.#loop.observe()
    this.#resize.observe()

    this.#updateCounter(0)

    this.addEventListener('pointerdown', this.#pointerDownListener)
  }

  protected disconnectedCallback() {
    this.#autoplay.unobserve()
    this.#swipe.unobserve()
    this.#loop.unobserve()
    this.#resize.unobserve()

    intersector.unsubscribe(this.#intersectionListener)
    clearInterval(this.#intervalId)
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

  #updateCounter(value = this.#counter) {
    const prev = this.#counter

    if (this.#loop.current) {
      this.#counter = loopNumber(value, this.#itemElements.length)
    } else {
      this.#counter = clamp(value, 0, this.#itemElements.length - 1)
    }

    this.classList.remove('forward', 'backward')

    if (this.#counter - prev >= 0) {
      this.classList.add('forward')
    } else if (this.#counter - prev < 0) {
      this.classList.add('backward')
    }

    this.#itemElements.forEach((itemElement, i) => {
      itemElement.classList.remove('current', 'previous', 'next')

      if (i === this.#counter) {
        itemElement.classList.add('current')
      } else if (i < this.#counter) {
        itemElement.classList.add('previous')
      } else if (i > this.#counter) {
        itemElement.classList.add('next')
      }
    })

    this.classList.toggle('has-length', this.#itemElements.length > 1)

    this.classList.toggle('start', this.#counter === 0)

    this.classList.toggle(
      'end',
      this.#counter === this.#itemElements.length - 1
    )

    this.style.setProperty('--counter', this.#counter.toString())
    this.style.setProperty('--sections', this.#itemElements.length.toString())

    if (this.#counter !== prev) {
      dispatchEvent(this, 'billboardChange', {
        detail: {
          counter: this.#counter,
        },
      })

      if (this.#resize.current) {
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'))
        }, 0)
      }
    }
  }

  #tick = () => {
    this.#updateCounter(this.#counter + 1)
  }

  #pointerDownListener = (e: PointerEvent) => {
    if (!this.#swipe.current) {
      return
    }

    let dir = 0

    setupDrag(
      (moveEvent) => {
        const dx = e.x - moveEvent.x
        const dy = e.y - moveEvent.y

        if (this.#swipe.current === 'x') {
          if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
            dir = Math.sign(dx)
          }
        } else if (this.#swipe.current === 'y') {
          if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 10) {
            dir = Math.sign(dy)
          }
        }
      },
      () => {
        if (dir) {
          this.shift(dir)
        }
      }
    )
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
