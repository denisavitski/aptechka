import {
  isBrowser,
  getElement,
  Axes2D,
  setupDrag,
  preciseNumber,
} from '@packages/utils'
import { ticker } from '@packages/ticker'
import { TICK_ORDER } from '@packages/order'
import { Controls } from './Controls'

export interface DragControlsOptions {
  element?: HTMLElement
  axis?: Axes2D
  swipe?: boolean
}

export class DragControls extends Controls {
  static #currentElement: HTMLElement | null = null

  public axis: Axes2D
  public swipe: boolean
  public inertion = 1

  #element: HTMLElement = null!
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
    let okToNotify = false

    this.#delta = 0

    document.documentElement.classList.add('grabbing')

    let dx = 0
    let dy = 0

    setupDrag(
      (moveEvent) => {
        if (
          DragControls.#currentElement &&
          DragControls.#currentElement !== this.#element
        ) {
          return
        }

        dx = prev.x - moveEvent.x
        dy = prev.y - moveEvent.y

        if (this.axis === 'x') {
          this.#delta = dx
        } else {
          this.#delta = dy
        }

        prev = moveEvent

        okToNotify =
          (this.axis === 'x' && Math.abs(dx) > Math.abs(dy)) ||
          (this.axis === 'y' && Math.abs(dy) > Math.abs(dx))

        if (okToNotify) {
          DragControls.#currentElement = this.#element

          this.changeEvent.notify('drag', this.#delta)
        }
      },
      () => {
        DragControls.#currentElement = null

        if (okToNotify && !this.swipe && this.inertion) {
          this.#delta = this.#delta * this.inertion

          ticker.subscribe(this.#tickListener, {
            order: TICK_ORDER.CONTROLS - 1,
          })
        } else if (this.swipe) {
          this.changeEvent.notify('drag-end', this.#delta)
        }

        document.documentElement.classList.remove('grabbing')
      }
    )
  }

  #tickListener = () => {
    if (!Math.floor(Math.abs(this.#delta))) {
      ticker.unsubscribe(this.#tickListener)
    }

    this.#delta *= 0.95
    this.#delta = preciseNumber(this.#delta, 3)

    this.changeEvent.notify('drag', this.#delta)
  }
}
