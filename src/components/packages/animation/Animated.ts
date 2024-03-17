import {
  StoreOptions,
  StoreEntry,
  Store,
  StoreCallback,
  StorePassport,
} from '@packages/store'
import {
  ticker,
  TickerCallbackEntry,
  TickerCallback,
  TickerAddOptions,
} from '@packages/ticker'
import { ElementOrSelector, clamp, preciseNumber } from '@packages/utils'

export interface AnimatedOptions
  extends StoreOptions<number, 'number'>,
    TickerAddOptions {
  min?: number | Store<number>
  max?: number | Store<number>
  default?: number
}

export interface AnimatedEntry extends StoreEntry<number> {
  min: number
  max: number
  delta: number
  progress: number
  direction: number
  speed: number
}

export abstract class Animated<
  Entry extends AnimatedEntry = AnimatedEntry
> extends Store<number, 'number', Entry> {
  #maxFPS: number | undefined
  #order: number | undefined
  #culling: ElementOrSelector | undefined | null | false
  #target: number
  #min: Store<number>
  #max: Store<number>
  #updater = new Store<Animated | null>(null)
  #isRunning = new Store(false)
  #direction = 0
  #speed = 0

  constructor(options?: AnimatedOptions) {
    super(options?.default || 0, options)

    this.#order = options?.order
    this.#maxFPS = options?.maxFPS
    this.#culling = options?.culling
    this.#target = this.current

    let minPassport: StorePassport | undefined
    let maxPassport: StorePassport | undefined

    if (options?.passport) {
      minPassport = {
        name: `${options.passport.name + '-min'}`,
      }

      maxPassport = {
        name: `${options.passport.name + '-max'}`,
      }
    }

    this.#min =
      options?.min instanceof Store
        ? options.min
        : new Store(options?.min ?? 0, { passport: minPassport })

    this.#max =
      options?.max instanceof Store
        ? options.max
        : new Store(options?.max ?? 1, { passport: maxPassport })

    this.#min.subscribe(this.#edgeChangeListener)
    this.#max.subscribe(this.#edgeChangeListener)

    this.#updater.subscribe((e) => {
      e.previous?.unsubscribe(this.#updaterListener)
      e.current?.subscribe(this.#updaterListener)
    })
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

  public get max() {
    return this.#max
  }

  public get delta() {
    return this.#max.current - this.#min.current
  }

  public get progress() {
    return this.delta
      ? preciseNumber((this.current - this.min.current) / this.delta, 6)
      : 0
  }

  public override get entry(): Entry {
    return {
      ...super.entry,
      min: this.#min.current,
      max: this.#max.current,
      delta: this.delta,
      direction: this.direction,
      progress: this.progress,
      speed: this.speed,
    }
  }

  public get updater() {
    return this.#updater
  }

  public set(value: number, equalize = false) {
    const previous = this.#target

    this.#target = clamp(value, this.#min.current, this.#max.current)

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

    this.#updater.current = null
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

  #updaterListener: StoreCallback<AnimatedEntry> = (e) => {
    this.set(e.current)
  }

  #animationFrameListener: TickerCallback = (e) => {
    const current = this.current

    this.handleAnimationFrame(e)

    const delta = Math.abs(current - this.target)

    this.#speed = delta / e.elapsed
  }

  #edgeChangeListener = () => {
    this.set(this.#target)
    this.current = this.#target
  }
}
