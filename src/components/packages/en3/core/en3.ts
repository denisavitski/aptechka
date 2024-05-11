import { RESIZE_ORDER, TICK_ORDER } from '@packages/order'
import { windowResizer } from '@packages/window-resizer'
import { ticker, TickerCallback } from '@packages/ticker'
import { ElementOrSelector, getElement } from '@packages/utils'
import { REVISION, WebGLRenderer, WebGLRendererParameters } from 'three'
import { En3View, En3ViewOptions } from './En3View'

export interface En3Options {
  webGLRendererParameters?: WebGLRendererParameters
  maxPixelRatio?: number
  containerElement?: ElementOrSelector<HTMLElement>
  view?: En3ViewOptions
}

class En3 {
  #CDNVersion = `https://unpkg.com/three@0.${REVISION}.x`

  #containerElement: HTMLElement = null!

  #webglRenderer: WebGLRenderer = null!

  #views: Map<string, En3View> = new Map()

  #width = 0
  #height = 0

  #pixelRatio = 0
  #maxPixelRatio = 2

  #isCreated = false

  public get CDNVersion() {
    return this.#CDNVersion
  }

  public get containerElement() {
    return this.#containerElement
  }

  public get webglRenderer() {
    return this.#webglRenderer
  }

  public get views() {
    return this.#views
  }

  public get view() {
    return this.getView('default')
  }

  public get width() {
    return this.#width
  }

  public get height() {
    return this.#height
  }

  public get pixelRatio() {
    return this.#pixelRatio
  }

  public setup(options?: En3Options) {
    if (this.#isCreated) {
      console.warn('[en3.setup]: You are trying to setup en3 again.')
      return
    }

    this.#containerElement =
      getElement(options?.containerElement) || document.body

    this.#maxPixelRatio = options?.maxPixelRatio || 2

    this.#webglRenderer = new WebGLRenderer(options?.webGLRendererParameters)

    this.#webglRenderer.domElement.style.cssText = `
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    `

    this.#containerElement.append(this.#webglRenderer.domElement)

    this.#views.set('default', new En3View('default', options?.view))

    this.#isCreated = true

    windowResizer.subscribe(this.#resizeListener, RESIZE_ORDER.EN3)
    ticker.subscribe(this.#tickListener, { order: TICK_ORDER.EN3 })
  }

  public destroy() {
    if (!this.#isCreated) {
      console.warn(
        '[en3.setup]: You are trying to destory en3 but it has not been initialized.'
      )
      return
    }

    windowResizer.unsubscribe(this.#resizeListener)
    ticker.unsubscribe(this.#tickListener)

    this.#views.forEach((view) => {
      view.destroy()
    })

    this.#webglRenderer.dispose()
    this.#webglRenderer.domElement.remove()
    this.#webglRenderer = null!

    this.#isCreated = false
  }

  public createView(viewName: string, viewOptions?: En3ViewOptions) {
    const size = this.#views.size

    const view = new En3View(viewName, viewOptions)

    this.#views.set(viewName, view)

    view.resize()

    if (size <= 1) {
      this.#webglRenderer.setScissorTest(true)
    }

    return view
  }

  public getView(viewName: string) {
    return this.#views.get(viewName)!
  }

  public destroyView(viewName: string) {
    const view = this.#views.get(viewName)

    if (view) {
      this.#views.delete(viewName)

      view.destroy()

      if (this.#views.size <= 1) {
        this.#webglRenderer.setScissorTest(false)
      }
    }
  }

  public render(view: En3View) {
    if (this.#views.size > 1) {
      this.#webglRenderer.setScissor(
        view.left,
        view.top,
        view.width,
        view.height
      )

      this.#webglRenderer.setViewport(
        view.left,
        view.top,
        view.width,
        view.height
      )
    }

    view.beforeRenderCallback?.()

    this.#webglRenderer.render(view.scene, view.camera)
  }

  public onResize?(): void

  #resizeListener = () => {
    this.#width = this.#containerElement.clientWidth
    this.#height = this.#containerElement.clientHeight

    this.#pixelRatio = Math.min(this.#maxPixelRatio, devicePixelRatio || 1)
    this.#webglRenderer.setPixelRatio(this.#pixelRatio)
    this.#webglRenderer.setSize(this.#width, this.#height)

    this.#views.forEach((view) => {
      view.resize()
    })

    this.onResize?.()
  }

  #tickListener: TickerCallback = () => {
    this.#webglRenderer.setRenderTarget(null)

    this.#views.forEach((view) => {
      this.render(view)
    })
  }
}

export const en3 = new En3()
