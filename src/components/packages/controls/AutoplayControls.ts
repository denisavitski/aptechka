import { ticker, TickerAddOptions, TickerCallback } from '@packages/ticker'
import { Controls } from './Controls'
import { Tweened } from '@packages/animation'
import { easeInOutQuad } from '@packages/utils'

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
  #paused = new Tweened(0, { easing: easeInOutQuad })
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
    this.#paused.close()

    document.removeEventListener(
      'visibilitychange',
      this.#documentVisibilityChangeListener
    )
  }

  public pauseAndContinue(duration: number) {
    if (duration && !this.#paused.target) {
      clearInterval(this.#pauseTimeoutId)

      this.#paused.set(1, { duration: Math.min(duration, 1000) })

      this.#pauseTimeoutId = setTimeout(() => {
        this.#paused.set(0, { duration: Math.min(duration, 5000) })
      }, duration)
    }
  }

  #animationFrameCallback: TickerCallback = (e) => {
    if (this.#paused.current !== 1) {
      this.changeEvent.notify(
        'autoplay',
        e.timeBetweenFrames *
          this.#speed *
          this.direction *
          (1 - this.#paused.current)
      )
    }
  }

  #intervalCallback = () => {
    if (this.#paused.current !== 1) {
      this.changeEvent.notify(
        'autoplay',
        Math.sign(this.#speed) * this.direction * (1 - this.#paused.current)
      )
    }
  }

  #documentVisibilityChangeListener = () => {
    if (this.#interval) {
      if (document.hidden) {
        this.#paused.set(1, { equalize: true })
      } else {
        this.#paused.set(0, { equalize: true })
      }
    }
  }
}
