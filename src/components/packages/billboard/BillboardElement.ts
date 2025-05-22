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

export class BillboardItem {
  public element: HTMLElement
  #parent: BillboardElement
  #raf: number | null = null
  #wasCurrent = false

  constructor(element: HTMLElement, parent: BillboardElement) {
    this.element = element
    this.#parent = parent
  }

  public destroy() {
    this.#clearTimeout()
  }

  public updateClasses(index: number) {
    const isCurrent = index === this.#parent.counter

    if (this.#wasCurrent && !isCurrent) {
      this.element.classList.add('was-current')
    } else {
      this.element.classList.remove('was-current')
    }

    const isActive = this.element.classList.contains('current-active')

    this.#clearClasses()
    this.#clearTimeout()

    if (isActive) {
      this.element.classList.add('previous-active')
    }

    if (index === this.#parent.counter) {
      this.#setCurrent()
    } else if (index < this.#parent.counter) {
      this.element.classList.add('previous')
    } else {
      this.element.classList.add('next')
    }

    this.#setSiblingClasses(index)
  }

  #setCurrent() {
    this.#wasCurrent = true

    this.element.classList.add('current')

    this.#raf = requestAnimationFrame(() => {
      this.element.classList.add('current-active')
    })
  }

  #setSiblingClasses(index: number) {
    if (index === loopNumber(this.#parent.counter - 1, this.#parent.length)) {
      this.element.classList.add('previous-sibling')
    } else if (index === (this.#parent.counter + 1) % this.#parent.length) {
      this.element.classList.add('next-sibling')
    }
  }

  #clearClasses() {
    this.element.classList.remove(
      'current',
      'previous',
      'next',
      'previous-sibling',
      'next-sibling',
      'current-active',
      'previous-active'
    )
  }

  #clearTimeout() {
    if (this.#raf) {
      cancelAnimationFrame(this.#raf)
      this.#raf = null
    }
  }
}

export class BillboardElement extends HTMLElement {
  public handleSet: ((number: number) => boolean) | undefined

  #resize = new CSSProperty<boolean>(this, '--resize', true)
  #loop = new CSSProperty<boolean>(this, '--loop', true)
  #autoplay = new CSSProperty<string | false>(this, '--autoplay', false)
  #swipe = new CSSProperty<Axes2D | false>(this, '--swipe', 'x')
  #lengthOffset = new CSSProperty<number>(this, '--length-offset', 0)
  #intervalId: ReturnType<typeof setInterval> | undefined
  #isIntersecting = false
  #items: Array<BillboardItem> = []
  #groups: Map<string, Array<BillboardItem>> = new Map()
  #counter = -1
  #length = 0
  #timeouts: Array<ReturnType<typeof setTimeout>> = []

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

  public get lengthOffset() {
    return this.#lengthOffset
  }

  public get items() {
    return this.#items
  }

  public get groups() {
    return this.#groups
  }

  public get length() {
    return this.#length
  }

  public addItem(element: HTMLElement) {
    const item = new BillboardItem(element, this)
    this.#items.push(item)

    const groupName =
      element.getAttribute('data-billboard-item-group') || 'default'
    let group = this.#groups.get(groupName)

    if (!group) {
      group = []
      this.#groups.set(groupName, group)
    }

    group.push(item)

    this.#updateLength()
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
    const itemElements = [
      ...this.querySelectorAll<HTMLElement>(
        `[data-billboard-item${this.id ? `="${this.id}"` : ''}]`
      ),
    ]

    itemElements.forEach((el) => {
      this.addItem(el)
    })

    this.#groups.forEach((g) => {
      g[0]?.element.classList.add('current')
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

    this.#lengthOffset.subscribe(() => {
      this.#updateLength()
    })

    this.#autoplay.observe()
    this.#swipe.observe()
    this.#lengthOffset.observe()
    this.#loop.observe()
    this.#resize.observe()

    this.#updateCounter(0)

    this.addEventListener('pointerdown', this.#pointerDownListener)
  }

  protected disconnectedCallback() {
    this.#autoplay.unobserve()
    this.#swipe.unobserve()
    this.#lengthOffset.unobserve()
    this.#loop.unobserve()
    this.#resize.unobserve()

    this.#items.forEach((item) => item.destroy())
    this.#items = []
    this.#groups.clear()

    intersector.unsubscribe(this.#intersectionListener)
    clearInterval(this.#intervalId)

    this.#timeouts.forEach((timeout) => {
      clearTimeout(timeout)
    })
  }

  #updateLength() {
    this.#length = 0

    this.#groups.forEach((g) => {
      if (g.length > this.#length) {
        this.#length = g.length
      }
    })

    this.#length += this.#lengthOffset.current
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

    if (prev === this.#counter) {
      return
    }

    this.#timeouts.forEach((timeout) => {
      clearTimeout(timeout)
    })

    this.classList.remove('forward', 'backward', 'next-round', 'prev-round')

    if (this.#counter - prev >= 0) {
      this.classList.add('forward')
    } else if (this.#counter - prev < 0) {
      this.classList.add('backward')
    }

    this.#groups.forEach((group) => {
      group.forEach((item, i) => {
        item.updateClasses(i)
      })
    })

    this.classList.toggle('has-length', this.#length > 1)
    this.classList.toggle('start', this.#counter === 0)
    this.classList.toggle('end', this.#counter === this.#length - 1)

    this.style.setProperty('--counter', this.#counter.toString())
    this.style.setProperty('--sections', this.#length.toString())

    dispatchEvent(this, 'billboardChange', {
      detail: {
        counter: this.#counter,
      },
    })

    if (this.#resize.current) {
      this.#timeouts.push(
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'))
        }, 0)
      )
    }

    this.#timeouts.push(
      setTimeout(() => {
        this.classList.remove('next-round', 'prev-round')
      }, 10)
    )
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
