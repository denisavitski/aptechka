import { Damped, DampedOptions } from '@packages/animation'
import {
  ElementOrSelector,
  clamp,
  getElement,
  normalize,
  screenToCartesian,
} from '@packages/utils'

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

  cartesian: boolean
  normalize: boolean

  constructor(parameters: PointerParameters) {
    this.#element = getElement<HTMLElement>(parameters.element)!

    this.#x = new Damped(0, parameters.damped)
    this.#y = new Damped(0, parameters.damped)
    this.#z = new Damped(0, parameters.damped)

    this.cartesian = parameters.cartesian || false
    this.normalize = parameters.normalize || false
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

  public connect() {
    this.#element.addEventListener('pointerenter', this.#pointerEnterListener)
    this.#element.addEventListener('pointerleave', this.#pointerLeaveListener)
    this.#element.addEventListener('pointermove', this.#pointerMoveListener)
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

    this.#x.reset()
    this.#y.reset()
    this.#z.reset()
  }

  #pointerEnterListener = (e: PointerEvent) => {
    this.#z.set(1)
  }

  #pointerLeaveListener = (e: PointerEvent) => {
    this.#z.set(0)
  }

  #pointerMoveListener = (e: PointerEvent) => {
    const pos = {
      x: e.offsetX,
      y: e.offsetY,
    }

    const size = {
      width: this.element.offsetWidth,
      height: this.element.offsetHeight,
    }

    const pointer = {
      x: pos.x,
      y: pos.y,
    }

    if (this.cartesian) {
      const res = screenToCartesian(pointer, size)

      pointer.x = res.x
      pointer.y = res.y
    }

    if (this.normalize) {
      const res = normalize(pointer, size)

      pointer.x = clamp(res.x * 2, -1, 1)
      pointer.y = clamp(res.y * 2, -1, 1)
    }

    this.#x.set(pointer.x)
    this.#y.set(pointer.y)
  }
}
