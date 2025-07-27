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
  rootElement?: HTMLElement
  element?: HTMLElement
  axis?: Axes2D
  swipe?: boolean
}

export class DragControls extends Controls {
  static #currentElement: HTMLElement | null = null

  public axis: Axes2D
  public swipe: boolean
  public inertion = 1

  #rootElement: HTMLElement = null!
  #element: HTMLElement = null!
  #delta = 0
  #linkElements: Array<HTMLAnchorElement> = []
  #dragDelta = 0

  constructor(options?: DragControlsOptions) {
    super()

    this.axis = options?.axis || 'y'
    this.swipe = options?.swipe || false

    if (isBrowser) {
      this.#element = options?.element
        ? getElement(options.element) || document.documentElement
        : document.documentElement
      this.#rootElement = options?.rootElement || this.#element
    }
  }

  public connect() {
    if (isBrowser) {
      this.#linkElements = [...this.#rootElement.querySelectorAll('a')]

      this.#linkElements.forEach((element) => {
        element.addEventListener('click', this.#linkClickListener)
      })

      this.#element.addEventListener('pointerdown', this.#pointerdownListener)
    }
  }

  public disconnect() {
    if (isBrowser) {
      this.#linkElements.forEach((element) => {
        element.removeEventListener('click', this.#linkClickListener)
      })

      this.#element.removeEventListener(
        'pointerdown',
        this.#pointerdownListener
      )

      ticker.unsubscribe(this.#tickListener)
    }
  }

  #linkClickListener = (e: Event) => {
    if (Math.abs(this.#dragDelta) > 2) {
      e.preventDefault()
    }
  }

  #pointerdownListener = (grabEvent: PointerEvent) => {
    this.#dragDelta = 0
    this.#delta = 0

    if (grabEvent.button !== 0) {
      return
    }

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

    document.documentElement.classList.add('grabbing')

    let dx = 0
    let dy = 0

    let ddx = 0
    let ddy = 0

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

        ddx = moveEvent.x - grabEvent.x
        ddy = moveEvent.y - grabEvent.y

        if (this.axis === 'x') {
          this.#dragDelta = ddx
          this.#delta = dx
        } else {
          this.#dragDelta = ddy
          this.#delta = dy
        }

        prev = moveEvent

        okToNotify =
          (this.axis === 'x' && Math.abs(ddx) > Math.abs(ddy)) ||
          (this.axis === 'y' && Math.abs(ddy) > Math.abs(ddx))

        if (okToNotify) {
          document.documentElement.classList.add('dragging')
          document.documentElement.classList.add('click-disabled')

          DragControls.#currentElement = this.#element

          this.changeEvent.notify('drag', this.#delta, moveEvent)
        }
      },
      (e) => {
        DragControls.#currentElement = null

        if (okToNotify) {
          if (!this.swipe && this.inertion) {
            this.#delta = this.#delta * this.inertion

            ticker.subscribe(this.#tickListener, {
              order: TICK_ORDER.CONTROLS - 1,
            })
          } else if (this.swipe) {
            this.changeEvent.notify('drag-end', this.#delta, e)
          }
        }

        setTimeout(() => {
          document.documentElement.classList.remove('grabbing')
          document.documentElement.classList.remove('dragging')
          document.documentElement.classList.remove('click-disabled')
        })
      }
    )
  }

  #tickListener = () => {
    if (!Math.floor(Math.abs(this.#delta))) {
      ticker.unsubscribe(this.#tickListener)
    }

    this.#delta *= 0.95
    this.#delta = preciseNumber(this.#delta, 3)

    this.changeEvent.notify('drag', this.#delta, null)
  }
}
