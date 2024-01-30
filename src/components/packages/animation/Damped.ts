import { TickerCallbackEntry } from '@packages/ticker'
import { damp, fix } from '@packages/utils'
import { AnimatedOptions, Animated } from './Animated'

export interface DampedOptions extends AnimatedOptions {
  damping?: number
}

export class Damped extends Animated {
  public damping: number

  constructor(options?: DampedOptions) {
    super({
      ...options,
      min: options?.min ?? -Infinity,
      max: options?.max ?? Infinity,
    })

    this.damping = options?.damping || 0
  }

  protected update() {
    if (this.damping) {
      this.listenAnimationFrame()
    } else {
      this.current = this.target
      this.unlistenAnimationFrame()
    }
  }

  protected handleAnimationFrame(e: TickerCallbackEntry) {
    if (fix(this.current, 4) === fix(this.target, 4)) {
      this.unlistenAnimationFrame()
      this.current = this.target
    }

    this.current = damp(this.current, this.target, this.damping, e.elapsed)
  }
}
