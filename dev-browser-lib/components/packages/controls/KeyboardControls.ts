import { isBrowser, getElement } from '@packages/utils'
import { Controls, ControlsValue } from './Controls'

export interface KeyboardControlsOptions {
  element?: HTMLElement
}

export class KeyboardControls extends Controls {
  #element: HTMLElement | Window = null!

  constructor(options?: KeyboardControlsOptions) {
    super()

    if (isBrowser) {
      this.#element = options?.element
        ? getElement(options.element) || window
        : window
    }
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

    let value: ControlsValue | undefined

    if (e.code === 'Space') {
      value = dir * 500
    } else if (e.code === 'ArrowLeft') {
      value = -1 * 100
    } else if (e.code === 'ArrowRight') {
      value = 1 * 100
    } else if (e.code === 'ArrowUp') {
      value = -1 * 100
    } else if (e.code === 'ArrowDown') {
      value = 1 * 100
    } else if (e.code === 'PageUp') {
      value = -1 * 1000
    } else if (e.code === 'PageDown') {
      value = 1 * 1000
    } else if (e.code === 'Home') {
      value = 'min'
    } else if (e.code === 'End') {
      value = 'max'
    }

    if (value) {
      e.stopPropagation()
      this.changeEvent.notify(value)
    }
  }
}
