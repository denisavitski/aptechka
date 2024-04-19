import { Store, StoreEntry, StoreOptions } from '@packages/store'
import {
  TickerAddOptions,
  TickerCallback,
  TickerCallbackEntry,
  ticker,
} from '@packages/ticker'
import { ElementOrSelector, nullishCoalescing } from '@packages/utils'

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
  Entry extends StoreEntry<number> = StoreEntry<number>
> extends Store<number, 'number', Entry> {
  #maxFPS: number | undefined
  #order: number | undefined
  #culling: ElementOrSelector | undefined | null | false

  #isRunning = new Store(false)

  constructor(initial?: number) {
    super(initial || 0)
  }

  public get isRunning() {
    return this.#isRunning
  }

  public abstract set(value: number): void

  public abstract shift(value: number): void

  public override reset() {
    this.unlistenAnimationFrame()
    super.reset()
  }

  public override close() {
    super.close()
    this.unlistenAnimationFrame()
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

  protected abstract handleAnimationFrame(e: TickerCallbackEntry): void

  #animationFrameListener: TickerCallback = (e) => {
    this.handleAnimationFrame(e)
  }
}
