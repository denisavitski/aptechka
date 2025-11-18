import { TICK_ORDER } from '@packages/order'
import { Store } from '@packages/store'
import {
  ticker,
  TickerAddOptions,
  TickerCallback,
  TickerCallbackEntry,
} from '@packages/ticker'
import { clamp, preciseNumber } from '@packages/utils'

export abstract class AnimationStore extends Store<number> {
  #tickerOptions: TickerAddOptions | undefined
  #target = 0
  #active = false
  #isAnimationSet = false
  #min = -Infinity
  #max = Infinity
  #direction = 1

  constructor(initialValue = 0) {
    super(initialValue)

    this.#target = initialValue
  }

  public get active() {
    return this.#active
  }

  public get target() {
    return this.#target
  }

  public get direction() {
    return this.#direction
  }

  public get min() {
    return this.#min
  }

  public get max() {
    return this.#max
  }

  public override close() {
    super.close()
    this.stopAnimation()
  }

  public override get current() {
    return super.current
  }

  public override set current(value: number) {
    if (this.#target !== value) {
      if (this.#isAnimationSet) {
        super.current = value
      } else {
        this.#target = clamp(value, this.#min, this.#max)
      }

      this.#direction = Math.sign(
        this.#target - (this.previous || this.initial),
      )

      this.startAnimation()
    }
  }

  public setWithoutAnimation(value: number) {
    super.current = this.#target = clamp(value, this.#min, this.#max)
  }

  public setEdges(min = -Infinity, max = Infinity) {
    this.#min = min
    this.#max = max
    this.current = clamp(this.#target, this.#min, this.#max)
  }

  public setTickerOptions(options?: TickerAddOptions) {
    this.#tickerOptions = options

    if (this.#active) {
      this.stopAnimation()
      this.startAnimation()
    }
  }

  public startAnimation() {
    if (!this.#active) {
      this.#active = true

      this.onAnimationStart?.()

      ticker.subscribe(this.#tickListener, {
        order: TICK_ORDER.ANIMATION,
        ...this.#tickerOptions,
      })
    }
  }

  public stopAnimation() {
    if (this.#active) {
      ticker.unsubscribe(this.#tickListener)

      this.#active = false
      super.current = this.target

      this.onAnimationStop?.()
    }
  }

  protected onAnimationStart?(): void
  protected onAnimationStop?(): void
  protected abstract onAnimationTick(e: TickerCallbackEntry): void

  #tickListener: TickerCallback = (e) => {
    if (preciseNumber(this.current, 6) === preciseNumber(this.target, 6)) {
      this.stopAnimation()

      return
    }

    this.#isAnimationSet = true
    this.onAnimationTick(e)
    this.#isAnimationSet = false
  }
}
