import { ticker, TickerCallback } from '@packages/ticker'
import { Controls } from './Controls'

export interface LinearControlsOptions {
  speed?: number
}

export class LinearControls extends Controls {
  speed: number

  constructor(options?: LinearControlsOptions) {
    super()
    this.speed = options?.speed || 1
  }

  public connect() {
    ticker.subscribe(this.#animationFrameCallback)
  }

  public disconnect() {
    ticker.unsubscribe(this.#animationFrameCallback)
  }

  #animationFrameCallback: TickerCallback = (e) => {
    this.changeEvent.notify('linear', e.elapsed * this.speed)
  }
}
