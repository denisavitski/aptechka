import { StoreEntry, StoreManagers, StoreOptions } from '@packages/store'
import { TickerAddOptions, TickerCallbackEntry } from '@packages/ticker'
import { clamp, damp, nullishCoalescing, preciseNumber } from '@packages/utils'
import { Animation } from './Animation'

export interface DampedOptions extends TickerAddOptions, StoreOptions<number> {
  min?: number
  max?: number
  stiffness?: number
  damping?: number
  mass?: number
}

export interface DampedEntry extends StoreEntry<number> {
  min: number
  max: number
  length: number
  progress: number
  direction: number
}

export class Damped extends Animation<DampedOptions, DampedEntry> {
  public damping = 0.01
  public stiffness = 0
  public mass = 0

  #target = 0
  #direction = 0
  #min = 0
  #max = 0
  #velocity = 0
  #speed = 0

  constructor(initial?: number, options?: DampedOptions) {
    super(initial || 0, options)

    this.#min = nullishCoalescing(options?.min, -Infinity)
    this.#max = nullishCoalescing(options?.max, Infinity)

    this.#target = this.current
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

  public set min(value: number) {
    this.#min = value
    this.#lengthChange()
  }

  public get max() {
    return this.#max
  }

  public set max(value: number) {
    this.#max = value
    this.#lengthChange()
  }

  public get velocity() {
    return this.#velocity
  }

  public get speed() {
    return this.#speed
  }

  public get length() {
    return this.#max - this.#min
  }

  public get progress() {
    return this.length
      ? preciseNumber((this.current - this.#min) / this.length, 6)
      : 0
  }

  public override get entry(): DampedEntry {
    return {
      ...super.entry,
      min: this.#min,
      max: this.#max,
      length: this.length,
      direction: this.direction,
      progress: this.progress,
    }
  }

  public set(value: number, equalize = false) {
    const previous = this.#target

    this.#target = clamp(value, this.#min, this.#max)

    if (equalize) {
      this.current = this.#target
    }

    if (this.#target !== previous) {
      this.#direction = Math.sign(value - this.#target) || 1
      this.listenAnimationFrame()
    }
  }

  public shift(value: number, equalize = false) {
    this.set(this.#target + value, equalize)
  }

  public override reset() {
    this.set(this.initial, true)
    super.reset()
  }

  public override listenAnimationFrame() {
    if (this.current !== this.target) {
      super.listenAnimationFrame()
    }
  }

  public override updateOptions(
    options?:
      | Omit<DampedOptions, keyof StoreOptions<number, keyof StoreManagers>>
      | undefined
  ) {
    super.updateOptions(options)

    this.damping = nullishCoalescing(options?.damping, this.damping)
    this.mass = nullishCoalescing(options?.damping, this.mass)
    this.stiffness = nullishCoalescing(options?.damping, this.stiffness)
  }

  protected override handleAnimationFrame(e: TickerCallbackEntry) {
    if (preciseNumber(this.current, 4) === preciseNumber(this.target, 4)) {
      this.unlistenAnimationFrame()
      this.current = this.target
    }

    const current = this.current

    const delta = Math.abs(current - this.target)

    this.#speed = delta / e.elapsed

    const dt = e.elapsed / 1000

    if (this.mass || this.stiffness) {
      const acceleration =
        (this.#target - this.current) * this.stiffness -
        this.#velocity * this.damping

      this.#velocity += (acceleration / this.mass) * dt

      this.current += this.#velocity * dt
    } else {
      this.current = damp(this.current, this.target, this.damping, dt)
    }
  }

  #lengthChange = () => {
    this.set(this.#target, true)
  }
}
