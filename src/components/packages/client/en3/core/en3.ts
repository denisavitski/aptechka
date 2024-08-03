import { RESIZE_ORDER, TICK_ORDER } from '@packages/client/order'
import { windowResizer } from '@packages/client/window-resizer'
import { ticker, TickerCallback } from '@packages/client/ticker'
import { ElementOrSelector, getElement } from '@packages/client/utils'
import { REVISION, WebGLRenderer, WebGLRendererParameters } from 'three'
import { En3View, En3ViewOptions } from './En3View'
import { en3Cache } from './en3Cache'
import { En3Raycaster } from './En3Raycaster'
import type { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'

export interface En3Options {
  webGLRendererParameters?: WebGLRendererParameters
  maxPixelRatio?: number
  containerElement?: ElementOrSelector<HTMLElement>
  view?: En3ViewOptions
  cacheAssets?: boolean
  zIndex?: number
  composer?: typeof EffectComposer
}

class En3 {
  #CDNVersion = `https://unpkg.com/three@0.${REVISION}.x`

  #containerElement: HTMLElement = null!

  #webglRenderer: WebGLRenderer = null!

  #raycaster: En3Raycaster = null!

  #views: Map<string, En3View> = new Map()

  #width = 0
  #height = 0

  #pixelRatio = 0
  #maxPixelRatio = 2

  #isCreated = false
  #cacheAssets = false

  #composer: EffectComposer = null!

  public get CDNVersion() {
    return this.#CDNVersion
  }

  public get containerElement() {
    return this.#containerElement
  }

  public get webglRenderer() {
    return this.#webglRenderer
  }

  public get raycaster() {
    return this.#raycaster
  }

  public get views() {
    return this.#views
  }

  public get view() {
    return this.getView('default')
  }

  public get camera() {
    return this.getView('default').camera
  }

  public get scene() {
    return this.getView('default').scene
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

  public get cacheAssets() {
    return this.#cacheAssets
  }

  public get composer() {
    return this.#composer
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
      z-index: ${options?.zIndex || 0};
    `

    const parentElement =
      this.#containerElement.shadowRoot || this.#containerElement

    parentElement.append(this.#webglRenderer.domElement)

    this.#views.set(
      'default',
      new En3View('default', {
        sizeElement: this.#containerElement,
        ...options?.view,
      })
    )

    this.#raycaster = new En3Raycaster()

    if (options?.composer) {
      this.#composer = new options.composer(this.#webglRenderer)

      this.render = () => {
        this.#composer.render()
      }
    }

    this.#cacheAssets = options?.cacheAssets || false

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

    this.#raycaster.destroy()

    this.#views.forEach((view) => {
      view.destroy()
    })

    this.#webglRenderer.dispose()
    this.#webglRenderer.domElement.remove()
    this.#webglRenderer = null!
    this.#composer.dispose()
    this.#composer = null!

    this.#isCreated = false

    en3Cache.forEach((v) => {
      v.dispose()
    })

    en3Cache.clear()
  }

  public createView(viewName: string, viewOptions?: En3ViewOptions) {
    const size = this.#views.size

    const view = new En3View(viewName, viewOptions)

    this.#views.set(viewName, view)

    if (size === 1) {
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
    if (this.#views.size > 1 || this.view.isClipped) {
      const left =
        view.box.left + view.box.CSSTranslation.x + view.box.scrollValue.x

      const top =
        en3.height -
        view.box.height -
        view.box.top +
        view.box.CSSTranslation.y +
        view.box.scrollValue.y * -1

      this.#webglRenderer.setScissor(left, top, view.box.width, view.box.height)

      this.#webglRenderer.setViewport(
        left,
        top,
        view.box.width,
        view.box.height
      )
    }

    view.beforeRenderCallback?.()

    this.#webglRenderer.render(view.scene, view.camera)
  }

  #resizeListener = () => {
    this.#width = this.#containerElement.clientWidth
    this.#height = this.#containerElement.clientHeight

    this.#pixelRatio = Math.min(this.#maxPixelRatio, devicePixelRatio || 1)
    this.#webglRenderer.setPixelRatio(this.#pixelRatio)
    this.#webglRenderer.setSize(this.#width, this.#height)

    if (this.#composer) {
      this.#composer.setPixelRatio(this.#pixelRatio)
      this.#composer.setSize(this.#width, this.#height)
    }
  }

  #tickListener: TickerCallback = () => {
    this.#webglRenderer.setRenderTarget(null)

    this.#views.forEach((view) => {
      this.render(view)
    })
  }
}

export const en3 = new En3()
