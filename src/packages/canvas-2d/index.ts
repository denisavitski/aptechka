import { define, CustomElement } from '$packages/custom-element'
import { Notifier } from '$packages/notifier'
import { resizer } from '$packages/resizer'
import { ticker, TickerCallback } from '$packages/ticker'
import { clamp } from '$packages/utils'

export interface Canvas2DRenderDetail {
  pixelRatio: number
  width: number
  height: number
  element: HTMLElement
  canvasElement: HTMLElement
  context: CanvasRenderingContext2D
  timestamp: number
  elapsed: number
}

export type Canvas2DRenderCallback = (detail: Canvas2DRenderDetail) => void

@define('canvas-2d')
export class Canvas2DElement extends CustomElement {
  #renderEvent = new Notifier<Canvas2DRenderCallback>()

  #canvasElement: HTMLCanvasElement = null!
  #context: CanvasRenderingContext2D = null!

  #width = 0
  #height = 0
  #pixelRatio = 1

  #timestamp = 0
  #elapsed = 1

  public get renderEvent() {
    return this.#renderEvent
  }

  public get canvasElement() {
    return this.#canvasElement
  }

  public get context() {
    return this.#context
  }

  public get pixelRatio() {
    return this.#pixelRatio
  }

  public get width() {
    return this.#width
  }

  public get height() {
    return this.#height
  }

  public get detail(): Canvas2DRenderDetail {
    return {
      width: this.#width,
      height: this.#height,
      element: this,
      canvasElement: this.#canvasElement,
      pixelRatio: this.#pixelRatio,
      context: this.#context,
      timestamp: this.#timestamp,
      elapsed: this.#elapsed,
    }
  }

  protected connectedCallback() {
    this.style.display = 'block'
    this.style.width = '100%'
    this.style.height = '100%'

    this.#canvasElement = document.createElement('canvas')

    this.#canvasElement.style.cssText = `
      display: block;
      width: 100%;
      height: 100%;
    `

    this.#context = this.#canvasElement.getContext('2d')!

    this.appendChild(this.#canvasElement)

    resizer.subscribe(this.#resizeListener)

    if (!this.hasAttribute('static')) {
      ticker.subscribe(this.#tickListener, {
        culling: this,
        maxFPS: this.hasAttribute('fps') ? parseInt(this.getAttribute('fps')!) : undefined,
      })
    }
  }

  protected disconnectedCallback() {
    resizer.unsubscribe(this.#resizeListener)
    ticker.unsubscribe(this.#tickListener)

    this.#renderEvent.close()
    this.#canvasElement.remove()
    this.style.display = ''
    this.style.width = ''
    this.style.height = ''
  }

  #resizeListener = () => {
    this.#pixelRatio = clamp(devicePixelRatio, 1, 2)

    const rect = this.getBoundingClientRect()

    this.#width = rect.width
    this.#height = rect.height

    this.#canvasElement.width = this.#width * this.pixelRatio
    this.#canvasElement.height = this.#height * this.pixelRatio

    this.context.scale(this.pixelRatio, this.pixelRatio)

    this.renderEvent.notify(this.detail)
  }

  #tickListener: TickerCallback = (e) => {
    this.#timestamp = e.timestamp
    this.#elapsed = e.elapsed

    this.#renderEvent.notify(this.detail)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'canvas-2d': Canvas2DElement
  }
}
