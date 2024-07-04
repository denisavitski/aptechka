import { TickerCallbackEntry } from '@packages/ticker'
import {
  EasingFunction,
  clamp,
  linear,
  nullishCoalescing,
  preciseNumber,
} from '@packages/utils'
import {
  Animation,
  AnimationConstructorOptions,
  AnimationEntry,
  AnimationOptions,
} from './Animation'

export interface TweenedOptions extends AnimationOptions {
  easing?: EasingFunction
  duration?: number
}

export class Tweened extends Animation<AnimationEntry, TweenedOptions> {
  #easing: EasingFunction = linear
  #duration = 1000

  constructor(
    initial?: number,
    options?: AnimationConstructorOptions<TweenedOptions>
  ) {
    super(initial || 0, options)

    this.updateOptions({ ...options, equalize: true })
  }

  public override updateOptions(options?: TweenedOptions) {
    super.updateOptions(options)

    this.#easing = nullishCoalescing(options?.easing, this.#easing)
    this.#duration = nullishCoalescing(options?.duration, this.#duration)
  }

  protected override handleAnimationFrame(e: TickerCallbackEntry): void {
    const t = e.timeElapsedSinceSubscription / 1000 / (this.#duration / 1000)
    const et = this.#easing(clamp(t, 0, 1))

    this.current = preciseNumber(this.from + (this.target - this.from) * et, 6)

    if (t > 1) {
      this.unlistenAnimationFrame()
    }
  }

  protected override start() {
    this.unlistenAnimationFrame()
    this.listenAnimationFrame()
  }
}
