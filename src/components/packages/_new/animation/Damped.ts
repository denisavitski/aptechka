import { Store, StoreEntry, StoreOptions } from '@packages/store'
import { TickerAddOptions, TickerCallback, ticker } from '@packages/ticker'
import {
  ElementOrSelector,
  clamp,
  damp,
  nullishCoalescing,
  preciseNumber,
} from '@packages/utils'

export interface DampedOptions extends TickerAddOptions, StoreOptions<number> {
  damping?: number
  min?: number
  max?: number
}

export interface DampedEntry extends StoreEntry<number> {
  min: number
  max: number
  length: number
  progress: number
  direction: number
  speed: number
}

export class Damped extends Store<number, 'number', DampedEntry> {
  #maxFPS: number | undefined
  #order: number | undefined
  #culling: ElementOrSelector | undefined | null | false
  #damping: number
  #isRunning = new Store(false)
  #direction = 0
  #speed = 0
  #min = 0
  #max = 0
  #target: number

  constructor(initial?: number, options?: DampedOptions) {
    super(initial || 0)

    this.#damping = options?.damping || 0.01
    this.#order = options?.order
    this.#maxFPS = options?.maxFPS
    this.#culling = options?.culling
    this.#min = nullishCoalescing(options?.min, -Infinity)
    this.#max = nullishCoalescing(options?.max, Infinity)
    this.#target = this.current
  }

  public get target() {
    return this.#target
  }

  public get isRunning() {
    return this.#isRunning
  }

  public get direction() {
    return this.#direction
  }

  public get maxFPS() {
    return this.#maxFPS
  }

  public get speed() {
    return this.#speed
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
      speed: this.speed,
    }
  }

  public set(value: number, equalize = false) {
    const previous = this.#target

    this.#target = clamp(value, this.#min, this.#max)

    if (equalize) {
      this.current = this.#target
    }

    if (this.#target !== previous) {
      this.#speed = 0
      this.#direction = Math.sign(value - this.#target) || 1
      this.#startAnimation()
    }
  }

  public shift(value: number, equalize = false) {
    this.set(this.#target + value, equalize)
  }

  public override close() {
    super.close()
    this.#unlistenAnimationFrame()
  }

  public override reset() {
    this.set(this.initial, true)
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
      this.#speed = 0
      this.#isRunning.current = false

      ticker.unsubscribe(this.#animationFrameListener)
    }
  }

  #startAnimation() {
    if (this.#damping) {
      if (this.current !== this.target) {
        this.#listenAnimationFrame()
      }
    } else {
      this.current = this.target
      this.#unlistenAnimationFrame()
    }
  }

  #animationFrameListener: TickerCallback = (e) => {
    const current = this.current

    if (preciseNumber(this.current, 4) === preciseNumber(this.target, 4)) {
      this.#unlistenAnimationFrame()
      this.current = this.target
    }

    this.current = damp(this.current, this.target, this.#damping, e.elapsed)

    const delta = Math.abs(current - this.target)

    this.#speed = delta / e.elapsed
  }

  #lengthChange = () => {
    this.set(this.#target, true)
  }
}
