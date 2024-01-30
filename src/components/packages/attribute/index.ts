import { Store, StoreOptions } from '@packages/store'
import { ElementOrSelector, isBrowser, getElement, parseAttributeValue } from '@packages/utils'

export class Attribute<T extends string | number | boolean> extends Store<T> {
  #element: HTMLElement | null = null
  #name: string
  #mutationObserver: MutationObserver = null!

  constructor(
    elementOrSelector: ElementOrSelector,
    name: string,
    defaultValue: T,
    options?: StoreOptions<T>
  ) {
    super(defaultValue, options)

    this.#name = name

    this.subscribe((e) => {
      this.#element?.setAttribute(this.#name, e.current.toString())
    })

    if (isBrowser) {
      this.#element = getElement(elementOrSelector)!

      this.#mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === this.#name) {
            this.#tryUpdate()
          }
        })
      })
    }
  }

  public unobserve() {
    if (isBrowser) {
      this.#mutationObserver.disconnect()
    }
  }

  public observe() {
    if (isBrowser && this.#element) {
      this.#mutationObserver.observe(this.#element, {
        attributes: true,
      })

      this.#tryUpdate()
    }
  }

  #tryUpdate() {
    const value = this.#element!.getAttribute(this.#name)

    if (value != undefined) {
      this.current = parseAttributeValue(value) as T
    }
  }
}
