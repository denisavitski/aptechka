import { ticker, TickerAddOptions, TickerCallback } from '@packages/ticker'
import { Controls } from './Controls'

export interface AutoplayControlsOptions extends TickerAddOptions {
  speed?: number
  interval?: boolean
}

export class AutoplayControls extends Controls {
  direction = 1

  #speed: number
  #interval: boolean

  #options: TickerAddOptions | undefined
  #intervalId: ReturnType<typeof setInterval> | undefined
  #paused = false
  #pauseTimeoutId: ReturnType<typeof setInterval> | undefined

  constructor(options?: AutoplayControlsOptions) {
    super()

    this.#speed = options?.speed || 1
    this.#interval = options?.interval || false

    this.#options = options
  }

  public set interval(value: boolean) {
    this.#interval = value
    this.connect()
  }

  public set speed(value: number) {
    this.#speed = value
    this.connect()
  }

  public connect() {
    this.disconnect()

    if (this.#interval) {
      this.#intervalId = setInterval(
        this.#intervalCallback,
        Math.abs(this.#speed)
      )
    } else {
      ticker.subscribe(this.#animationFrameCallback, this.#options)
    }

    document.addEventListener(
      'visibilitychange',
      this.#documentVisibilityChangeListener
    )
  }

  public disconnect() {
    clearInterval(this.#intervalId)
    ticker.unsubscribe(this.#animationFrameCallback)

    clearInterval(this.#pauseTimeoutId)
    this.#paused = false

    document.removeEventListener(
      'visibilitychange',
      this.#documentVisibilityChangeListener
    )
  }

  public pauseAndContinue(duration: number) {
    if (duration && !this.#paused) {
      clearInterval(this.#pauseTimeoutId)

      this.#paused = true

      this.#pauseTimeoutId = setTimeout(() => {
        this.#paused = false
      }, 3000)
    }
  }

  #animationFrameCallback: TickerCallback = (e) => {
    if (!this.#paused) {
      this.changeEvent.notify(
        'autoplay',
        e.timeBetweenFrames * this.#speed * this.direction
      )
    }
  }

  #intervalCallback = () => {
    if (!this.#paused) {
      this.changeEvent.notify(
        'autoplay',
        Math.sign(this.#speed) * this.direction
      )
    }
  }

  #documentVisibilityChangeListener = () => {
    if (this.#interval) {
      if (document.hidden) {
        this.#paused = true
      } else {
        this.#paused = false
      }
    }
  }
}
