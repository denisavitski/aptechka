import { Store, StoreEntry, StoreOptions } from '@packages/store'
import {
  TickerAddOptions,
  TickerCallback,
  TickerCallbackEntry,
  ticker,
} from '@packages/ticker'
import {
  ElementOrSelector,
  clamp,
  nullishCoalescing,
  preciseNumber,
} from '@packages/utils'
import { AnimationLink, AnimationLinkOptions } from './AnimationLink'
import { TICK_ORDER } from '@packages/order'

export interface AnimationEntry extends StoreEntry<number> {
  currentDistance: number
  distance: number
  currentProgress: number
  progress: number
  direction: number
}

export interface AnimationOptions extends TickerAddOptions {
  min?: number
  max?: number
  equalize?: boolean
}

export type AnimationConstructorOptions<Options extends AnimationOptions> =
  StoreOptions<number, 'number'> & Options

export abstract class Animation<
  Entry extends AnimationEntry = AnimationEntry,
  Options extends AnimationOptions = AnimationOptions
> extends Store<number, 'number', Entry> {
  #maxFPS: number | undefined
  #order = TICK_ORDER.ANIMATION
  #culling: ElementOrSelector | undefined | null | false

  #isRunning = new Store(false)

  #linked: Set<AnimationLink> = new Set()
  #animationLink: AnimationLink | null = null

  #direction = 0
  #target = 0

  #min = -Infinity
  #max = Infinity

  #from = 0
  #to = 1

  constructor(initial?: number, options?: StoreOptions<number, 'number'>) {
    super(initial || 0, options)
  }

  public get linked() {
    return this.#linked
  }

  public get animationLink() {
    return this.#animationLink
  }

  public get direction() {
    return this.#direction
  }

  public get target() {
    return this.#target
  }

  public get min() {
    return this.#min
  }

  public set min(value: number) {
    this.#min = value

    //@ts-ignore
    this.set(this.#target, {
      equalize: true,
    })
  }

  public get max() {
    return this.#max
  }

  public set max(value: number) {
    this.#max = value

    //@ts-ignore
    this.set(this.#target, {
      equalize: true,
    })
  }

  public get from() {
    return this.#from
  }

  public get to() {
    return this.#to
  }

  public get isRunning() {
    return this.#isRunning
  }

  public get currentDistance() {
    return Math.abs(this.#to - this.#from)
  }

  public get distance() {
    return Math.abs(this.#max - this.#min)
  }

  public get currentProgress() {
    return this.currentDistance
      ? preciseNumber(
          Math.abs(this.current - this.#from) / this.currentDistance,
          6
        )
      : 0
  }

  public get progress() {
    return this.distance
      ? preciseNumber(Math.abs(this.current - this.#min) / this.distance, 6)
      : 0
  }

  public override get entry() {
    return {
      ...super.entry,
      from: this.#from,
      to: this.#to,
      currentDistance: this.currentDistance,
      distance: this.distance,
      direction: this.direction,
      currentProgress: this.currentProgress,
      progress: this.progress,
    }
  }

  public setTarget(value: number) {
    this.#direction = Math.sign(value - this.#target)

    this.#target = clamp(value, this.#min, this.#max)

    this.#from = this.current
    this.#to = value
  }

  public set(value: number, options?: Options) {
    if (this.#target !== value) {
      this.setTarget(value)

      if (options) {
        this.updateOptions(options)
      }

      if (this.#target !== this.current) {
        this.start()
      }
    }
  }

  public shift(value: number, options?: Options) {
    this.set(this.#target + value, options)
  }

  public override reset() {
    //@ts-ignore
    this.set(this.initial, { equalize: true })

    super.reset()

    this.#linked.forEach((link) => {
      link.targetAnimation.reset()
    })
  }

  public override close() {
    super.close()

    this.unlistenAnimationFrame()

    this.unlink()

    this.#linked.clear()
  }

  public listenAnimationFrame() {
    if (!this.#isRunning.current) {
      this.#isRunning.current = true

      ticker.subscribe(this.#animationFrameListener, {
        maxFPS: this.#maxFPS,
        order: this.#order,
        culling: this.#culling,
      })
    }
  }

  public unlistenAnimationFrame() {
    if (this.#isRunning.current) {
      this.#isRunning.current = false

      ticker.unsubscribe(this.#animationFrameListener)

      this.#linked.forEach((link) => {
        link.targetAnimation.unlistenAnimationFrame()
      })
    }
  }

  public updateOptions(options?: AnimationOptions) {
    this.#maxFPS = nullishCoalescing(options?.maxFPS, this.#maxFPS)
    this.#order = nullishCoalescing(options?.order, this.#order)
    this.#culling = nullishCoalescing(options?.culling, this.#culling)
    this.#min = nullishCoalescing(options?.min, this.#min)
    this.#max = nullishCoalescing(options?.max, this.#max)

    if (options?.equalize) {
      this.unlistenAnimationFrame()
      this.current = this.#target
    }
  }

  public linkTo<A extends Animation<any>>(
    animation: A,
    startValue: number,
    setValue: number,
    options?: Parameters<A['updateOptions']>[0] & AnimationLinkOptions
  ) {
    this.unlink()

    this.#animationLink = new AnimationLink(
      animation,
      this,
      startValue,
      setValue,
      options
    )
  }

  public unlink() {
    if (this.#animationLink) {
      this.#animationLink.destroy()
      this.#animationLink = null
    }
  }

  protected start() {
    this.listenAnimationFrame()
  }

  protected abstract handleAnimationFrame(e: TickerCallbackEntry): void
  protected abstract updateManually(...args: any[]): any

  #animationFrameListener: TickerCallback = (e) => {
    this.handleAnimationFrame(e)
  }
}
