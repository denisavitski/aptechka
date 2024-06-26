import { cssValueParser } from '@packages/css-value-parser'
import { RESIZE_ORDER } from '@packages/order'
import {
  Store,
  StoreCallback,
  StoreEntry,
  StoreManagerType,
  StoreOptions,
} from '@packages/store'
import { ElementOrSelector, getElement } from '@packages/utils'
import { windowResizer } from '@packages/window-resizer'

export interface CSSPropertyOptions<
  StoreType extends number | boolean | string,
  StoreManager extends StoreManagerType = StoreManagerType
> extends StoreOptions<StoreType, StoreManager> {
  rawValueCheck?: boolean
}

export class CSSProperty<
  StoreType extends number | boolean | string,
  StoreManager extends StoreManagerType = StoreManagerType
> extends Store<StoreType, StoreManager> {
  #element: HTMLElement
  #property: string
  #currentRawValue: string
  #rawValueCheck: boolean

  constructor(
    elementOrSelector: ElementOrSelector<HTMLElement>,
    property: string,
    defaultValue: StoreType,
    options?: CSSPropertyOptions<StoreType, StoreManager>
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
    if (!this.subscribers.size) {
      windowResizer.subscribe(this.#resizeListener, RESIZE_ORDER.CSS_VARIABLE)
    }
  }

  public unobserve() {
    if (!this.subscribers.size) {
      windowResizer.unsubscribe(this.#resizeListener)
    }
  }

  public override subscribe(callback: StoreCallback<StoreEntry<StoreType>>) {
    this.observe()

    return super.subscribe(callback)
  }

  public override unsubscribe(callback: StoreCallback<StoreEntry<StoreType>>) {
    super.unsubscribe(callback)

    this.unobserve()
  }

  public check() {
    const rawValue = getComputedStyle(this.#element).getPropertyValue(
      this.#property
    )

    if (this.#rawValueCheck && this.#currentRawValue === rawValue) {
      return
    }

    this.#currentRawValue = rawValue

    if (rawValue) {
      const result = cssValueParser.parse(this.#currentRawValue)

      this.current = result
    } else {
      this.current = this.initial
    }
  }

  #resizeListener = () => {
    this.check()
  }
}
