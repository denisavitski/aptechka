import { Store, StoreEntry, StoreOptions } from '@packages/store'
import { TickerAddOptions, TickerCallback, ticker } from '@packages/ticker'
import {
  EasingFunction,
  ElementOrSelector,
  clamp,
  linear,
  nullishCoalescing,
  preciseNumber,
} from '@packages/utils'

export interface TweenedAnimationOptions extends TickerAddOptions {
  easing?: EasingFunction
  duration?: number
}

export interface TweenedSetOptions extends TweenedAnimationOptions {
  restart?: boolean
}

export interface TweenedOptions
  extends TweenedAnimationOptions,
    StoreOptions<number> {}

export interface TweenedEntry extends StoreEntry<number> {
  length: number
  progress: number
  direction: number
}

export class Tweened extends Store<number, 'number', TweenedEntry> {
  #maxFPS: number | undefined
  #order: number | undefined
  #culling: ElementOrSelector | undefined | null | false

  #easing: EasingFunction = linear
  #duration = 1000

  #isRunning = new Store(false)

  #from = 0
  #to = 0
  #direction = 0

  constructor(initial?: number, options?: TweenedOptions) {
    super(initial || 0)
    this.#updateOptions(options)
  }

  public get isRunning() {
    return this.#isRunning
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

    this.#updateOptions(options)

    if (!this.#duration) {
      this.current = this.#to
      this.#unlistenAnimationFrame()
    } else {
      this.#unlistenAnimationFrame()
      this.#listenAnimationFrame()
    }
  }

  public shift(value: number, options?: TweenedSetOptions) {
    this.set(this.current + value, options)
  }

  public override reset() {
    this.#unlistenAnimationFrame()
    super.reset()
  }

  public override close() {
    super.close()
    this.#unlistenAnimationFrame()
  }

  #updateOptions(options?: TweenedAnimationOptions) {
    this.#easing = nullishCoalescing(options?.easing, this.#easing)
    this.#duration = nullishCoalescing(options?.duration, this.#duration)
    this.#maxFPS = nullishCoalescing(options?.maxFPS, this.#maxFPS)
    this.#order = nullishCoalescing(options?.order, this.#order)
    this.#culling = nullishCoalescing(options?.culling, this.#culling)
  }

  #listenAnimationFrame() {
    if (!this.#isRunning.current) {
      this.#isRunning.current = true

      ticker.subscribe(this.#animationFrameListener, {
        maxFPS: this.#maxFPS,
        order: this.#order,
        culling: this.#culling,
      })
    }
  }

  #unlistenAnimationFrame() {
    if (this.#isRunning.current) {
      this.#isRunning.current = false

      ticker.unsubscribe(this.#animationFrameListener)
    }
  }

  #animationFrameListener: TickerCallback = (e) => {
    const t = (e.timestamp - e.startTimestamp) / 1000 / (this.#duration / 1000)
    const et = this.#easing(clamp(t, 0, 1))

    this.current = preciseNumber(this.#from + (this.#to - this.#from) * et, 6)

    if (t > 1) {
      this.#unlistenAnimationFrame()
    }
  }
}
