import { Intersection, Object3D, Raycaster, Vector2 } from 'three'
import { en3 } from './en3'

export type En3RaycasterEventType =
  | 'en3PointerDown'
  | 'en3PointerUp'
  | 'en3PointerMove'
  | 'en3PointerLeave'
  | 'en3PointerEnter'
  | 'en3PointerMove'

export type En3RaycasterEvent = {
  type: En3RaycasterEventType
  originalEvent: PointerEvent
} & Intersection<Object3D>

export interface En3RaycasterOptions {
  targetName?: string
  eventDispatcher?: Object3D
  propagation?: boolean
}

interface En3RaycasterTargetParameters extends En3RaycasterOptions {
  object3D: Object3D
}

export type En3RaycasterCallback = (event: En3RaycasterEvent) => void

class En3RaycasterTarget {
  #targetName: string | undefined
  #eventDispatcher: Object3D
  #propagation: boolean
  #object3D: Object3D
  #target: () => Object3D

  public intersection: Intersection<Object3D> | undefined

  constructor(parameters: En3RaycasterTargetParameters) {
    this.#targetName = parameters.targetName || undefined
    this.#eventDispatcher = parameters.eventDispatcher || parameters.object3D
    this.#propagation = parameters.propagation || false
    this.#object3D = parameters.object3D

    this.#target = !this.#targetName
      ? () => this.#object3D
      : () =>
          this.#object3D.getObjectByName(this.#targetName!) || this.#object3D
  }

  public get object3D() {
    return this.#object3D
  }

  public get eventDispatcher() {
    return this.#eventDispatcher
  }

  public get propagation() {
    return this.#propagation
  }

  public get target() {
    return this.#target()
  }

  public dispatch(type: En3RaycasterEventType, originalEvent: PointerEvent) {
    this.eventDispatcher.dispatchEvent<any>({
      originalEvent,
      type,
      ...this.intersection,
    })
  }
}

export class En3Raycaster {
  #targets: Array<En3RaycasterTarget> = []
  #hits: Array<En3RaycasterTarget> = []

  #pointer = new Vector2()
  #raycaster = new Raycaster()

  constructor() {
    en3.containerElement.addEventListener(
      'pointerdown',
      this.#pointerdownListener
    )
    en3.containerElement.addEventListener('pointerup', this.#pointerupListener)
    en3.containerElement.addEventListener(
      'pointermove',
      this.#pointermoveListener
    )
  }

  public destroy() {
    en3.containerElement.removeEventListener(
      'pointerdown',
      this.#pointerdownListener
    )
    en3.containerElement.removeEventListener(
      'pointerup',
      this.#pointerupListener
    )
    en3.containerElement.removeEventListener(
      'pointermove',
      this.#pointermoveListener
    )
  }

  public add(object3D: Object3D, options?: En3RaycasterOptions) {
    if (this.#targets.find((t) => t.object3D.uuid === object3D.uuid)) {
      return
    }

    const target = new En3RaycasterTarget({
      object3D,
      ...options,
    })

    this.#targets.push(target)
  }

  public remove(object3D: Object3D) {
    this.#targets = this.#targets.filter(
      (t) => t.object3D.uuid !== object3D.uuid
    )
    this.#hits = this.#hits.filter((h) => h.object3D.uuid !== object3D.uuid)
  }

  #pointerdownListener = (event: PointerEvent) => {
    for (let index = 0; index < this.#hits.length; index++) {
      this.#hits[index].dispatch('en3PointerDown', event)
    }
  }

  #pointerupListener = (event: PointerEvent) => {
    for (let index = 0; index < this.#hits.length; index++) {
      this.#hits[index].dispatch('en3PointerUp', event)
    }
  }

  #pointermoveListener = (event: PointerEvent) => {
    this.#pointer.x = (event.clientX / en3.width) * 2 - 1
    this.#pointer.y = -(event.clientY / en3.height) * 2 + 1

    if (en3.camera) {
      this.#raycaster.setFromCamera(this.#pointer, en3.camera)
    }

    const hits: Array<En3RaycasterTarget> = []

    for (const target of this.#targets) {
      const intersection = this.#raycaster.intersectObject(target.target)

      if (intersection.length) {
        target.intersection = intersection[0]
        hits.push(target)
      }
    }

    let isStopPropagation = false

    const leaveHits = this.#hits.filter(
      (s) => !hits.find((h) => h.object3D.uuid === s.object3D.uuid)
    )

    const finalHits = hits
      .sort((a, b) => b.object3D.position.z - a.object3D.position.z)
      .filter((h) => {
        if (isStopPropagation) {
          return false
        }

        isStopPropagation = !h.propagation

        return true
      })

    const enterHits = finalHits.filter(
      (s) => !this.#hits.find((h) => h.object3D.uuid === s.object3D.uuid)
    )

    for (let index = 0; index < leaveHits.length; index++) {
      leaveHits[index].dispatch('en3PointerLeave', event)
    }

    for (let index = 0; index < enterHits.length; index++) {
      enterHits[index].dispatch('en3PointerEnter', event)
    }

    this.#hits = finalHits

    for (let index = 0; index < this.#hits.length; index++) {
      this.#hits[index].dispatch('en3PointerMove', event)
    }
  }
}
