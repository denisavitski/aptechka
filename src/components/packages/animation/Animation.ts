import { Store, StoreEntry, StoreOptions } from '@packages/store'
import {
  TickerAddOptions,
  TickerCallback,
  TickerCallbackEntry,
  ticker,
} from '@packages/ticker'
import { ElementOrSelector, nullishCoalescing } from '@packages/utils'
import { AnimationLink, AnimationLinkOptions } from './AnimationLink'

export interface AnimationEntry extends StoreEntry<number> {
  length: number
  progress: number
  direction: number
}

export interface AnimationOptions
  extends TickerAddOptions,
    StoreOptions<number> {}

export abstract class Animation<
  Options extends AnimationOptions,
  Entry extends AnimationEntry = AnimationEntry
> extends Store<number, 'number', Entry> {
  #maxFPS: number | undefined
  #order: number | undefined
  #culling: ElementOrSelector | undefined | null | false

  #isRunning = new Store(false)

  #linked: Array<AnimationLink<Entry>> = []
  #linkedTo: Animation<any, any> | null = null

  constructor(initial?: number) {
    super(initial || 0)
  }

  public get isRunning() {
    return this.#isRunning
  }

  public abstract set(value: number): void

  public abstract shift(value: number): void

  public abstract get progress(): number

  public override reset() {
    this.unlistenAnimationFrame()

    super.reset()

    this.#linked.forEach((link) => {
      link.targetAnimation.reset()
    })
  }

  public override close() {
    super.close()

    this.unlistenAnimationFrame()

    this.#linkedTo?.unlink(this)

    this.#linked = []
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
    }
  }

  public updateOptions(options?: Omit<Options, keyof StoreOptions<number>>) {
    this.#maxFPS = nullishCoalescing(options?.maxFPS, this.#maxFPS)
    this.#order = nullishCoalescing(options?.order, this.#order)
    this.#culling = nullishCoalescing(options?.culling, this.#culling)
  }

  public link<A extends Animation<any, any>>(
    animation: A,
    startValue: number,
    setValue: number,
    options?: Parameters<A['updateOptions']>[0] & AnimationLinkOptions
  ) {
    const found = this.#linked.find(
      (link) => link.targetAnimation === animation
    )

    if (!found) {
      const link = new AnimationLink(
        this,
        animation,
        startValue,
        setValue,
        options
      )

      animation.#linkedTo = this

      this.#linked.push(link)
    }
  }

  public unlink(animation: Animation<any, any>) {
    this.#linked = this.#linked.filter((link) => {
      if (link.targetAnimation === animation) {
        link.destroy()
        return false
      }

      return true
    })
  }

  protected abstract handleAnimationFrame(e: TickerCallbackEntry): void

  #animationFrameListener: TickerCallback = (e) => {
    this.handleAnimationFrame(e)
  }
}
