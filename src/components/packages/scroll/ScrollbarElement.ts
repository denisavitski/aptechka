import { RESIZE_ORDER } from '@packages/order'
import { windowResizer } from '@packages/window-resizer'
import { createStylesheet, isBrowser, setupDrag } from '@packages/utils'
import { elementResizer } from '@packages/element-resizer'
import { ScrollUserElement } from './ScrollUserElement'

export class ScrollbarElement extends ScrollUserElement {
  #slotElement: HTMLSlotElement = null!
  #thumbElement: HTMLElement = null!

  #isHorisontal = false

  #thumbSize = 0
  #thumbScrollSize = 0

  #position = 0

  constructor() {
    super()

    if (isBrowser) {
      const shadow = this.attachShadow({ mode: 'open' })

      shadow.adoptedStyleSheets = [
        createStylesheet({
          ':host': {
            display: 'inline-block',
            zIndex: '1',
            backgroundColor: '#ebebeb',
          },

          ':host([axis="y"])': {
            position: 'absolute',
            right: '0',
            top: '0',
            width: '1vmin',
            height: '100%',
          },

          ':host([axis="x"])': {
            position: 'absolute',
            left: '0',
            bottom: '0',
            width: '100%',
            height: '1vmin',
          },

          '.default-thumb': {
            backgroundColor: 'var(--thumb-color, black)',
            borderRadius: 'var(--thumb-radius, 0px)',
            touchAction: 'none',
          },

          '::slotted(*)': {
            touchAction: 'none',
          },
        }),
      ]

      this.#slotElement = document.createElement('slot')
      this.#slotElement.innerHTML = `<div class="default-thumb"></div>`

      shadow.appendChild(this.#slotElement)
    }
  }

  public get thumbElement() {
    return this.#thumbElement
  }

  protected override connectedCallback() {
    super.connectedCallback()

    this.setAttribute('drag-dead-zone', '')

    const slottedThumb = (this.#slotElement.assignedElements()[0] ||
      this.#slotElement.firstElementChild) as HTMLElement

    this.#thumbElement = slottedThumb

    this.#thumbElement.addEventListener('pointerdown', this.#grabListener)

    windowResizer.subscribe(this.#resizeListener, RESIZE_ORDER.SCROLL)
    elementResizer.subscribe(this, this.#resizeListener)
    elementResizer.subscribe(this.scrollElement, this.#resizeListener)

    this.scrollElement.onScroll(this.#scrollListener)

    this.scrollElement.axisCSSProperty.subscribe(this.#axisListener)
  }

  protected disconnectedCallback() {
    this.removeAttribute('drag-dead-zone')
    this.style.display = ''

    this.#thumbElement.removeEventListener('pointerdown', this.#grabListener)

    windowResizer.unsubscribe(this.#resizeListener)
    elementResizer.unsubscribe(this.#resizeListener)

    this.scrollElement.offScroll(this.#scrollListener)

    this.scrollElement.axisCSSProperty.unsubscribe(this.#axisListener)
  }

  #resizeListener = () => {
    this.#isHorisontal = this.offsetWidth > this.offsetHeight

    const barSize = this.#isHorisontal ? this.offsetWidth : this.offsetHeight

    this.#thumbSize =
      barSize /
      ((this.scrollElement.scrollSize + this.scrollElement.viewportSize) /
        barSize)

    this.#thumbSize = Math.max(this.#thumbSize, 30)

    if (this.#isHorisontal) {
      this.#thumbElement.style.width = this.#thumbSize + 'px'
      this.#thumbElement.style.height = '100%'
    } else {
      this.#thumbElement.style.width = '100%'
      this.#thumbElement.style.height = this.#thumbSize + 'px'
    }

    this.#thumbScrollSize = barSize - this.#thumbSize

    if (this.scrollElement.scrollSize <= 0) {
      this.style.display = 'none'
    } else {
      this.style.display = ''
    }

    this.#scrollListener()
  }

  #scrollListener = () => {
    this.#position = this.scrollElement.currentProgress * this.#thumbScrollSize

    if (this.#isHorisontal) {
      this.#thumbElement.style.transform = `translate3d(${
        this.#position
      }px, 0px, 0px)`
    } else {
      this.#thumbElement.style.transform = `translate3d(0px, ${
        this.#position
      }px, 0px)`
    }
  }

  #axisListener = () => {
    this.setAttribute('axis', this.scrollElement.axisCSSProperty.current)
  }

  #grabListener = (grabEvent: PointerEvent) => {
    document.documentElement.classList.add('grabbing')

    setupDrag(
      (moveEvent: PointerEvent) => {
        const moveCursor = this.#isHorisontal ? moveEvent.x : moveEvent.y

        const mult = this.scrollElement.distance / this.#thumbScrollSize
        const delta = (moveCursor - grabCursor) * mult

        this.scrollElement.setPosition(startValue + delta)
      },
      () => {
        document.documentElement.classList.remove('grabbing')
      }
    )

    const startValue = this.scrollElement.damped.target
    const grabCursor = this.#isHorisontal ? grabEvent.x : grabEvent.y
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
