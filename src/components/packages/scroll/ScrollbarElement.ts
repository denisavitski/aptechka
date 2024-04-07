import { define } from '@packages/custom-element'
import { RESIZE_ORDER } from '@packages/order'
import { windowResizer } from '@packages/window-resizer'
import { isBrowser } from '@packages/utils'
import { ScrollUserElement } from './ScrollUserElement'
import {
  createStylesheet,
  div,
  element,
  slot,
} from '@packages/element-constructor'
import { aptechkaTheme } from '@packages/theme'

const stylesheet = createStylesheet({
  ':host': {
    display: 'inline-block',
    zIndex: '1',
    backgroundColor: aptechkaTheme.colorLight.var,
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
    backgroundColor: aptechkaTheme.colorDark.var,
    borderRadius: '1vmin',
    touchAction: 'none',
  },

  '::slotted(*)': {
    touchAction: 'none',
  },
})

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
      this.openShadow(stylesheet)

      element(this, {
        slot: 'static',
        children: [
          slot({
            ref: (e) => (this.#slotElement = e),
            children: div({ class: 'default-thumb' }),
          }),
        ],
      })
    }
  }

  public get thumbElement() {
    return this.#thumbElement
  }

  protected override connectedCallback() {
    super.connectedCallback()

    const slottedThumb = (this.#slotElement.assignedElements()[0] ||
      this.#slotElement.firstElementChild) as HTMLElement

    this.#thumbElement = slottedThumb

    this.#thumbElement.addEventListener('pointerdown', this.#grabListener)

    windowResizer.subscribe(this.#resizeListener, RESIZE_ORDER.SCROLL + 1)

    this.scrollElement.onScroll(this.#scrollListener)

    this.scrollElement.axisAttibute.subscribe(this.#axisListener)
  }

  protected disconnectedCallback() {
    this.#thumbElement.removeEventListener('pointerdown', this.#grabListener)

    windowResizer.unsubscribe(this.#resizeListener)

    this.scrollElement.offScroll(this.#scrollListener)

    this.scrollElement.axisAttibute.unsubscribe(this.#axisListener)
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

    if (!this.scrollElement.scrollSize) {
      this.style.display = 'none'
    }
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
    this.setAttribute('axis', this.scrollElement.axisAttibute.current)
  }

  #grabListener = (grabEvent: PointerEvent) => {
    const move = (moveEvent: PointerEvent) => {
      const moveCursor = this.#isHorisontal ? moveEvent.x : moveEvent.y

      const mult = this.scrollElement.distance / this.#thumbScrollSize
      const delta = (moveCursor - grabCursor) * mult

      this.scrollElement.setPosition(startValue + delta)
    }

    const drop = () => {
      removeEventListener('pointermove', move)
      removeEventListener('pointerup', drop)
      removeEventListener('touchend', drop)
    }

    addEventListener('pointermove', move)
    addEventListener('pointerup', drop)
    addEventListener('touchend', drop)

    const startValue = this.scrollElement.targetScrollValue
    const grabCursor = this.#isHorisontal ? grabEvent.x : grabEvent.y
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-scrollbar': ScrollbarElement
  }
}
