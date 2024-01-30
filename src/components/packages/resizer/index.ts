import { Notifier } from '@packages/notifier'
import { debounce, isBrowser } from '@packages/utils'

export type ResizerCallback = () => void

export const dispatchResizeEvent = debounce((cause?: any) => {
  if (cause) {
    window.dispatchEvent(
      new CustomEvent('resize', {
        detail: {
          cause: cause,
        },
      })
    )
  } else {
    window.dispatchEvent(new Event('resize'))
  }
}, 0)

class Resizer extends Notifier<ResizerCallback> {
  #isResizeScheduled = false

  constructor() {
    super()

    if (isBrowser) {
      addEventListener('resize', this.#resizeListener)
      this.#resizeListener()
    }
  }

  public override subscribe(callback: ResizerCallback, order?: number) {
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

export const resizer = new Resizer()
