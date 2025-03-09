import { findScrollParentElement, isBrowser, setupDrag } from '@packages/utils'
import { ticker } from '@packages/ticker'
import { intersector } from '@packages/intersector'

export class CustomScrollbarElement extends HTMLElement {
  #scrollElement: HTMLElement = null!
  #thumbElement: HTMLElement = null!
  #thumbScrollSize = 0
  #limit = 0
  #isHorizontal: boolean = false

  #activeTimeoutId: ReturnType<typeof setTimeout> | undefined

  protected connectedCallback() {
    const scrollSelector = this.getAttribute('data-scroll')

    this.#isHorizontal = this.getAttribute('orientation') === 'horizontal'

    let scrollElement: HTMLElement | null = null

    if (scrollSelector) {
      if (scrollSelector === 'parent') {
        scrollElement = this.parentElement
      } else {
        scrollElement = document.querySelector(scrollSelector)
      }
    }

    if (!scrollElement) {
      scrollElement = findScrollParentElement(this)
    }

    const thumbElement = this.querySelector<HTMLElement>('[data-thumb]')

    if (scrollElement && thumbElement) {
      this.#scrollElement = scrollElement
      this.#thumbElement = thumbElement

      this.#scrollElement.addEventListener('scroll', this.#scrollListener)
      this.#thumbElement.addEventListener('pointerdown', this.#grabListener)

      intersector.subscribe(this.parentElement!, this.#intersectionListener)
    }
  }

  protected disconnectedCallback() {
    this.#scrollElement.removeEventListener('scroll', this.#scrollListener)
    this.#thumbElement.removeEventListener('pointerdown', this.#grabListener)

    clearTimeout(this.#activeTimeoutId)

    intersector.unsubscribe(this.#intersectionListener)
    ticker.unsubscribe(this.#tickListener)
  }

  #scrollListener = () => {
    this.classList.add('active')

    clearTimeout(this.#activeTimeoutId)

    const scrollPosition = this.#isHorizontal
      ? this.#scrollElement.scrollLeft
      : this.#scrollElement.scrollTop

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

    this.#limit = this.#isHorizontal
      ? this.#scrollElement.scrollWidth - this.#scrollElement.offsetWidth
      : this.#scrollElement.scrollHeight - this.#scrollElement.offsetHeight

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

    if (
      (this.#isHorizontal &&
        !(this.#scrollElement.scrollWidth > this.#scrollElement.offsetWidth)) ||
      (!this.#isHorizontal &&
        !(this.#scrollElement.scrollHeight > this.#scrollElement.offsetHeight))
    ) {
      this.style.display = 'none'
    } else {
      this.style.display = 'block'
    }
  }

  #grabListener = (grabEvent: PointerEvent) => {
    document.documentElement.classList.add('grabbing')

    const startValue = this.#isHorizontal
      ? this.#scrollElement.scrollLeft
      : this.#scrollElement.scrollTop
    const grabCursor = this.#isHorizontal ? grabEvent.x : grabEvent.y

    setupDrag(
      (moveEvent: PointerEvent) => {
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
      },
      () => {
        document.documentElement.classList.remove('grabbing')
      }
    )
  }

  #tickListener = () => {
    this.#resizeListener()
  }

  #intersectionListener = (e: IntersectionObserverEntry) => {
    if (e.isIntersecting) {
      ticker.subscribe(this.#tickListener, { maxFPS: 5 })
    } else {
      ticker.unsubscribe(this.#tickListener)
    }
  }
}

if (isBrowser && !customElements.get('e-custom-scrollbar')) {
  customElements.define('e-custom-scrollbar', CustomScrollbarElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-custom-scrollbar': CustomScrollbarElement
  }
}
