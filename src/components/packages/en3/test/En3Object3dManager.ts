import { LayoutBox, LayoutBoxLadder } from '@packages/layout-box'
import { Store } from '@packages/store'
import { Object3D, Vector3, Euler } from 'three'

type XYZ = [number, number, number]

export interface En3Object3dManagerOptions {
  step?: number
}

export class En3Object3dManager {
  #object3d: Object3D

  #position: Store<XYZ>
  #rotation: Store<XYZ>
  #scale: Store<XYZ>

  #isInitial = true

  constructor(object3d: Object3D, options?: En3Object3dManagerOptions) {
    this.#object3d = object3d

    this.#object3d.userData.controlled = true

    const step = options?.step || 0.0001

    const name = object3d.name || 'Unnamed'

    const ob = (object3d.userData?.box as LayoutBox) || object3d

    this.#position = new Store([ob.position.x, ob.position.y, ob.position.z], {
      passport: {
        name: `${name}.Position`,
        manager: {
          type: 'number',
          step: step,
        },
      },
    })

    this.#rotation = new Store([ob.rotation.x, ob.rotation.y, ob.rotation.z], {
      passport: {
        name: `${name}.Rotation`,
        manager: {
          type: 'number',
          step: step,
          ease: 0.01,
        },
      },
    })

    this.#scale = new Store([ob.scale.x, ob.scale.y, ob.scale.z], {
      passport: {
        name: `${name}.Scale`,
        manager: {
          type: 'number',
          step: step,
        },
      },
    })

    this.save()

    this.#isInitial = false

    this.#position.subscribe((e) => {
      this.#updateController('position', e.current)
    })

    this.#rotation.subscribe((e) => {
      this.#updateController('rotation', e.current)
    })

    this.#scale.subscribe((e) => {
      this.#updateController('scale', e.current)
    })
  }

  public get object3d() {
    return this.#object3d
  }

  public destroy() {
    this.#position.close()
    this.#rotation.close()
    this.#scale.close()

    this.#object3d.userData.controlled = false
  }

  public save() {
    const set = (store: Store<XYZ>, vector: Vector3 | Euler) => {
      if (!this.#isInitial || store.initial === store.current) {
        store.current = [vector.x, vector.y, vector.z]
      }
    }

    set(this.#position, this.#object3d.position)
    set(this.#rotation, this.#object3d.rotation)
    set(this.#scale, this.#object3d.scale)
  }

  #updateController(name: 'position' | 'rotation' | 'scale', value: XYZ) {
    const box = this.#object3d.userData.box as LayoutBox

    if (box) {
      const xyz = (ladder: LayoutBoxLadder) => {
        return {
          x: value[0] - ladder.x,
          y: value[1] - ladder.y,
          z: value[2] - ladder.z,
        }
      }

      if (name === 'position') {
        box.setPositionStep(
          '_manager',
          '+',
          xyz(box.getIncludedPositionSteps('_manager'))
        )
      } else if (name === 'rotation') {
        box.setRotationStep(
          '_manager',
          '+',
          xyz(box.getIncludedRotationSteps('_manager'))
        )
      } else if (name === 'scale') {
        box.setScaleStep(
          '_manager',
          '+',
          xyz(box.getIncludedScaleSteps('_manager'))
        )
      }
    } else {
      this.#object3d[name].set(...value)
    }
  }
}
