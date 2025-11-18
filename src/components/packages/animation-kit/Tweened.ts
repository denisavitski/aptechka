import { TweenEasingName } from '@packages/animation/Tweened'
import { TickerCallbackEntry } from '@packages/ticker'
import {
  clamp,
  EasingFunction,
  easings,
  linear,
  nullishCoalescing,
  preciseNumber,
} from '@packages/utils'
import { AnimationStore } from './AnimationStore'

export interface TweenedOptions {
  initial?: number
  easing?: EasingFunction | TweenEasingName | false
  duration?: number | false
}

export class Tweened extends AnimationStore {
  #easing: EasingFunction = linear
  #duration = 1000

  constructor(options?: TweenedOptions) {
    super(options?.initial || 0)
    this.setOptions(options)
  }

  public setOptions(options?: Omit<TweenedOptions, 'initial'>) {
    this.#easing =
      typeof options?.easing === 'function'
        ? options.easing
        : typeof options?.easing === 'string'
          ? easings[options.easing as keyof typeof easings] || easings.linear
          : this.#easing

    this.#duration =
      options?.duration === false
        ? 0
        : nullishCoalescing(options?.duration, this.#duration)
  }

  protected override onAnimationTick(e: TickerCallbackEntry) {
    const t =
      e.timeElapsedSinceSubscription / 1000 / (this.#duration / 1000) || 0

    const et = this.#easing(clamp(t, 0, 1))

    this.current = preciseNumber(
      this.initial + (this.target - this.initial) * et,
      6,
    )

    if (t > 1) {
      this.stopAnimation()
    }
  }
}
