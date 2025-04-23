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
  #groups: Map<string, Array<HTMLElement>> = new Map()
  #counter = 0
  #length = 0

  public get counter() {
    return this.#counter
  }

  public get loop() {
    return this.#loop
  }

  public get autoplay() {
    return this.#autoplay
  }

  public get autoplayDuration() {
    return parseFloat(this.#autoplay.current || '0') * 1000
  }

  public get swipe() {
    return this.#swipe
  }

  public get itemElements() {
    return this.#itemElements
  }

  public get groups() {
    return this.#groups
  }

  public get length() {
    return this.#length
  }

  public addItem(element: HTMLElement) {
    this.#addElement(element)
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

  public updateItemClasses(itemElement: HTMLElement, index: number) {
    itemElement.classList.remove(
      'current',
      'previous',
      'next',
      'previous-sibling',
      'next-sibling'
    )

    if (index === this.#counter) {
      itemElement.classList.add('current')
    } else if (index < this.#counter) {
      itemElement.classList.add('previous')
    } else if (index > this.#counter) {
      itemElement.classList.add('next')
    }

    if (index === loopNumber(this.#counter - 1, this.length)) {
      itemElement.classList.add('previous-sibling')
    } else if (index === (this.#counter + 1) % this.length) {
      itemElement.classList.add('next-sibling')
    }
  }

  protected connectedCallback() {
    const itemElements = [
      ...this.querySelectorAll<HTMLElement>(
        `[data-billboard-item${this.id ? `="${this.id}"` : ''}]`
      ),
    ]

    itemElements.forEach((el) => {
      this.#addElement(el)
    })

    this.#groups.forEach((g) => {
      g[0]?.classList.add('current')
    })

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

    this.#groups.clear()

    intersector.unsubscribe(this.#intersectionListener)
    clearInterval(this.#intervalId)
  }

  #addElement(element: HTMLElement) {
    this.#itemElements.push(element)
    const groupName =
      element.getAttribute('data-billboard-item-group') || 'default'

    let group = this.#groups.get(groupName)

    if (!group) {
      group = []
      this.#groups.set(groupName, group)
    }

    group.push(element)

    this.#length = 0

    this.#groups.forEach((g) => {
      if (g.length > this.#length) {
        this.#length = g.length
      }
    })
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
      this.#intervalId = setInterval(this.#tick, this.autoplayDuration)
    }
  }

  async #updateCounter(value = this.#counter) {
    const prev = this.#counter

    if (this.#loop.current) {
      this.#counter = loopNumber(value, this.#length)
    } else {
      this.#counter = clamp(value, 0, this.#length - 1)
    }

    this.classList.remove('forward', 'backward', 'next-round', 'prev-round')

    if (this.#counter - prev >= 0) {
      this.classList.add('forward')
    } else if (this.#counter - prev < 0) {
      this.classList.add('backward')
    }

    let waits: Array<Promise<void>> = []

    this.#groups.forEach((group) => {
      group.forEach((itemElement, i) => {
        if (this.hasAttribute('visited-class')) {
          const visited = itemElement.classList.contains('visited')

          if (i === this.#counter && !visited) {
            itemElement.classList.add('visited')

            waits.push(
              new Promise((res) => {
                setTimeout(() => {
                  this.updateItemClasses(itemElement, i)
                  res()
                }, 10)
              })
            )
          } else {
            this.updateItemClasses(itemElement, i)
          }
        } else {
          this.updateItemClasses(itemElement, i)
        }
      })
    })

    if (waits.length) {
      await Promise.all(waits)
    }

    this.classList.toggle('has-length', this.#length > 1)

    this.classList.toggle('start', this.#counter === 0)

    this.classList.toggle('end', this.#counter === this.#length - 1)

    this.style.setProperty('--counter', this.#counter.toString())
    this.style.setProperty('--sections', this.#length.toString())

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

    setTimeout(() => {
      this.classList.remove('next-round', 'prev-round')
    }, 10)
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
