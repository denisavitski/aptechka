import { StoreOptions, StoreEntry, Store, StoreCallback } from '@packages/store'
import { ticker, TickerCallbackEntry, TickerCallback, TickerAddOptions } from '@packages/ticker'
import { ElementOrSelector, clamp, fix } from '@packages/utils'

export interface AnimatedOptions extends StoreOptions<number>, TickerAddOptions {
  min?: number | AnimatedEdgeFunction
  max?: number | AnimatedEdgeFunction
}

export type AnimatedEdgeFunction = () => number

export interface AnimatedEntry extends StoreEntry<number> {
  min: number
  max: number
  delta: number
  progress: number
  direction: number
  speed: number
}

export abstract class Animated<Entry extends AnimatedEntry = AnimatedEntry> extends Store<
  number,
  Entry
> {
  #maxFPS: number | undefined
  #order: number | undefined
  #culling: ElementOrSelector | undefined
  #target: number
  #min: AnimatedEdgeFunction
  #max: AnimatedEdgeFunction
  #setter: Animated | undefined
  #isRunning = new Store(false)
  #direction = 0
  #speed = 0

  constructor(options?: AnimatedOptions) {
    super(0, options)

    this.#order = options?.order
    this.#maxFPS = options?.maxFPS
    this.#culling = options?.culling
    this.#min = this.#getEdgeFunction(options?.min)
    this.#max = this.#getEdgeFunction(options?.max)
    this.#target = this.current = 0
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

  public get min(): number {
    return this.#min()
  }

  public set min(value: number | AnimatedEdgeFunction | undefined) {
    this.#min = this.#getEdgeFunction(value)
    this.set(this.#target)
    this.current = this.#target
  }

  public get max(): number {
    return this.#max()
  }

  public set max(value: number | AnimatedEdgeFunction | undefined) {
    this.#max = this.#getEdgeFunction(value)
    this.set(this.#target)
    this.current = this.#target
  }

  public get delta() {
    return this.max - this.min
  }

  public get progress() {
    return this.delta ? fix((this.current - this.min) / this.delta, 6) : 0
  }

  public override get entry(): Entry {
    return {
      ...super.entry,
      min: this.min,
      max: this.max,
      delta: this.delta,
      direction: this.direction,
      progress: this.progress,
      speed: this.speed,
    }
  }

  public get setter() {
    return this.#setter
  }

  public set setter(animated: Animated | undefined) {
    this.#setter?.unsubscribe(this.#setterListener)
    this.#setter = animated
    this.#setter?.subscribe(this.#setterListener)
  }

  public set(value: number, equalize = false) {
    const previous = this.#target

    this.#target = clamp(value, this.min, this.max)

    if (equalize) {
      this.current = this.#target
    }

    if (this.#target !== previous) {
      this.#speed = 0
      this.#direction = Math.sign(value - this.#target) || 1
      this.update()
    }
  }

  public shift(value: number, equalize = false) {
    this.set(this.#target + value, equalize)
  }

  public override close() {
    super.close()

    this.unlistenAnimationFrame()

    this.#setter?.unsubscribe(this.#setterListener)
    this.#setter = undefined
  }

  public override reset() {
    this.set(this.initial, true)
    super.reset()
    this.unlistenAnimationFrame()
  }

  public listenAnimationFrame() {
    this.#isRunning.current = true
    ticker.subscribe(this.#animationFrameListener, {
      maxFPS: this.#maxFPS,
      order: this.#order,
      culling: this.#culling,
    })
  }

  public unlistenAnimationFrame() {
    this.#speed = 0
    this.#isRunning.current = false
    ticker.unsubscribe(this.#animationFrameListener)
  }

  protected abstract update(): void

  protected abstract handleAnimationFrame(e: TickerCallbackEntry): void

  #setterListener: StoreCallback<AnimatedEntry> = (e) => {
    this.set(e.current)
  }

  #animationFrameListener: TickerCallback = (e) => {
    const current = this.current

    this.handleAnimationFrame(e)

    const delta = Math.abs(current - this.target)

    this.#speed = delta / e.elapsed
  }

  #getEdgeFunction(value: number | AnimatedEdgeFunction | undefined) {
    const v = value || 0
    return typeof v === 'function' ? v : () => v
  }
}
