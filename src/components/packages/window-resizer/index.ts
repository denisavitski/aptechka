import { Notifier } from '@packages/notifier'
import { debounce, isBrowser } from '@packages/utils'

export type WindowResizerCallback = () => void

export class WindowResizer extends Notifier<WindowResizerCallback> {
  #isResizeScheduled = false

  constructor() {
    super()

    if (isBrowser) {
      window.addEventListener('resize', this.#resizeListener)
      this.#resizeListener()
    }
  }

  public override subscribe(callback: WindowResizerCallback, order?: number) {
    const unsub = super.subscribe(callback, order)

    if (!this.#isResizeScheduled) {
      callback()
    }

    return unsub
  }

  #resizeListener = () => {
    if (!this.#isResizeScheduled) {
      this.#isResizeScheduled = true
      this.#resize()
    }
  }

  #resize = debounce(() => {
    this.notify()
    this.#isResizeScheduled = false
  }, 0)
}

export const windowResizer = new WindowResizer()
