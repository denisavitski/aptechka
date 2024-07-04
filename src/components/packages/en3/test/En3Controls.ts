// TODO: Учитывать FOV
// TODO: Учитывать смену View
// TODO: Вынести OrbitControls в отдельный класс
// TODO: Вынести TransformControls в отдельный класс
// TODO: Вынести GridHelper в отдельный класс

import { OrbitControls, TransformControls } from 'three/examples/jsm/Addons.js'
import { en3 } from '../core/en3'
import { GridHelper, Object3D, Object3DEventMap, Vector3 } from 'three'
import { En3RaycasterEvent } from '../core/En3Raycaster'
import { En3ObjectController } from './En3ObjectController'
import { Store } from '@packages/store'

type ChildEvent = { child: Object3D<Object3DEventMap> }

export class En3Controls {
  #cameraController: En3ObjectController

  #orbitControls: OrbitControls
  #orbitControlsTarget: Store<[number, number, number]>

  #transformControls: TransformControls
  #gridHelper: GridHelper

  #objectControllers: Array<En3ObjectController> = []

  #activeObjectController: En3ObjectController | null = null

  constructor() {
    this.#cameraController = new En3ObjectController(en3.camera)

    this.#orbitControls = new OrbitControls(
      en3.camera,
      en3.webglRenderer.domElement
    )

    this.#orbitControlsTarget = new Store([0, 0, 0], {
      passport: {
        name: 'Controls.OrbitControls.Target',
        manager: {
          type: 'numbers',
          step: 0.0001,
        },
      },
    })

    this.#orbitControlsTarget.subscribe((e) => {
      this.#orbitControls.target.set(...e.current)
    })

    this.#orbitControls.update()

    this.#orbitControls.addEventListener('change', () => {
      this.#cameraController.save()

      this.#orbitControlsTarget.current = [
        this.#orbitControls.target.x,
        this.#orbitControls.target.y,
        this.#orbitControls.target.z,
      ]
    })

    this.#transformControls = new TransformControls(
      en3.camera,
      en3.webglRenderer.domElement
    )

    this.#transformControls.addEventListener('dragging-changed', (e) => {
      this.#orbitControls.enabled = !e.value
    })

    this.#transformControls.addEventListener('objectChange', (e) => {
      this.#activeObjectController?.save()
    })

    en3.view.add(this.#transformControls)

    this.#gridHelper = new GridHelper(en3.camera.far, 100, 0x0000ff, 0x808080)
    en3.view.add(this.#gridHelper)

    en3.scene.addEventListener('childadded', this.#childAddedListener)
    en3.scene.addEventListener('childremoved', this.#childRemovedListener)

    window.addEventListener('keydown', this.#keyDownListener)
  }

  public destroy() {
    en3.scene.removeEventListener('childadded', this.#childAddedListener)
    en3.scene.removeEventListener('childremoved', this.#childRemovedListener)

    window.removeEventListener('keydown', this.#keyDownListener)

    this.#orbitControls.dispose()
    this.#transformControls.dispose()

    this.#cameraController.destroy()

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
      this.#objectControllers.push(new En3ObjectController(e.child))

      en3.raycaster.add(e.child)
      e.child.addEventListener('pointerDown', this.#childClickListener as any)
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

      this.#objectControllers = this.#objectControllers.filter(
        (w) => w !== objectWrapper
      )
    }
  }

  #childClickListener = (e: En3RaycasterEvent) => {
    this.#activeObjectController =
      this.#objectControllers.find((w) => w.object3d === e.object) || null

    if (this.#activeObjectController) {
      this.#transformControls.attach(this.#activeObjectController.object3d)
    }
  }

  #keyDownListener = (e: KeyboardEvent) => {
    if (e.key === 't') {
      this.#transformControls.setMode('translate')
    } else if (e.key === 'r') {
      this.#transformControls.setMode('rotate')
    } else if (e.key === 's') {
      this.#transformControls.setMode('scale')
    } else if (e.key === 'Escape') {
      this.#transformControls.detach()
    } else if (e.key === '+' || e.key === '=') {
      this.#transformControls.setSize(this.#transformControls.size + 0.1)
    } else if (e.key === '-' || e.key === '_') {
      this.#transformControls.setSize(this.#transformControls.size - 0.1)
    } else if (e.key === 'g') {
      this.#gridHelper.visible = !this.#gridHelper.visible
    }
  }
}
