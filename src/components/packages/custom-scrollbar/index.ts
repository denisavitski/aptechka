/**
 * TODO horisontal
 */

import { elementResizer } from '@packages/element-resizer'
import { windowResizer } from '@packages/window-resizer'
import { findScrollParentElement, isBrowser, setupDrag } from '@packages/utils'
import { ticker } from '@packages/ticker'

export class CustomScrollbarElement extends HTMLElement {
  #scrollElement: HTMLElement = null!
  #thumbElement: HTMLElement = null!
  #thumbScrollSize = 0
  #limit = 0

  #activeTimeoutId: ReturnType<typeof setTimeout> | undefined

  protected connectedCallback() {
    const scrollElement = findScrollParentElement(this)
    const thumbElement = this.querySelector<HTMLElement>('[data-thumb]')

    if (scrollElement && thumbElement) {
      this.#scrollElement = scrollElement
      this.#thumbElement = thumbElement

      elementResizer.subscribe(this.#scrollElement, this.#resizeListener)
      windowResizer.subscribe(this.#resizeListener)

      this.#scrollElement.addEventListener('scroll', this.#scrollListener)
      this.#thumbElement.addEventListener('pointerdown', this.#grabListener)

      ticker.subscribe(this.#tickListener, { maxFPS: 5 })
    }
  }

  protected disconnectedCallback() {
    elementResizer.unsubscribe(this.#resizeListener)
    windowResizer.unsubscribe(this.#resizeListener)

    this.#scrollElement.removeEventListener('scroll', this.#scrollListener)
    this.#thumbElement.removeEventListener('pointerdown', this.#grabListener)

    clearTimeout(this.#activeTimeoutId)

    ticker.unsubscribe(this.#tickListener)
  }

  #scrollListener = () => {
    this.classList.add('active')

    clearTimeout(this.#activeTimeoutId)

    const position =
      (this.#scrollElement.scrollTop / this.#limit) * this.#thumbScrollSize

    this.#thumbElement.style.transform = `translate3d(0px, ${position}px, 0px)`

    this.#activeTimeoutId = setTimeout(() => {
      this.classList.remove('active')
    }, 1000)
  }

  #resizeListener = () => {
    const barSize = this.offsetHeight

    this.#limit =
      this.#scrollElement.scrollHeight - this.#scrollElement.offsetHeight

    let thumbSize = barSize / (this.#limit / barSize)

    thumbSize = Math.max(thumbSize, 30)

    this.#thumbElement.style.width = '100%'
    this.#thumbElement.style.height = thumbSize + 'px'

    this.#thumbScrollSize = barSize - thumbSize

    if (
      !(this.#scrollElement.scrollHeight > this.#scrollElement.offsetHeight)
    ) {
      this.style.display = 'none'
    }
  }

  #grabListener = (grabEvent: PointerEvent) => {
    document.documentElement.classList.add('grabbing')

    setupDrag(
      (moveEvent: PointerEvent) => {
        const mult = this.#limit / this.#thumbScrollSize
        const delta = (moveEvent.y - grabCursor) * mult

        this.#scrollElement.scroll({
          top: startValue + delta,
          behavior: 'instant',
        })
      },
      () => {
        document.documentElement.classList.remove('grabbing')
      }
    )

    const startValue = this.#scrollElement.scrollTop
    const grabCursor = grabEvent.y
  }

  #tickListener = () => {
    this.#resizeListener()
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
