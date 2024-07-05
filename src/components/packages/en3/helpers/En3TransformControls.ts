// TODO: Учитывать FOV
// TODO: Учитывать смену View
// TODO: Вынести OrbitControls в отдельный класс
// TODO: Вынести TransformControls в отдельный класс
// TODO: Вынести GridHelper в отдельный класс

import { TransformControls } from 'three/examples/jsm/Addons.js'
import { en3 } from '../core/en3'
import { Euler, Object3D, Object3DEventMap, Vector3 } from 'three'
import { En3RaycasterEvent } from '../core/En3Raycaster'
import { En3Object3dManager } from './En3Object3dManager'

type ChildEvent = { child: Object3D<Object3DEventMap> }

export class En3TransformControls {
  #controls: TransformControls

  #objectControllers: Array<En3Object3dManager> = []

  #activeObjectController: En3Object3dManager | null = null

  constructor() {
    this.#controls = new TransformControls(
      en3.camera,
      en3.webglRenderer.domElement
    )

    this.#controls.addEventListener('objectChange', (e) => {
      if (this.#activeObjectController) {
        this.#activeObjectController.save()
      }
    })

    en3.view.add(this.#controls)

    en3.scene.addEventListener('childadded', this.#childAddedListener)
    en3.scene.addEventListener('childremoved', this.#childRemovedListener)

    window.addEventListener('keydown', this.#keyDownListener)
  }

  public get controls() {
    return this.#controls
  }

  public destroy() {
    en3.scene.removeEventListener('childadded', this.#childAddedListener)
    en3.scene.removeEventListener('childremoved', this.#childRemovedListener)

    window.removeEventListener('keydown', this.#keyDownListener)

    this.#controls.dispose()

    this.#objectControllers.forEach((object) => {
      object.destroy()
      object.object3d.removeEventListener(
        'pointerDown',
        this.#childClickListener as any
      )
    })

    this.#objectControllers = []
  }

  #childAddedListener = (e: ChildEvent) => {
    if (
      e.child.name &&
      !this.#objectControllers.find((v) => v.object3d === e.child)
    ) {
      this.#objectControllers.push(new En3Object3dManager(e.child))

      en3.raycaster.add(e.child)
      e.child.addEventListener('pointerDown', this.#childClickListener as any)
      e.child.addEventListener('childadded', this.#childAddedListener)
    }
  }

  #childRemovedListener = (e: ChildEvent) => {
    const objectWrapper = this.#objectControllers.find(
      (v) => v.object3d === e.child
    )

    if (objectWrapper) {
      objectWrapper.destroy()

      en3.raycaster.remove(e.child)

      objectWrapper.object3d.removeEventListener(
        'pointerDown',
        this.#childClickListener as any
      )

      e.child.removeEventListener('childadded', this.#childAddedListener)

      this.#objectControllers = this.#objectControllers.filter(
        (w) => w !== objectWrapper
      )
    }
  }

  #childClickListener = (e: En3RaycasterEvent) => {
    this.#activeObjectController =
      this.#objectControllers.find((w) => w.object3d === e.object) || null

    if (this.#activeObjectController) {
      this.#controls.attach(this.#activeObjectController.object3d)
    }
  }

  #keyDownListener = (e: KeyboardEvent) => {
    if (e.key === 't') {
      this.#controls.setMode('translate')
    } else if (e.key === 'r') {
      this.#controls.setMode('rotate')
    } else if (e.key === 's') {
      this.#controls.setMode('scale')
    } else if (e.key === 'Escape') {
      this.#controls.detach()
    } else if (e.key === '+' || e.key === '=') {
      this.#controls.setSize(this.#controls.size + 0.1)
    } else if (e.key === '-' || e.key === '_') {
      this.#controls.setSize(this.#controls.size - 0.1)
    }
  }
}
