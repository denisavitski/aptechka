import { Notifier } from '@packages/notifier'
import { debounce, isBrowser } from '@packages/utils'

export type WindowResizerCallback = (event?: Event) => void

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

  #resizeListener = (event?: Event) => {
    if (!this.#isResizeScheduled) {
      this.#isResizeScheduled = true
      this.#resize(event)
    }
  }

  #resize = debounce((event?: Event) => {
    this.notify(event)
    this.#isResizeScheduled = false
  }, 0)
}

export const windowResizer = new WindowResizer()
