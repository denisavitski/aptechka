import { TickerCallbackEntry } from '@packages/ticker'
import { damp } from '@packages/utils'
import { AnimationStore } from './AnimationStore'

export interface DampedOptions {
  initial?: number
  damping?: number
}

export class Damped extends AnimationStore {
  #options: Required<Omit<DampedOptions, 'initial'>> = null!
  #speed = 0

  constructor(options?: DampedOptions) {
    super(options?.initial || 0)

    this.setOptions(options)
  }

  public get speed() {
    return this.#speed
  }

  public setOptions(options?: Omit<DampedOptions, 'initial'>) {
    this.#options = {
      damping: 20,
      ...options,
    }
  }

  protected override onAnimationStop() {
    this.#speed = 0
  }

  protected override onAnimationTick(e: TickerCallbackEntry) {
    const delta = Math.abs(this.current - this.target)
    const dt = e.timeBetweenFrames / 1000
    const { damping } = this.#options

    this.#speed = delta / e.timeBetweenFrames
    this.current = damp(this.current, this.target, damping, dt)
  }
}
