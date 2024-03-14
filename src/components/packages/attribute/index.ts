import { Store, StoreCallback, StoreEntry, StoreOptions } from '@packages/store'
import {
  ElementOrSelector,
  isBrowser,
  getElement,
  parseAttributeValue,
} from '@packages/utils'

export interface AttributeOptions<T> extends StoreOptions<T> {
  sync?: boolean
}

export class Attribute<T extends string | number | boolean> extends Store<T> {
  #element: Element = null!
  #name: string
  #mutationObserver: MutationObserver = null!

  constructor(
    elementOrSelector: ElementOrSelector,
    name: string,
    defaultValue: T,
    options?: AttributeOptions<T>
  ) {
    super(defaultValue, options)

    this.#name = name

    if (isBrowser) {
      this.#element = getElement(elementOrSelector)!

      this.#mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === 'attributes' &&
            mutation.attributeName === this.#name
          ) {
            this.#tryUpdate()
          }
        })
      })

      if (options?.sync) {
        this.subscribe((e) => {
          this.#element.setAttribute(this.#name, e.current.toString())
        })
      }
    }
  }

  public override subscribe(callback: StoreCallback<StoreEntry<T>>) {
    const observe = !this.subscribers.size

    const unsub = super.subscribe(callback)

    if (observe) {
      this.#mutationObserver.observe(this.#element, {
        attributes: true,
      })

      this.#tryUpdate()
    }

    return unsub
  }

  public override unsubscribe(callback: StoreCallback<StoreEntry<T>>) {
    super.unsubscribe(callback)

    if (!this.subscribers.size) {
      this.#mutationObserver.disconnect()
    }
  }

  public override close() {
    super.close()
    this.#mutationObserver.disconnect()
  }

  #tryUpdate() {
    const value = this.#element.getAttribute(this.#name)

    if (value != undefined) {
      this.current = parseAttributeValue(value) as T
    }
  }
}
