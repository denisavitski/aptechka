import { define } from '@packages/custom-element'
import { RESIZE_ORDER } from '@packages/order'
import { resizer } from '@packages/resizer'
import { isBrowser } from '@packages/utils'
import { ScrollUserElement } from './ScrollUserElement'

@define('e-scrollbar')
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
      const root = this.attachShadow({ mode: 'open' })

      const styleElement = document.createElement('style')
      styleElement.textContent = `
        :host {
          display: inline-block;
          z-index: 1;
          background-color: #efefef;
        }

        :host([axis="y"]) {
          position: absolute;
          right: 0;
          top: 0;
          width: 1vmin;
          height: 100%;
        }

        :host([axis="x"]) {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1vmin;
        }

        .default-thumb {
          background-color: #181818;
          border-radius: 1vmin;
          touch-action: none;
        }

        ::slotted(*) {
          touch-action: none;
        }
      `
      root.appendChild(styleElement)

      this.#slotElement = document.createElement('slot')
      root.appendChild(this.#slotElement)
    }
  }

  public get thumbElement() {
    return this.#thumbElement
  }

  protected override connectedCallback() {
    super.connectedCallback()

    const slottedThumb = this.#slotElement.assignedElements()[0]

    if (slottedThumb instanceof HTMLElement) {
      this.#thumbElement = slottedThumb
    } else {
      this.#thumbElement = document.createElement('div')
      this.#thumbElement.classList.add('default-thumb')
      this.shadowRoot!.appendChild(this.#thumbElement)
    }

    this.#thumbElement.addEventListener('pointerdown', this.#grabListener)

    resizer.subscribe(this.#resizeListener, RESIZE_ORDER.SCROLL + 1)

    this.scrollElement.damped.subscribe(this.#scrollListener)

    this.scrollElement.axisAttibute.subscribe(this.#axisListener)
  }

  protected disconnectedCallback() {
    this.#thumbElement.removeEventListener('pointerdown', this.#grabListener)

    resizer.unsubscribe(this.#resizeListener)

    this.scrollElement.damped.unsubscribe(this.#scrollListener)

    this.scrollElement.axisAttibute.unsubscribe(this.#axisListener)
  }

  #resizeListener = () => {
    this.#isHorisontal = this.offsetWidth > this.offsetHeight

    const barSize = this.#isHorisontal ? this.offsetWidth : this.offsetHeight

    this.#thumbSize =
      barSize / ((this.scrollElement.scrollSize + this.scrollElement.viewportSize) / barSize)

    this.#thumbSize = Math.max(this.#thumbSize, 30)

    if (this.#isHorisontal) {
      this.#thumbElement.style.width = this.#thumbSize + 'px'
      this.#thumbElement.style.height = '100%'
    } else {
      this.#thumbElement.style.width = '100%'
      this.#thumbElement.style.height = this.#thumbSize + 'px'
    }

    this.#thumbScrollSize = barSize - this.#thumbSize

    if (!this.scrollElement.scrollSize) {
      this.style.display = 'none'
    }
  }

  #scrollListener = () => {
    this.#position = this.scrollElement.currentProgress * this.#thumbScrollSize

    if (this.#isHorisontal) {
      this.#thumbElement.style.transform = `translate3d(${this.#position}px, 0px, 0px)`
    } else {
      this.#thumbElement.style.transform = `translate3d(0px, ${this.#position}px, 0px)`
    }
  }

  #axisListener = () => {
    this.setAttribute('axis', this.scrollElement.axisAttibute.current)
  }

  #grabListener = (grabEvent: PointerEvent) => {
    const move = (moveEvent: PointerEvent) => {
      const moveCursor = this.#isHorisontal ? moveEvent.x : moveEvent.y

      const mult = this.scrollElement.distance / this.#thumbScrollSize
      const delta = (moveCursor - grabCursor) * mult

      this.scrollElement.damped.set(startValue + delta)
    }

    const drop = () => {
      removeEventListener('pointermove', move)
      removeEventListener('pointerup', drop)
      removeEventListener('touchend', drop)
    }

    addEventListener('pointermove', move)
    addEventListener('pointerup', drop)
    addEventListener('touchend', drop)

    const startValue = this.scrollElement.damped.target
    const grabCursor = this.#isHorisontal ? grabEvent.x : grabEvent.y
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-scrollbar': ScrollbarElement
  }
}
