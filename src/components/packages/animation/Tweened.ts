import { TickerCallbackEntry } from '@packages/ticker'
import { EasingFunction, linear } from '@packages/utils'
import { AnimatedOptions, Animated } from './Animated'

export interface TweenedOptions extends AnimatedOptions {
  easing?: EasingFunction
}

export class Tweened extends Animated {
  public easing: EasingFunction

  constructor(options?: TweenedOptions) {
    super({
      ...options,
      min: options?.min || 0,
      max: options?.max || 1000,
    })

    this.easing = options?.easing || linear
  }

  public start() {
    this.listenAnimationFrame()
  }

  public pause() {
    this.unlistenAnimationFrame()
  }

  public stop() {
    this.reset()
  }

  public override get max() {
    return super.max
  }

  protected update() {
    const normalized = (this.target - this.min.current) / (this.delta || 1)
    const eased = this.easing(normalized)
    this.current = this.min.current + eased * this.delta
  }

  protected handleAnimationFrame(e: TickerCallbackEntry) {
    this.shift(e.elapsed)

    if ((e.elapsed && this.current === 0) || this.current === this.delta) {
      this.unlistenAnimationFrame()
    }
  }
}
