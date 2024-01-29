import { isBrowser } from '$packages/utils'

export abstract class Measurer {
  #element: HTMLElement
  #resizeObserver: ResizeObserver = null!
  #value = 0

  constructor(element: HTMLElement) {
    this.#element = element

    if (isBrowser) {
      this.#resizeObserver = new ResizeObserver(this.#resizeObserverCallback)
      this.#resizeObserver.observe(element)
    }
  }

  public get element() {
    return this.#element
  }

  public value = (modifier?: (current: number) => number) => {
    return modifier ? modifier(this.#value) : this.#value
  }

  public destroy() {
    this.#resizeObserver.disconnect()
  }

  protected abstract handleResize(): number

  #resizeObserverCallback: ResizeObserverCallback = () => {
    this.#value = this.handleResize()

    if (!this.#element.isConnected) {
      this.destroy()
    }
  }
}
