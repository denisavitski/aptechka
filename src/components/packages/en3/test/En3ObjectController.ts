import { Store } from '@packages/store'
import { Object3D, Vector3, Euler } from 'three'

type XYZ = [number, number, number]

export interface En3ObjectControllerOptions {
  step?: number
}

export class En3ObjectController {
  #object3d: Object3D

  #position: Store<XYZ>
  #rotation: Store<XYZ>
  #scale: Store<XYZ>

  constructor(object3d: Object3D, options?: En3ObjectControllerOptions) {
    this.#object3d = object3d

    this.#object3d.userData.controlled = true

    const step = options?.step || 0.0001

    const name = object3d.name || 'Unnamed'

    this.#position = new Store(
      [object3d.position.x, object3d.position.y, object3d.position.z],
      {
        passport: {
          name: `${name}.Position`,
          manager: {
            type: 'numbers',
            step: step,
          },
        },
      }
    )

    this.#rotation = new Store(
      [object3d.rotation.x, object3d.rotation.y, object3d.rotation.z],
      {
        passport: {
          name: `${name}.Rotation`,
          manager: {
            type: 'numbers',
            step: step,
          },
        },
      }
    )

    this.#scale = new Store(
      [object3d.scale.x, object3d.scale.y, object3d.scale.z],
      {
        passport: {
          name: `${name}.Scale`,
          manager: {
            type: 'numbers',
            step: step,
          },
        },
      }
    )

    this.save(true)

    // TODO: LayoutBox

    this.#position.subscribe((e) => {
      this.#object3d.position.set(...e.current)
    })

    this.#rotation.subscribe((e) => {
      this.#object3d.rotation.set(...e.current)
    })

    this.#scale.subscribe((e) => {
      this.#object3d.scale.set(...e.current)
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

  public save(_initial = false) {
    const set = (store: Store<XYZ>, vector: Vector3 | Euler) => {
      if (!_initial || store.initial === store.current) {
        store.current = [vector.x, vector.y, vector.z]
      }
    }

    set(this.#position, this.#object3d.position)
    set(this.#rotation, this.#object3d.rotation)
    set(this.#scale, this.#object3d.scale)
  }
}
