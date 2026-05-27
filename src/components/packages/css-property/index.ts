import { cssValueParser } from '@packages/css-value-parser'
import { RESIZE_ORDER } from '@packages/order'
import { Store, StoreOptions, StoreSubscribeCallback } from '@packages/store'
import { ElementOrSelector, getElement } from '@packages/utils'
import { windowResizer } from '@packages/window-resizer'

export interface CSSPropertyOptions<StoreType extends number | boolean | string>
  extends StoreOptions<StoreType> {
  rawValueCheck?: boolean
}

export class CSSProperty<
  StoreType extends number | boolean | string,
> extends Store<StoreType> {
  #element: HTMLElement
  #property: string
  #currentRawValue: string
  #rawValueCheck: boolean
  #active = false

  constructor(
    elementOrSelector: ElementOrSelector<HTMLElement>,
    property: string,
    defaultValue: StoreType,
    options?: CSSPropertyOptions<StoreType>,
  ) {
    super(defaultValue, options)

    this.#element = getElement(elementOrSelector)!
    this.#property = property
    this.#currentRawValue = defaultValue.toString()
    this.#rawValueCheck = options?.rawValueCheck === false ? false : true
  }

  public get currentRawValue() {
    return this.#currentRawValue
  }

  public observe() {
    if (!this.#active) {
      this.#active = true
      this.#resizeListener()
      windowResizer.subscribe(this.#resizeListener, RESIZE_ORDER.CSS_VARIABLE)
    }
  }

  public unobserve() {
    if (this.#active) {
      this.#active = false
      windowResizer.unsubscribe(this.#resizeListener)
    }
  }

  public override subscribe(
    callback: StoreSubscribeCallback<StoreType>,
    order?: number,
  ) {
    if (!this.subscribers.length) {
      this.observe()
    }

    return super.subscribe(callback, order)
  }

  public override unsubscribe(callback: StoreSubscribeCallback<StoreType>) {
    super.unsubscribe(callback)

    if (!this.subscribers.length) {
      this.unobserve()
    }
  }

  public override close() {
    this.unobserve()
    super.close()
    this.#currentRawValue = this.initial.toString()
  }

  public check() {
    const rawValue = getComputedStyle(this.#element)
      .getPropertyValue(this.#property)
      .trim()

    const nextValue = rawValue
      ? cssValueParser.parse(rawValue, this.#element)
      : this.initial

    if (
      this.#rawValueCheck &&
      this.#currentRawValue === rawValue &&
      this.current === nextValue
    ) {
      return
    }

    this.#currentRawValue = rawValue
    this.current = nextValue
  }

  #resizeListener = () => {
    this.check()
  }
}
