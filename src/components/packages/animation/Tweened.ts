import { TickerCallbackEntry } from '@packages/ticker/vanilla'
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
  AnimationOptions,
} from './Animation'
import * as easings from '@packages/utils/easings'

export type TweenEasingName = keyof typeof easings

export interface TweenedOptions extends AnimationOptions {
  easing?: EasingFunction | TweenEasingName | false
  duration?: number | false
}

export class Tweened extends Animation<TweenedOptions> {
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

    this.#easing =
      typeof options?.easing === 'function'
        ? options.easing
        : typeof options?.easing === 'string'
        ? easings[options.easing as keyof typeof easings] || easings.linear
        : easings.linear

    this.#duration =
      options?.duration === false
        ? 0
        : nullishCoalescing(options?.duration, this.#duration)
  }

  protected override handleAnimationFrame(e: TickerCallbackEntry): void {
    const t =
      e.timeElapsedSinceSubscription / 1000 / (this.#duration / 1000) || 0

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
