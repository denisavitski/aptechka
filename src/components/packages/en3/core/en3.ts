import { Ladder } from '@packages/ladder'
import { LayoutBox, LayoutBoxOptions } from '@packages/layout-box'
import { RESIZE_ORDER, TICK_ORDER } from '@packages/order'
import { windowResizer } from '@packages/window-resizer'
import { ticker, TickerCallback } from '@packages/ticker'
import { ElementOrSelector } from '@packages/utils'
import {
  Object3D,
  OrthographicCamera,
  PerspectiveCamera,
  REVISION,
  Scene,
  WebGLRenderer,
  WebGLRendererParameters,
} from 'three'
import { dispose } from '../utils/dispose'
import { En3Raycaster } from './En3Raycaster'

export type En3AttachedObject3D<T extends Object3D> = T & {
  userData: {
    box: LayoutBox
  }
}

export interface En3Parameters {
  containerElement?: HTMLElement
  webGLRendererParameters?: WebGLRendererParameters
  maxPixelRatio?: number
  cameraAutoUpdate?: boolean
  cameraType?: 'perspective' | 'orthographic'
  cameraDistance?: number
  cameraNear?: number
  cameraFar?: number
  cameraFov?: 'auto' | number
}

export type En3AttachOptions = Omit<
  LayoutBoxOptions,
  'containerElement' | 'cartesian'
>

class En3 {
  #CDNVersion = `https://unpkg.com/three@0.${REVISION}.x`

  #containerElement: HTMLElement = null!

  #webglRenderer: WebGLRenderer = null!

  #camera: PerspectiveCamera | OrthographicCamera = null!
  #scene: Scene = null!

  #raycaster: En3Raycaster = null!

  #attachedObjects: Array<En3AttachedObject3D<Object3D>> = []

  #cameraPosition = new Ladder({
    x: 0,
    y: 0,
    z: 0,
  })

  #cameraRotation = new Ladder({
    x: 0,
    y: 0,
    z: 0,
  })

  #cameraFov: 'auto' | number = 'auto'

  #width = 0
  #height = 0

  #pixelRatio = 0
  #maxPixelRatio = 2

  #isCameraAutoUpdate = true
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

  public get camera() {
    return this.#camera
  }

  public get scene() {
    return this.#scene
  }

  public get raycaster() {
    return this.#raycaster
  }

  public get attachedObjects() {
    return this.#attachedObjects
  }

  public get cameraPosition() {
    return this.#cameraPosition
  }

  public get cameraRotation() {
    return this.#cameraRotation
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

  public get cameraDistance() {
    return this.#cameraPosition.getStepValue('_initial').z
  }

  public set cameraDistance(value: number) {
    this.#cameraPosition.setStep('_initial', '+', {
      z: value,
    })

    this.#cameraPosition.calculate()

    this.#resizeCamera()
  }

  public attachToHTMLElement<T extends Object3D>(
    element: ElementOrSelector<HTMLElement>,
    object: T,
    options?: En3AttachOptions
  ) {
    const box = new LayoutBox(element, {
      ...options,
      containerElement: this.containerElement,
      cartesian: true,
    })

    box.bindObject(object)

    object.userData.box = box

    this.#attachedObjects.push(object as any)

    return object as En3AttachedObject3D<T>
  }

  public detachFromHTMLElement(object: Object3D) {
    this.#attachedObjects = this.#attachedObjects.filter((o) => {
      if (o === object) {
        const data = (object as En3AttachedObject3D<Object3D>).userData

        data.box.destroy()

        return false
      }

      return true
    })
  }

  public add<T extends Object3D<any>>(object: T): T
  public add<T extends Object3D<any>>(
    object: T,
    element: ElementOrSelector<HTMLElement>,
    options?: En3AttachOptions
  ): En3AttachedObject3D<T>
  public add<T extends Object3D<any>>(...args: Array<any>): any {
    const object = args[0] as T
    const element = args[1] as ElementOrSelector<HTMLElement>
    const options = args[2] as En3AttachOptions

    this.scene.add(object)

    if (element) {
      return this.attachToHTMLElement<T>(element, object, options)
    }

    return object
  }

  public remove(object: Object3D, detach?: boolean) {
    this.scene.remove(object)

    if (detach) {
      this.detachFromHTMLElement(object)
    }
  }

  public setup(options?: En3Parameters) {
    if (this.#isCreated) {
      console.warn('[en3.setup]: You are trying to setup en3 again.')
      return
    }

    this.#containerElement = options?.containerElement || document.body

    this.#camera =
      options?.cameraType === 'orthographic'
        ? new OrthographicCamera()
        : new PerspectiveCamera()

    this.#cameraPosition.bind(this.#camera.position)
    this.#cameraRotation.bind(this.#camera.rotation)

    this.#cameraPosition.setStep('_initial', '+', {
      z: options?.cameraDistance || 1000,
    })

    this.#cameraPosition.calculate()

    this.#camera.near = options?.cameraNear || 1
    this.#camera.far = options?.cameraFar || 11000
    this.#cameraFov = options?.cameraFov || 'auto'

    this.#scene = new Scene()

    this.#maxPixelRatio = options?.maxPixelRatio || 2

    this.#isCameraAutoUpdate =
      options?.cameraAutoUpdate === false ? false : true

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

    this.#raycaster = new En3Raycaster()

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

    this.#attachedObjects.forEach((object) => {
      object.userData.box.destroy()
    })

    windowResizer.unsubscribe(this.#resizeListener)
    ticker.unsubscribe(this.#tickListener)

    this.scene.clear()

    dispose(this.scene)

    this.#webglRenderer.dispose()
    this.#webglRenderer.domElement.remove()
    this.#webglRenderer = null!

    this.#raycaster.destroy()

    this.#isCreated = false
  }

  public render(scene: Scene, camera: OrthographicCamera | PerspectiveCamera) {
    this.#webglRenderer.setRenderTarget(null)
    this.#webglRenderer.render(scene, camera)
  }

  public onResize?(): void

  #update() {
    if (this.#isCameraAutoUpdate) {
      this.#cameraPosition.calculate()
      this.#cameraRotation.calculate()
    }
  }

  #resizeCamera() {
    if (this.camera instanceof PerspectiveCamera) {
      this.camera.aspect = this.#width / this.#height
      this.camera.fov =
        this.#cameraFov === 'auto'
          ? 2 *
            Math.atan(
              this.#height / 2 / this.#cameraPosition.getStepValue('_initial').z
            ) *
            (180 / Math.PI)
          : this.#cameraFov
    } else if (this.camera instanceof OrthographicCamera) {
      this.camera.left = this.#width / -2
      this.camera.right = this.#width / 2
      this.camera.top = this.#height / 2
      this.camera.bottom = this.#height / -2
    }

    this.camera.updateProjectionMatrix()
  }

  #resizeListener = () => {
    this.#width = this.#containerElement.clientWidth
    this.#height = this.#containerElement.clientHeight
    this.#pixelRatio = Math.min(this.#maxPixelRatio, devicePixelRatio || 1)
    this.#webglRenderer.setPixelRatio(this.#pixelRatio)
    this.#webglRenderer.setSize(this.#width, this.#height)
    this.#resizeCamera()
    this.onResize?.()
  }

  #tickListener: TickerCallback = () => {
    this.#update()
    this.render(this.#scene, this.#camera)
  }
}

export const en3 = new En3()
