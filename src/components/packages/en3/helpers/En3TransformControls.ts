import { TransformControls } from 'three/examples/jsm/Addons.js'
import { en3 } from '../core/en3'
import { Object3D, Object3DEventMap } from 'three'
import { En3RaycasterEvent } from '../core/En3Raycaster'
import { En3Object3dManager } from './En3Object3dManager'

type ChildEvent = { child: Object3D<Object3DEventMap> }

export class En3TransformControls {
  #controls: TransformControls

  #objectManagers: Array<En3Object3dManager> = []

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

    this.#objectManagers.forEach((object) => {
      object.raycasterTarget.removeEventListener(
        'pointerDown',
        this.#clickListener as any
      )

      object.object3d.removeEventListener(
        'childadded',
        this.#childAddedListener
      )

      object.destroy()
    })

    this.#objectManagers = []
  }

  #childAddedListener = (e: ChildEvent) => {
    if (
      e.child.name.startsWith('T.') &&
      !this.#objectManagers.find((v) => v.object3d === e.child)
    ) {
      const manager = new En3Object3dManager(e.child)

      this.#objectManagers.push(manager)

      en3.raycaster.add(manager.raycasterTarget, {
        eventDispatcher: manager.raycasterTarget,
      })

      manager.raycasterTarget.addEventListener(
        'pointerDown',
        this.#clickListener as any
      )
      manager.object3d.addEventListener('childadded', this.#childAddedListener)
    }
  }

  #childRemovedListener = (e: ChildEvent) => {
    const manager = this.#getManager(e.child)

    if (manager) {
      en3.raycaster.remove(manager.raycasterTarget)

      manager.destroy()

      manager.raycasterTarget.removeEventListener(
        'pointerDown',
        this.#clickListener as any
      )

      manager.object3d.removeEventListener(
        'childadded',
        this.#childAddedListener
      )

      this.#objectManagers = this.#objectManagers.filter((w) => w !== manager)
    }
  }

  #clickListener = (e: En3RaycasterEvent) => {
    const manager = this.#getManager(e.target)

    if (manager) {
      this.#activeObjectController =
        this.#objectManagers.find((w) => w.object3d === manager?.object3d) ||
        null

      if (this.#activeObjectController) {
        this.#controls.attach(this.#activeObjectController.object3d)
      }
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
    } else if (e.key === 'h') {
      this.#objectManagers.forEach((manager) => {
        manager.helpers.forEach((helper) => {
          helper.visible = !helper.visible
        })
      })
    }
  }

  #getManager(object: Object3D<any>) {
    const manager = this.#objectManagers.find(
      (v) => v.object3d === object || v.raycasterTarget === object
    )

    return manager
  }
}
