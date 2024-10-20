import { ticker, TickerAddOptions, TickerCallback } from '@packages/ticker'
import { Tweened } from '@packages/animation'
import { easeInQuad } from '@packages/utils'
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
  #paused = new Tweened(0, { easing: easeInQuad })
  #pauseTimeoutId: ReturnType<typeof setInterval> | undefined

  #connected = false

  constructor(options?: AutoplayControlsOptions) {
    super()

    this.#speed = options?.speed || 1
    this.#interval = options?.interval || false

    this.#options = options
  }

  public set interval(value: boolean) {
    this.#interval = value

    if (this.#connected) {
      this.#setup()
    }
  }

  public set speed(value: number) {
    this.#speed = value

    if (this.#connected) {
      this.#setup()
    }
  }

  public connect() {
    if (!this.#connected) {
      this.#connected = true
      this.#setup()
    }
  }

  public disconnect() {
    if (this.#connected) {
      this.#connected = false
      this.#clear()
    }
  }

  public pauseAndContinue(duration: number, instant?: boolean) {
    if (this.#connected && duration) {
      clearTimeout(this.#pauseTimeoutId)

      this.#paused.set(1, {
        duration: Math.min(duration, 1000),
        equalize: instant,
      })

      this.#pauseTimeoutId = setTimeout(() => {
        this.#paused.set(0, {
          duration: Math.min(duration, 5000),
          equalize: instant,
        })
      }, duration)
    }
  }

  #setup() {
    this.#clear()

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

  #clear() {
    clearInterval(this.#intervalId)
    ticker.unsubscribe(this.#animationFrameCallback)

    clearTimeout(this.#pauseTimeoutId)
    this.#paused.close()

    document.removeEventListener(
      'visibilitychange',
      this.#documentVisibilityChangeListener
    )
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
