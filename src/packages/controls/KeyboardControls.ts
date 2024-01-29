import { isBrowser, getElement } from '$packages/utils'
import { Controls } from './Controls'
import { user } from './User'

export interface KeyboardControlsOptions {
  element?: HTMLElement
}

export class KeyboardControls extends Controls {
  #element: HTMLElement | Window = null!

  constructor(options?: KeyboardControlsOptions) {
    super()

    if (isBrowser) {
      this.#element = options?.element ? getElement(options.element) || window : window
    }
  }

  public connect() {
    if (isBrowser) {
      this.#element.addEventListener('keydown', this.#keydownListener as EventListener)
    }
  }

  public disconnect() {
    if (isBrowser) {
      this.#element.removeEventListener('keydown', this.#keydownListener as EventListener)
    }
  }

  #keydownListener = (e: KeyboardEvent) => {
    const dir = e.shiftKey ? -1 : 1

    let interaction = true

    if (e.code === 'Space') {
      this.changeEvent.notify(dir * 500)
    } else if (e.code === 'ArrowLeft') {
      this.changeEvent.notify(-1 * 100)
    } else if (e.code === 'ArrowRight') {
      this.changeEvent.notify(1 * 100)
    } else if (e.code === 'ArrowUp') {
      this.changeEvent.notify(-1 * 100)
    } else if (e.code === 'ArrowDown') {
      this.changeEvent.notify(1 * 100)
    } else if (e.code === 'PageUp') {
      this.changeEvent.notify(-1 * 1000)
    } else if (e.code === 'PageDown') {
      this.changeEvent.notify(1 * 1000)
    } else if (e.code === 'Home') {
      this.changeEvent.notify('min')
    } else if (e.code === 'End') {
      this.changeEvent.notify('max')
    } else {
      interaction = false
    }

    if (interaction) {
      user.registerInteraction()
    }
  }
}
