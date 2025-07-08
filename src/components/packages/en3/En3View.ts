import { LayoutBox, LayoutBoxOptions } from '@packages/layout-box'
import { debounce, ElementOrSelector, getElement } from '@packages/utils'
import { Object3D, OrthographicCamera, PerspectiveCamera, Scene } from 'three'
import { dispose } from './utils/dispose'
import { En3 } from './En3'

export interface En3ViewOptions {
  cameraType?: 'perspective' | 'orthographic'
  cameraDistance?: number
  cameraNear?: number
  cameraFar?: number
  cameraFov?: 'auto' | number
  sizeElement?: ElementOrSelector<HTMLElement>
  beforeRender?: () => void
}

export type En3AttachedObject3D<T extends Object3D> = T & {
  userData: {
    box: LayoutBox
  }
}

export type En3AttachOptions = Omit<
  LayoutBoxOptions,
  'containerElement' | 'cartesian' | 'scrollStep'
>

export type En3ViewBeforeRenderCallback = () => void

export class En3View {
  #en3: En3

  #name: string

  #camera: PerspectiveCamera | OrthographicCamera
  #scene: Scene

  #attachedObjects: Array<En3AttachedObject3D<Object3D>>

  #cameraDistance: number

  #cameraFov: 'auto' | number

  #sizeElement: HTMLElement

  public beforeRenderCallback: En3ViewBeforeRenderCallback | undefined

  #box: LayoutBox

  constructor(en3: En3, name: string, options?: En3ViewOptions) {
    this.#en3 = en3
    this.#name = name

    this.#camera =
      options?.cameraType === 'orthographic'
        ? new OrthographicCamera()
        : new PerspectiveCamera()

    this.#scene = new Scene()

    this.#attachedObjects = []

    this.#cameraDistance = options?.cameraDistance || 1000
    this.#camera.near = options?.cameraNear || 1
    this.#camera.far = options?.cameraFar || 11000
    this.#cameraFov = options?.cameraFov || 'auto'
    this.#camera.position.z = this.#cameraDistance

    this.#camera.name = `Cameras.${this.#name}`

    this.#sizeElement =
      getElement<HTMLElement>(options?.sizeElement) || document.documentElement

    this.beforeRenderCallback = options?.beforeRender

    this.#box = new LayoutBox(this.#sizeElement)

    this.#box.onResize(() => {
      this.resize()
    })
  }

  public get name() {
    return this.#name
  }

  public get camera() {
    return this.#camera
  }

  public get scene() {
    return this.#scene
  }

  public get box() {
    return this.#box
  }

  public get cameraDistance() {
    return this.#cameraDistance
  }

  public set cameraDistance(value: number) {
    this.#cameraDistance = value
    this.#debouncedResize()
  }

  public set fov(value: 'auto' | number) {
    this.#cameraFov = value
    this.#debouncedResize()
  }

  public get fov() {
    return this.#cameraFov
  }

  public set near(value: number) {
    this.#camera.near = value
    this.#debouncedResize()
  }

  public get near() {
    return this.#camera.near
  }

  public set far(value: number) {
    this.#camera.far = value
    this.#debouncedResize()
  }

  public get far() {
    return this.#camera.far
  }

  public get sizeElement() {
    return this.#sizeElement
  }

  public get isClipped() {
    return this.#sizeElement !== this.#en3.containerElement
  }

  public resize() {
    const { width, height } = this.#box

    if (!this.#camera.userData.controlled) {
      this.#camera.position.z = this.#cameraDistance
    }

    if (this.#camera instanceof PerspectiveCamera) {
      this.#camera.aspect = width / height
      this.#camera.fov =
        this.#cameraFov === 'auto'
          ? 2 * Math.atan(height / 2 / this.#cameraDistance) * (180 / Math.PI)
          : !this.#camera.userData.controlled
          ? this.#cameraFov
          : this.#camera.fov
    } else if (this.#camera instanceof OrthographicCamera) {
      this.#camera.left = width / -2
      this.#camera.right = width / 2
      this.#camera.top = height / 2
      this.#camera.bottom = height / -2
    }

    this.#camera.updateProjectionMatrix()
  }

  public destroy() {
    this.#attachedObjects.forEach((object) => {
      object.userData.box.destroy()
    })

    this.#scene.clear()

    dispose(this.#scene)

    this.#en3.destroyView(this.name)

    this.#box.destroy()
  }

  public attachToHTMLElement<T extends Object3D>(
    element: ElementOrSelector<HTMLElement>,
    object: T,
    options?: En3AttachOptions
  ) {
    const box = new LayoutBox(element, {
      ...options,
      containerElement: this.#sizeElement,
      cartesian: true,
      scrollStep: !this.isClipped,
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

  public add<T extends Object3D>(object: T): T
  public add<T extends Object3D>(
    object: T,
    element: ElementOrSelector<HTMLElement>,
    options?: En3AttachOptions
  ): En3AttachedObject3D<T>
  public add<T extends Object3D>(...args: Array<any>): any {
    const object = args[0] as T
    const element = args[1] as ElementOrSelector<HTMLElement>
    const options = args[2] as En3AttachOptions

    if (element) {
      this.attachToHTMLElement<T>(element, object, options)
    }

    this.scene.add(object)

    return object
  }

  public remove(object: Object3D, detach?: boolean) {
    this.scene.remove(object)

    if (detach) {
      this.detachFromHTMLElement(object)
    }
  }

  #debouncedResize = debounce(() => {
    this.resize()
  }, 0)
}
