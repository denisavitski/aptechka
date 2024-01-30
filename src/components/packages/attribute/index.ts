import { Store, StoreCallback, StoreEntry, StoreOptions } from '@packages/store'
import { ElementOrSelector, isBrowser, getElement, parseAttributeValue } from '@packages/utils'

export interface AttributeOptions<T> extends StoreOptions<T> {
  sync?: boolean
}

export class Attribute<T extends string | number | boolean> extends Store<T> {
  #element: HTMLElement = null!
  #name: string
  #mutationObserver: MutationObserver = null!
  #resizeObserver: ResizeObserver = null!
  #isConnected = false

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

      if (options?.sync) {
        this.subscribe((e) => {
          this.#element.setAttribute(this.#name, e.current.toString())
        })
      }

      this.#mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === this.#name) {
            this.#tryUpdate()
          }
        })
      })

      this.#resizeObserver = new ResizeObserver(() => {
        if (this.#element.isConnected && !this.#isConnected) {
          this.#mutationObserver.observe(this.#element, {
            attributes: true,
          })
        } else if (!this.#element.isConnected && this.#isConnected) {
          this.#mutationObserver.disconnect()
          this.#resizeObserver.disconnect()
        }

        this.#isConnected = this.#element.isConnected
      })
    }
  }

  public override get current() {
    this.#awake()
    return super.current
  }

  public override set current(value: T) {
    super.current = value
  }

  public override subscribe(callback: StoreCallback<StoreEntry<T>>) {
    this.#awake()
    return super.subscribe(callback)
  }

  #tryUpdate() {
    const value = this.#element.getAttribute(this.#name)

    if (value != undefined) {
      this.current = parseAttributeValue(value) as T
    }
  }

  #awake() {
    if (!this.#isConnected) {
      this.#tryUpdate()
      this.#resizeObserver.observe(this.#element)
    }
  }
}
