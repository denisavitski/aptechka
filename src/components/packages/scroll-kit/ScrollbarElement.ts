import { intersector } from '@packages/intersector'
import { ticker } from '@packages/ticker'
import { findScrollParentElement, isBrowser, setupDrag } from '@packages/utils'

export class ScrollbarElement extends HTMLElement {
  #scrollElement: HTMLElement | Window = null!
  #thumbElement: HTMLElement = null!
  #thumbScrollSize = 0
  #limit = 0
  #isHorizontal: boolean = false

  #activeTimeoutId: ReturnType<typeof setTimeout> | undefined

  protected connectedCallback() {
    const scrollSelector = this.getAttribute('data-scroll')

    let scrollElement: HTMLElement | Window | null = null

    if (scrollSelector) {
      if (scrollSelector === 'parent') {
        scrollElement = this.parentElement
      } else {
        scrollElement = document.querySelector<HTMLElement>(scrollSelector)
      }
    }

    if (!scrollElement) {
      scrollElement = findScrollParentElement(this)

      if (scrollElement === document.body) {
        scrollElement = window
      }
    }

    this.#isHorizontal = this.hasAttribute('horisontal')

    const thumbElement = this.querySelector<HTMLElement>('[data-thumb]')

    if (scrollElement && thumbElement) {
      this.#scrollElement = scrollElement
      this.#thumbElement = thumbElement

      this.#scrollElement.addEventListener('scroll', this.#scrollListener)
      this.#thumbElement.addEventListener('pointerdown', this.#grabListener)

      intersector.subscribe(
        this.parentElement === document.body ? this : this.parentElement!,
        this.#intersectionListener,
      )
    }
  }

  protected disconnectedCallback() {
    this.#scrollElement?.removeEventListener('scroll', this.#scrollListener)
    this.#thumbElement?.removeEventListener('pointerdown', this.#grabListener)

    clearTimeout(this.#activeTimeoutId)

    intersector.unsubscribe(this.#intersectionListener)
    ticker.unsubscribe(this.#tickListener)
  }

  get #scrollPosition() {
    if (this.#scrollElement instanceof HTMLElement) {
      return this.#isHorizontal
        ? this.#scrollElement.scrollLeft
        : this.#scrollElement.scrollTop
    } else {
      return this.#isHorizontal
        ? this.#scrollElement.scrollX
        : this.#scrollElement.scrollY
    }
  }

  get #scrollSize() {
    if (this.#scrollElement instanceof HTMLElement) {
      return this.#isHorizontal
        ? this.#scrollElement.scrollWidth
        : this.#scrollElement.scrollHeight
    } else {
      return this.#isHorizontal
        ? Math.max(
            document.body.scrollWidth,
            document.documentElement.scrollWidth,
            document.body.offsetWidth,
            document.documentElement.offsetWidth,
            document.body.clientWidth,
            document.documentElement.clientWidth,
          )
        : Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight,
            document.body.clientHeight,
            document.documentElement.clientHeight,
          )
    }
  }

  get #scrollViewportSize() {
    if (this.#scrollElement instanceof HTMLElement) {
      return this.#isHorizontal
        ? this.#scrollElement.offsetWidth
        : this.#scrollElement.offsetHeight
    } else {
      return this.#isHorizontal ? innerWidth : innerHeight
    }
  }

  #scrollListener = () => {
    this.classList.add('active')

    clearTimeout(this.#activeTimeoutId)

    const scrollPosition = this.#scrollPosition
    const position = (scrollPosition / this.#limit) * this.#thumbScrollSize

    if (this.#isHorizontal) {
      this.#thumbElement.style.transform = `translate3d(${position}px, 0px, 0px)`
    } else {
      this.#thumbElement.style.transform = `translate3d(0px, ${position}px, 0px)`
    }

    this.#activeTimeoutId = setTimeout(() => {
      this.classList.remove('active')
    }, 1000)
  }

  #resizeListener = () => {
    const barSize = this.#isHorizontal ? this.offsetWidth : this.offsetHeight

    const scrollSize = this.#scrollSize
    const viewportSize = this.#scrollViewportSize

    this.#limit = scrollSize - viewportSize

    let thumbSize = (barSize * barSize) / (this.#limit + barSize)

    thumbSize = Math.max(thumbSize, 30)

    if (this.#isHorizontal) {
      this.#thumbElement.style.width = thumbSize + 'px'
      this.#thumbElement.style.height = '100%'
    } else {
      this.#thumbElement.style.width = '100%'
      this.#thumbElement.style.height = thumbSize + 'px'
    }

    this.#thumbScrollSize = barSize - thumbSize

    if (scrollSize <= viewportSize) {
      this.style.display = 'none'
    } else {
      this.style.display = 'block'
    }
  }

  #grabListener = (grabEvent: PointerEvent) => {
    const startValue = this.#scrollPosition

    const grabCursor = this.#isHorizontal ? grabEvent.x : grabEvent.y

    setupDrag((moveEvent: PointerEvent) => {
      const mult = this.#limit / this.#thumbScrollSize
      const delta =
        (this.#isHorizontal
          ? moveEvent.x - grabCursor
          : moveEvent.y - grabCursor) * mult

      if (this.#isHorizontal) {
        this.#scrollElement.scroll({
          left: startValue + delta,
          behavior: 'instant',
        })
      } else {
        this.#scrollElement.scroll({
          top: startValue + delta,
          behavior: 'instant',
        })
      }
    })
  }

  #tickListener = () => {
    this.#resizeListener()
  }

  #intersectionListener = (e: IntersectionObserverEntry) => {
    if (e.isIntersecting) {
      ticker.subscribe(this.#tickListener, { maxFPS: 5 })
      this.#tickListener()
    } else {
      ticker.unsubscribe(this.#tickListener)
    }
  }
}

if (isBrowser && !customElements.get('e-scrollbar')) {
  customElements.define('e-scrollbar', ScrollbarElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-scrollbar': ScrollbarElement
  }
}
