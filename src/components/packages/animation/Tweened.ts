import { StoreEntry, StoreManagers, StoreOptions } from '@packages/store'
import { TickerAddOptions, TickerCallbackEntry } from '@packages/ticker'
import {
  EasingFunction,
  clamp,
  linear,
  nullishCoalescing,
  preciseNumber,
} from '@packages/utils'
import { Animation, AnimationEntry, AnimationOptions } from './Animation'

export interface TweenedOptions extends AnimationOptions {
  easing?: EasingFunction
  duration?: number
}

export interface TweenedSetOptions
  extends Omit<TweenedOptions, keyof StoreOptions<number>> {
  restart?: boolean
}

export interface TweenedEntry extends AnimationEntry {}

export class Tweened extends Animation<TweenedOptions, TweenedEntry> {
  #easing: EasingFunction = linear
  #duration = 1000

  #from = 0
  #to = 0
  #direction = 0

  constructor(
    initial?: number,
    options?: TweenedOptions & TickerAddOptions & StoreOptions<number>
  ) {
    super(initial || 0)
    this.updateOptions(options)
  }

  public get direction() {
    return this.#direction
  }

  public get length() {
    return this.#to - this.#from
  }

  public get progress() {
    return this.length
      ? preciseNumber((this.current - this.#from) / this.length, 6)
      : 0
  }

  public override get entry(): TweenedEntry {
    return {
      ...super.entry,
      length: this.length,
      direction: this.direction,
      progress: this.progress,
    }
  }

  public set(value: number, options?: TweenedSetOptions) {
    if (options?.restart) {
      this.current = this.initial
    }

    this.#from = this.current
    this.#to = value
    this.#direction = Math.sign(this.length)

    this.updateOptions(options)

    if (!this.#duration) {
      this.current = this.#to
      this.unlistenAnimationFrame()
    } else {
      this.unlistenAnimationFrame()
      this.listenAnimationFrame()
    }
  }

  public shift(value: number, options?: TweenedSetOptions) {
    this.set(this.current + value, options)
  }

  public override updateOptions(
    options?:
      | Omit<TweenedOptions, keyof StoreOptions<number, keyof StoreManagers>>
      | undefined
  ) {
    super.updateOptions(options)

    this.#easing = nullishCoalescing(options?.easing, this.#easing)
    this.#duration = nullishCoalescing(options?.duration, this.#duration)
  }

  protected override handleAnimationFrame(e: TickerCallbackEntry): void {
    const t = (e.timestamp - e.startTimestamp) / 1000 / (this.#duration / 1000)
    const et = this.#easing(clamp(t, 0, 1))

    this.current = preciseNumber(this.#from + (this.#to - this.#from) * et, 6)

    if (t > 1) {
      this.unlistenAnimationFrame()
    }
  }
}
