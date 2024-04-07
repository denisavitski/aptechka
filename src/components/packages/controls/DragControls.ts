import {
  isBrowser,
  getElement,
  Axes2D,
  setupDrag,
  preciseNumber,
} from '@packages/utils'
import { Controls } from './Controls'
import { ticker } from '@packages/ticker'
import { TICK_ORDER } from '@packages/order'

export interface DragControlsOptions {
  element?: HTMLElement
  axis?: Axes2D
  swipe?: boolean
}

export class DragControls extends Controls {
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
    if (!this.swipe) {
      ticker.unsubscribe(this.#tickListener)
    }

    let prev = grabEvent
    this.#delta = 0

    setupDrag(
      (moveEvent) => {
        if (this.#swiped) {
          return
        }

        if (this.swipe) {
          this.#swiped = true
        }

        if (this.axis === 'x') {
          this.#delta = prev.x - moveEvent.x
        } else {
          this.#delta = prev.y - moveEvent.y
        }

        prev = moveEvent

        this.changeEvent.notify('drag', this.#delta)
      },
      () => {
        this.#delta = this.#delta * 3

        if (!this.swipe) {
          ticker.subscribe(this.#tickListener, { order: TICK_ORDER.SCROLL - 1 })
        }

        this.#swiped = false
      }
    )
  }

  #tickListener = () => {
    if (!this.#delta) {
      ticker.unsubscribe(this.#tickListener)
    }

    this.#delta *= 0.95
    this.#delta = preciseNumber(this.#delta, 3)
    this.changeEvent.notify('drag', this.#delta)
  }
}
