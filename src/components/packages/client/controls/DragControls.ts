import {
  isBrowser,
  getElement,
  Axes2D,
  setupDrag,
  preciseNumber,
} from '@packages/client/utils'
import { Controls } from './Controls'
import { ticker } from '@packages/client/ticker'
import { TICK_ORDER } from '@packages/client/order'

export interface DragControlsOptions {
  element?: HTMLElement
  axis?: Axes2D
  swipe?: boolean
}

export class DragControls extends Controls {
  static #currentElement: HTMLElement | null = null

  public axis: Axes2D
  public swipe: boolean

  #element: HTMLElement = null!
  #swiped = false
  #delta = 0

  constructor(options?: DragControlsOptions) {
    super()

    this.axis = options?.axis || 'y'
    this.swipe = options?.swipe || false

    if (isBrowser) {
      this.#element = options?.element
        ? getElement(options.element) || document.documentElement
        : document.documentElement
    }
  }

  public connect() {
    if (isBrowser) {
      this.#element.addEventListener('pointerdown', this.#pointerdownListener)
    }
  }

  public disconnect() {
    if (isBrowser) {
      this.#element.removeEventListener(
        'pointerdown',
        this.#pointerdownListener
      )
      ticker.unsubscribe(this.#tickListener)
    }
  }

  #pointerdownListener = (grabEvent: PointerEvent) => {
    if (
      grabEvent
        .composedPath()
        .find(
          (p) => p instanceof HTMLElement && p.hasAttribute('drag-dead-zone')
        )
    ) {
      return
    }

    if (!this.swipe) {
      ticker.unsubscribe(this.#tickListener)
    }

    let prev = grabEvent
    this.#delta = 0

    document.documentElement.classList.add('grabbing')

    setupDrag(
      (moveEvent) => {
        if (
          this.#swiped ||
          (DragControls.#currentElement &&
            DragControls.#currentElement !== this.#element)
        ) {
          return
        }

        if (this.swipe) {
          this.#swiped = true
        }

        const dx = prev.x - moveEvent.x
        const dy = prev.y - moveEvent.y

        if (this.axis === 'x') {
          this.#delta = dx
        } else {
          this.#delta = dy
        }

        prev = moveEvent

        if (
          (this.axis === 'x' && Math.abs(dx) > Math.abs(dy)) ||
          (this.axis === 'y' && Math.abs(dy) > Math.abs(dx))
        ) {
          DragControls.#currentElement = this.#element
          this.changeEvent.notify('drag', this.#delta)
        }
      },
      () => {
        DragControls.#currentElement = null

        if (!this.swipe) {
          this.#delta = this.#delta * 3
          ticker.subscribe(this.#tickListener, { order: TICK_ORDER.SCROLL - 1 })
        }

        document.documentElement.classList.remove('grabbing')

        this.#swiped = false
      }
    )
  }

  #tickListener = () => {
    if (!Math.floor(this.#delta)) {
      ticker.unsubscribe(this.#tickListener)
    }

    this.#delta *= 0.95
    this.#delta = preciseNumber(this.#delta, 3)

    this.changeEvent.notify('drag', this.#delta)
  }
}
