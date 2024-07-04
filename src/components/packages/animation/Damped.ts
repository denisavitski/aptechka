import { TickerCallbackEntry } from '@packages/ticker'
import { damp, nullishCoalescing, preciseNumber } from '@packages/utils'
import {
  Animation,
  AnimationConstructorOptions,
  AnimationEntry,
  AnimationOptions,
} from './Animation'

export interface DampedOptions extends AnimationOptions {
  stiffness?: number
  damping?: number
  mass?: number
}

export interface DampedEntry extends AnimationEntry {
  velocity: number
  speed: number
}

export class Damped extends Animation<DampedEntry, DampedOptions> {
  public damping = 20
  public stiffness = 0
  public mass = 0

  #velocity = 0
  #speed = 0

  constructor(
    initial?: number,
    options?: AnimationConstructorOptions<DampedOptions>
  ) {
    super(initial, options)

    this.updateOptions({ ...options, equalize: true })
  }

  public get velocity() {
    return this.#velocity
  }

  public get speed() {
    return this.#speed
  }

  public override get entry() {
    return {
      ...super.entry,
      velocity: this.#velocity,
      speed: this.#speed,
    }
  }

  public override updateOptions(options?: DampedOptions) {
    this.damping = nullishCoalescing(options?.damping, this.damping)
    this.mass = nullishCoalescing(options?.mass, this.mass)
    this.stiffness = nullishCoalescing(options?.stiffness, this.stiffness)

    super.updateOptions(options)
  }

  protected override handleAnimationFrame(e: TickerCallbackEntry) {
    if (preciseNumber(this.current, 4) === preciseNumber(this.target, 4)) {
      this.unlistenAnimationFrame()
      this.current = this.target
    }

    const current = this.current

    const delta = Math.abs(current - this.target)

    this.#speed = delta / e.timeBetweenFrames

    const dt = e.timeBetweenFrames / 1000

    if (this.mass || this.stiffness) {
      const acceleration =
        (this.target - this.current) * this.stiffness -
        this.#velocity * this.damping

      this.#velocity += (acceleration / this.mass) * dt

      this.current += this.#velocity * dt
    } else {
      this.current = damp(this.current, this.target, this.damping, dt)
    }
  }
}
