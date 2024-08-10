import { isBrowser, getElement } from '@packages/utils'
import { Controls } from './Controls'

export type KeyboardControlsDimension = 'height' | 'width'

export interface KeyboardControlsOptions {
  element?: HTMLElement
  dimension?: KeyboardControlsDimension
}

export class KeyboardControls extends Controls {
  #element: HTMLElement | Window = null!
  #dimensionElement: HTMLElement = null!
  #dimension: 'offsetHeight' | 'offsetWidth' = 'offsetHeight'

  constructor(options?: KeyboardControlsOptions) {
    super()

    if (isBrowser) {
      this.#element = options?.element
        ? getElement(options.element) || window
        : window

      this.#dimensionElement =
        this.#element instanceof HTMLElement
          ? this.#element
          : document.documentElement

      this.dimension = options?.dimension
    }
  }

  public set dimension(value: KeyboardControlsDimension | undefined | null) {
    this.#dimension = value === 'width' ? 'offsetWidth' : 'offsetHeight'
  }

  public connect() {
    if (isBrowser) {
      this.#element.addEventListener(
        'keydown',
        this.#keydownListener as EventListener
      )
    }
  }

  public disconnect() {
    if (isBrowser) {
      this.#element.removeEventListener(
        'keydown',
        this.#keydownListener as EventListener
      )
    }
  }

  #keydownListener = (e: KeyboardEvent) => {
    const dir = e.shiftKey ? -1 : 1

    let value: number | undefined

    if (e.code === 'Space') {
      value = dir * this.#dimensionElement[this.#dimension] * 0.4
    } else if (e.code === 'ArrowLeft') {
      value = -1 * this.#dimensionElement[this.#dimension] * 0.2
    } else if (e.code === 'ArrowRight') {
      value = 1 * this.#dimensionElement[this.#dimension] * 0.2
    } else if (e.code === 'ArrowUp') {
      value = -1 * this.#dimensionElement[this.#dimension] * 0.2
    } else if (e.code === 'ArrowDown') {
      value = 1 * this.#dimensionElement[this.#dimension] * 0.2
    } else if (e.code === 'PageUp') {
      value = -1 * this.#dimensionElement[this.#dimension]
    } else if (e.code === 'PageDown') {
      value = 1 * this.#dimensionElement[this.#dimension]
    } else if (e.code === 'Home') {
      value = 0
    } else if (e.code === 'End') {
      value =
        this.#dimension === 'offsetWidth'
          ? this.#dimensionElement.scrollWidth
          : this.#dimensionElement.scrollHeight
    }

    if (value) {
      e.stopPropagation()
      this.changeEvent.notify('keyboard', value)
    }
  }
}
