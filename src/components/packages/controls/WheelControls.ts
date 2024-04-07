import { Axes2D, isBrowser, getElement } from '@packages/utils'
import { Controls } from './Controls'

export type WheelControlsAxis = Axes2D | 'max'

export interface WheelControlsOptions {
  axis?: WheelControlsAxis
  speed?: number
  debounce?: boolean
  element?: HTMLElement
}

export class WheelControls extends Controls {
  axis: WheelControlsAxis
  speed: number
  debounce: boolean

  #element: HTMLElement | Window = null!

  #timeoutId: ReturnType<typeof setTimeout> | undefined
  #prevEventDate: number

  constructor(options?: WheelControlsOptions) {
    super()

    this.axis = options?.axis || 'y'
    this.speed = options?.speed || 1
    this.debounce = options?.debounce || false

    this.#prevEventDate = Date.now()

    if (isBrowser) {
      this.#element = options?.element
        ? getElement(options.element) || window
        : window
    }
  }

  public connect() {
    if (isBrowser) {
      this.#element.addEventListener(
        'wheel',
        this.#wheelListener as EventListener,
        {
          passive: false,
        }
      )
    }
  }

  public disconnect() {
    if (isBrowser) {
      this.#element.removeEventListener(
        'wheel',
        this.#wheelListener as EventListener
      )
      clearTimeout(this.#timeoutId)
    }
  }

  #wheelListener = (event: WheelEvent) => {
    let delta = 0

    if (
      (this.axis === 'x' && Math.abs(event.deltaY) > Math.abs(event.deltaX)) ||
      (this.axis === 'y' && Math.abs(event.deltaX) > Math.abs(event.deltaY))
    ) {
      return
    }

    delta =
      (this.axis === 'max'
        ? Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY
        : this.axis === 'x'
        ? event.deltaX
        : event.deltaY) * this.speed

    event.stopPropagation()
    event.preventDefault()

    if (this.debounce) {
      const now = Date.now()

      if (now - this.#prevEventDate > 40) {
        delta = 100 * Math.sign(delta)
      }

      this.#prevEventDate = now

      if (Math.abs(delta) < 100) {
        return
      }

      if (this.#timeoutId) {
        return
      }

      this.changeEvent.notify('wheel', delta)

      this.#timeoutId = setTimeout(() => {
        this.#timeoutId = undefined
      }, 80)
    } else {
      this.changeEvent.notify('wheel', delta)
    }
  }
}
