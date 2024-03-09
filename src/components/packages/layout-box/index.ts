import { cssUnitParser } from '@packages/css-unit-parser'
import { Ladder } from '@packages/ladder'
import { TICK_ORDER } from '@packages/order'
import { scrollEntries } from '@packages/scroll-entries'
import { StoreCallback, StoreEntry } from '@packages/store'
import { ticker } from '@packages/ticker'
import {
  ElementOrSelector,
  Axes3D,
  Axes2D,
  isBrowser,
  getCumulativeOffsetLeft,
  getCumulativeOffsetTop,
  getElement,
} from '@packages/utils'
import { elementResizer } from '@packages/element-resizer'

export function decomposeCSSMatrix(matrix: WebKitCSSMatrix) {
  const scaleX = Math.sqrt(
    matrix.m11 * matrix.m11 + matrix.m12 * matrix.m12 + matrix.m13 * matrix.m13
  )
  const scaleY = Math.sqrt(
    matrix.m21 * matrix.m21 + matrix.m22 * matrix.m22 + matrix.m23 * matrix.m23
  )
  const scaleZ = Math.sqrt(
    matrix.m31 * matrix.m31 + matrix.m32 * matrix.m32 + matrix.m33 * matrix.m33
  )

  const rotationX = Math.atan2(matrix.m32, matrix.m33)
  const rotationY = Math.atan2(
    -matrix.m31,
    Math.sqrt(matrix.m32 * matrix.m32 + matrix.m33 * matrix.m33)
  )
  const rotationZ = Math.atan2(matrix.m21, matrix.m11)

  const translationX = matrix.m41
  const translationY = matrix.m42 * -1
  const translationZ = matrix.m43

  return {
    scaleX,
    scaleY,
    scaleZ,
    rotationX,
    rotationY,
    rotationZ,
    translationX,
    translationY,
    translationZ,
  }
}

export interface LayoutBoxOptions {
  containerElement?: ElementOrSelector<HTMLElement>
  cartesian?: boolean
  scrollAxis?: Axes3D | 'auto'
  frontSide?: LayoutBoxFrontSide
  sizeStep?: boolean
  positionStep?: boolean
  culling?: boolean
  transformStep?: boolean
}

export interface LayoutBoxScrollStepCallbackReturn {
  axis: Axes2D
  value: number
}

export type LayoutBoxXYZ = { x: number; y: number; z: number }

export type LayoutBoxScrollStepCallback =
  () => LayoutBoxScrollStepCallbackReturn
export type LayoutBoxStepCallback = StoreCallback<StoreEntry<LayoutBoxXYZ>>

export type LayoutBoxFrontSide = 'left' | 'top'

export interface LayoutBoxBindedObject {
  position?: LayoutBoxXYZ
  scale?: LayoutBoxXYZ
  rotation?: LayoutBoxXYZ
}

export class LayoutBox {
  #element: HTMLElement = null!
  #containerElement: HTMLElement = null!
  #scrollStepSetterCallbacks: Array<LayoutBoxScrollStepCallback> = []

  #scrollAxis: Axes3D | 'auto' = 'auto'
  #frontSide: LayoutBoxFrontSide = 'top'

  #isCartesian = false
  #isSizeStep = true
  #isPositionStep = true
  #isTransformStep = true

  #width = 0
  #height = 0
  #depth = 0

  #top = 0
  #left = 0
  #front = 0

  #x = 0
  #y = 0
  #z = 0

  #CSSTranslation = { x: 0, y: 0, z: 0 }
  #CSSRotation = { x: 0, y: 0, z: 0 }
  #CSSScale = { x: 1, y: 1, z: 1 }

  #rotation = new Ladder({ x: 0, y: 0, z: 0 })
  #position = new Ladder({ x: 0, y: 0, z: 0 })
  #scale = new Ladder({ x: 0, y: 0, z: 0 })

  constructor(
    element: ElementOrSelector<HTMLElement>,
    options?: LayoutBoxOptions
  ) {
    if (isBrowser) {
      this.#element = getElement(element) || document.body
      this.#containerElement =
        getElement(options?.containerElement) || document.body

      this.#scrollAxis = options?.scrollAxis || 'auto'
      this.#frontSide = options?.frontSide || 'top'

      this.#isCartesian = options?.cartesian || false
      this.#isSizeStep =
        options?.sizeStep !== undefined ? options.sizeStep : true
      this.#isPositionStep =
        options?.positionStep !== undefined ? options.positionStep : true
      this.#isTransformStep =
        options?.transformStep !== undefined ? options.transformStep : true

      this.#scale.setStep('_size', '+', {
        x: 1,
        y: 1,
        z: 1,
      })

      this.#position.setStep('_position', '+', {
        x: 0,
        y: 0,
        z: 0,
      })

      this.#scale.setStep('_scale', '*', {
        x: 1,
        y: 1,
        z: 1,
      })

      this.#position.setStep('_translation', '+', {
        x: 0,
        y: 0,
        z: 0,
      })

      this.#rotation.setStep('_rotation', '+', {
        x: 0,
        y: 0,
        z: 0,
      })

      addEventListener('DOMContentLoaded', () => {
        scrollEntries.getAll(this.element).forEach((entry) => {
          this.setScrollStep(() => {
            return entry
          })
        })
      })

      ticker.subscribe(this.#tickListener, {
        order: TICK_ORDER.LAYOUT_BOX,
        culling: options?.culling ? this.element : undefined,
      })

      elementResizer.subscribe(this.element, this.#resizeListener)
    }
  }

  public get element() {
    return this.#element
  }

  public get containerElement() {
    return this.#containerElement
  }

  public get position() {
    return this.#position.current
  }

  public get rotation() {
    return this.#rotation.current
  }

  public get scale() {
    return this.#scale.current
  }

  public get left() {
    return this.#left
  }

  public get top() {
    return this.#top
  }

  public get front() {
    return this.#front
  }

  public get width() {
    return this.#width
  }

  public get height() {
    return this.#height
  }

  public get depth() {
    return this.#depth
  }

  public bindObject(object: LayoutBoxBindedObject) {
    object.position && this.#position.bind(object.position)
    object.rotation && this.#rotation.bind(object.rotation)
    object.scale && this.#scale.bind(object.scale)
  }

  public unbindObject(object: LayoutBoxBindedObject) {
    object.position && this.#position.unbind(object.position)
    object.rotation && this.#rotation.unbind(object.rotation)
    object.scale && this.#scale.unbind(object.scale)
  }

  public setScrollStep(callback: LayoutBoxScrollStepCallback) {
    if (!this.#scrollStepSetterCallbacks.includes(callback)) {
      this.#scrollStepSetterCallbacks.push(callback)
    }

    return () => this.deleteScrollStep(callback)
  }

  public deleteScrollStep(callback: LayoutBoxScrollStepCallback) {
    this.#scrollStepSetterCallbacks = this.#scrollStepSetterCallbacks.filter(
      (s) => s !== callback
    )
  }

  public destroy() {
    ticker.unsubscribe(this.#tickListener)
    elementResizer.unsubscribe(this.#resizeListener)

    this.#position.close()
    this.#rotation.close()
    this.#scale.close()
  }

  public setPositionStep(...args: Parameters<Ladder['setStep']>) {
    this.#position.setStep(...args)
  }

  public getPositionStep(...args: Parameters<Ladder['getStepValue']>) {
    return this.#position.getStepValue(...args)
  }

  public setRotationStep(...args: Parameters<Ladder['setStep']>) {
    this.#rotation.setStep(...args)
  }

  public getRotationStep(...args: Parameters<Ladder['getStepValue']>) {
    return this.#rotation.getStepValue(...args)
  }

  public setScaleStep(...args: Parameters<Ladder['setStep']>) {
    this.#scale.setStep(...args)
  }

  public getScaleStep(...args: Parameters<Ladder['getStepValue']>) {
    return this.#scale.getStepValue(...args)
  }

  public deletePositionStep(...args: Parameters<Ladder['deleteStep']>) {
    this.#position.deleteStep(...args)
  }

  public deleteRotationStep(...args: Parameters<Ladder['deleteStep']>) {
    this.#rotation.deleteStep(...args)
  }

  public deleteScaleStep(...args: Parameters<Ladder['deleteStep']>) {
    this.#scale.deleteStep(...args)
  }

  #recalculate() {
    this.#scale.calculate()
    this.#position.calculate()
    this.#rotation.calculate()
  }

  #composeSteps() {
    this.#scale.setStep('_size', '+', {
      x: this.#isSizeStep ? this.#width : 1,
      y: this.#isSizeStep ? this.#height : 1,
      z: this.#isSizeStep ? this.#depth : 1,
    })

    const xPosition = this.#isPositionStep ? this.#x : 0
    const yPosition = this.#isPositionStep ? this.#y : 0
    const zPosition = this.#isPositionStep ? this.#z : 0

    this.#position.setStep('_position', '+', {
      x: xPosition,
      y: yPosition,
      z: zPosition,
    })

    if (this.#isTransformStep) {
      this.#scale.setStep('_scale', '*', {
        x: this.#CSSScale.x,
        y: this.#CSSScale.y,
        z: this.#CSSScale.z,
      })

      this.#position.setStep('_translation', '+', {
        x: this.#CSSTranslation.x,
        y: this.#CSSTranslation.y,
        z: this.#CSSTranslation.z,
      })

      this.#rotation.setStep('_rotation', '+', {
        x: this.#CSSRotation.x,
        y: this.#CSSRotation.y,
        z: this.#CSSRotation.z,
      })
    } else {
      this.#scale.setStep('_scale', '*', {
        x: 1,
        y: 1,
        z: 1,
      })

      this.#position.setStep('_translation', '+', {
        x: 0,
        y: 0,
        z: 0,
      })

      this.#rotation.setStep('_rotation', '+', {
        x: 0,
        y: 0,
        z: 0,
      })
    }
  }

  #updateDimensions() {
    const computed = getComputedStyle(this.#element)

    this.#width = Math.max(this.#element.clientWidth, 1)

    this.#height = Math.max(this.#element.clientHeight, 1)

    this.#depth = Math.max(
      cssUnitParser.parse(computed.getPropertyValue('--depth') || '0px'),
      1
    )

    const vl = getCumulativeOffsetLeft(this.#containerElement)
    const vt = getCumulativeOffsetTop(this.#containerElement)
    const vw = this.#containerElement.clientWidth
    const vh = this.#containerElement.clientHeight

    this.#left = getCumulativeOffsetLeft(this.#element) - vl
    this.#top = getCumulativeOffsetTop(this.#element) - vt

    if (this.#scrollAxis === 'z') {
      const nl = this.#left / vw
      const nt = this.#top / vh

      this.#left = (nl - Math.floor(nl)) * vw
      this.#top = (nt - Math.floor(nt)) * vh

      if (this.#frontSide === 'left') {
        this.#front = getCumulativeOffsetLeft(this.#element) - vl - this.#left
      } else {
        this.#front = getCumulativeOffsetTop(this.#element) - vt - this.#top
      }
    }

    this.#left += this.#element.clientLeft
    this.#top += this.#element.clientTop

    if (this.#isCartesian) {
      const viewHalfWidth = Math.round(vw / 2)
      const viewHalfHeight = Math.round(vh / 2)

      const thisHalfWidth = this.#width ? Math.round(this.#width / 2) : 0
      const thisHalfHeight = this.#height ? Math.round(this.#height / 2) : 0

      const positionX = this.#left - viewHalfWidth + thisHalfWidth
      const positionY = (this.#top - viewHalfHeight + thisHalfHeight) * -1
      this.#x = positionX
      this.#y = positionY
    } else {
      this.#x = this.#left
      this.#y = this.#top
    }

    this.#z = this.#front * -1

    const cssMatrix = new WebKitCSSMatrix(computed.transform)
    const decomposedMatrix = decomposeCSSMatrix(cssMatrix)

    this.#CSSTranslation.x = decomposedMatrix.translationX
    this.#CSSTranslation.y = decomposedMatrix.translationY
    this.#CSSTranslation.z = decomposedMatrix.translationZ

    this.#CSSScale.x = decomposedMatrix.scaleX
    this.#CSSScale.y = decomposedMatrix.scaleY
    this.#CSSScale.z = decomposedMatrix.scaleZ

    this.#CSSRotation.x = decomposedMatrix.rotationX
    this.#CSSRotation.y = decomposedMatrix.rotationY
    this.#CSSRotation.z = decomposedMatrix.rotationZ

    this.#composeSteps()
    this.#recalculate()
  }

  #updateScrollPosition() {
    for (
      let index = 0;
      index < this.#scrollStepSetterCallbacks.length;
      index++
    ) {
      const callbackReturn = this.#scrollStepSetterCallbacks[index]()

      let axis = callbackReturn.axis as Axes3D

      if (this.#scrollAxis !== 'auto') {
        axis = this.#scrollAxis
      }

      this.#position.setStep(`_scroll_${index}`, '+', {
        [axis]:
          callbackReturn.value *
          (axis === 'x' ? -1 : this.#isCartesian ? 1 : -1),
      })
    }
  }

  #resizeListener = () => {
    if (isBrowser) {
      this.#updateDimensions()
    }
  }

  #tickListener = () => {
    this.#updateScrollPosition()
    this.#recalculate()
  }
}
