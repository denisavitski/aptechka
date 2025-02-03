import { Damped, DampedOptions } from '@packages/animation'

import {
  ElementOrSelector,
  clamp,
  getElement,
  getPointerPosition,
  normalize,
  screenToCartesian,
} from '@packages/utils'
import { elementResizer } from '@packages/element-resizer'
import { windowResizer } from '@packages/window-resizer'

export interface PointerParameters {
  element: ElementOrSelector<HTMLElement>
  damped?: DampedOptions
  cartesian?: boolean
  normalize?: boolean
}

export class Pointer {
  #element: HTMLElement
  #x: Damped
  #y: Damped
  #z: Damped

  #cartesian: boolean
  #normalize: boolean

  #width = 0
  #height = 0

  #equalize = false

  constructor(parameters: PointerParameters) {
    this.#element = getElement<HTMLElement>(parameters.element)!

    this.#x = new Damped(0, parameters.damped)
    this.#y = new Damped(0, parameters.damped)
    this.#z = new Damped(0, { min: 0, max: 1, ...parameters.damped })

    this.#cartesian = parameters.cartesian || false
    this.#normalize = parameters.normalize || false
  }

  public get element() {
    return this.#element
  }

  public get x() {
    return this.#x
  }

  public get y() {
    return this.#y
  }

  public get z() {
    return this.#z
  }

  public get cartesian() {
    return this.#cartesian
  }

  public set cartesian(value: boolean) {
    this.#cartesian = value
    this.#resizeListener()
  }

  public get normalize() {
    return this.#normalize
  }

  public set normalize(value: boolean) {
    this.#normalize = value
    this.#resizeListener()
  }

  public connect() {
    this.#element.addEventListener('pointerenter', this.#pointerEnterListener)
    this.#element.addEventListener('pointerleave', this.#pointerLeaveListener)
    this.#element.addEventListener('pointermove', this.#pointerMoveListener)

    elementResizer.subscribe(this.#element, this.#resizeListener)
    windowResizer.subscribe(this.#resizeListener)
  }

  public disconnect() {
    this.#element.removeEventListener(
      'pointerenter',
      this.#pointerEnterListener
    )
    this.#element.removeEventListener(
      'pointerleave',
      this.#pointerLeaveListener
    )
    this.#element.removeEventListener('pointermove', this.#pointerMoveListener)

    elementResizer.unsubscribe(this.#resizeListener)
    windowResizer.unsubscribe(this.#resizeListener)

    this.#x.reset()
    this.#y.reset()
    this.#z.reset()
  }

  #pointerEnterListener = (e: PointerEvent) => {
    const pointer = this.#getPointerCoords(e)

    this.#x.set(pointer.x, { equalize: true })
    this.#y.set(pointer.y, { equalize: true })

    this.#z.set(1)
  }

  #pointerLeaveListener = (e: PointerEvent) => {
    this.#z.set(0)
  }

  #pointerMoveListener = (e: PointerEvent) => {
    const pointer = this.#getPointerCoords(e)

    this.#x.set(pointer.x)
    this.#y.set(pointer.y)
  }

  #resizeListener = () => {
    this.#width = this.element.clientWidth
    this.#height = this.element.clientHeight

    let xmin = 0
    let xmax = 0
    let ymin = 0
    let ymax = 0

    if (this.#cartesian) {
      if (this.#normalize) {
        xmin = -1
        xmax = 1

        ymin = -1
        ymax = 1
      } else {
        xmin = (this.#width / 2) * -1
        xmax = (this.#width / 2) * 1

        ymin = (this.#height / 2) * -1
        ymax = (this.#height / 2) * 1
      }
    } else {
      if (this.#normalize) {
        xmin = 0
        xmax = 1

        ymin = 0
        ymax = 1
      } else {
        xmin = 0
        xmax = this.#width

        ymin = 0
        ymax = this.#height
      }
    }

    this.#x.min = xmin
    this.#x.max = xmax

    this.#y.min = ymin
    this.#y.max = ymax
  }

  #getPointerCoords(event: PointerEvent) {
    const pos = getPointerPosition(event, this.#element.getBoundingClientRect())

    const size = {
      width: this.#width,
      height: this.#height,
    }

    const pointer = {
      x: pos.x,
      y: pos.y,
    }

    if (this.#cartesian) {
      const res = screenToCartesian(pointer, size)

      pointer.x = res.x
      pointer.y = res.y
    }

    if (this.#normalize) {
      const res = normalize(pointer, size)

      if (this.#cartesian) {
        pointer.x = clamp(res.x * 2, -1, 1)
        pointer.y = clamp(res.y * 2, -1, 1)
      } else {
        pointer.x = res.x
        pointer.y = res.y
      }
    }

    return pointer
  }
}
