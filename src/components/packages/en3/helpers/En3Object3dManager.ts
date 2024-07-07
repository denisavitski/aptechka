import { LayoutBox, LayoutBoxLadder } from '@packages/layout-box'
import { Store } from '@packages/store'
import {
  Object3D,
  Vector3,
  Euler,
  PointLight,
  PointLightHelper,
  DirectionalLight,
  DirectionalLightHelper,
  SpotLightHelper,
  SpotLight,
  HemisphereLight,
  HemisphereLightHelper,
  Light,
  Camera,
  CameraHelper,
  Mesh,
  Material,
} from 'three'
import { En3ParametersManager } from './En3ParametersManager'
import { en3 } from '../core/en3'
import { ticker } from '@packages/ticker'

type XYZ = [number, number, number]

export interface En3Object3dManagerOptions {
  step?: number
}

export class En3Object3dManager {
  #object3d: Object3D

  #parametersManagers: Array<En3ParametersManager> = []

  #position: Store<XYZ>
  #rotation: Store<XYZ>
  #scale: Store<XYZ>

  #isInitial = true

  #helpers: Array<Object3D> = []

  constructor(object3d: Object3D, options?: En3Object3dManagerOptions) {
    this.#object3d = object3d

    let parameters = false

    if (object3d.name.startsWith('T.')) {
      object3d.name = object3d.name.slice(2)
    }

    if (object3d.name.includes('P.')) {
      parameters = true
      object3d.name = object3d.name.replace('P.', '')
    }

    const name = object3d.name

    this.#object3d.userData.controlled = true

    const step = options?.step || 0.0001

    const ob = (object3d.userData?.box as LayoutBox) || object3d

    if (this.#object3d instanceof Light) {
      let lightHelper: any

      if (this.#object3d instanceof PointLight) {
        lightHelper = new PointLightHelper(this.#object3d, 100)
      } else if (this.#object3d instanceof DirectionalLight) {
        this.#object3d.scale.setScalar(100)
        lightHelper = new DirectionalLightHelper(this.#object3d, 1)
      } else if (this.#object3d instanceof SpotLight) {
        lightHelper = new SpotLightHelper(this.#object3d)
      } else if (this.#object3d instanceof HemisphereLight) {
        lightHelper = new HemisphereLightHelper(this.#object3d, 100)
      }

      this.#helpers.push(lightHelper)

      const camera = this.#object3d.shadow?.camera

      if (camera instanceof Camera) {
        const cameraHelper = new CameraHelper(camera)
        this.#helpers.push(cameraHelper)
      }
    }

    this.#helpers.forEach((helper) => {
      en3.view.add(helper)
    })

    this.#position = new Store([ob.position.x, ob.position.y, ob.position.z], {
      passport: {
        name: `${name}.Transformation.Position`,
        manager: {
          type: 'number',
          step: step,
        },
      },
    })

    this.#rotation = new Store([ob.rotation.x, ob.rotation.y, ob.rotation.z], {
      passport: {
        name: `${name}.Transformation.Rotation`,
        manager: {
          type: 'number',
          step: step,
          ease: 0.01,
        },
      },
    })

    this.#scale = new Store([ob.scale.x, ob.scale.y, ob.scale.z], {
      passport: {
        name: `${name}.Transformation.Scale`,
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

    if (parameters) {
      this.#parametersManagers.push(
        new En3ParametersManager(this.#object3d, {
          folderName: `${this.#object3d.name}.Parameters`,
          afterChange:
            this.#object3d instanceof Camera
              ? () => {
                  en3.view.resize()
                }
              : undefined,
        })
      )

      if (this.#object3d instanceof Mesh) {
        const material = this.#object3d.material

        if (material instanceof Material) {
          this.#parametersManagers.push(
            new En3ParametersManager(material, {
              folderName: `${this.#object3d.name}.Parameters.Material`,
              afterChange: () => {
                material.needsUpdate = true
              },
            })
          )
        }
      } else if (this.#object3d instanceof Light) {
        const shadow = this.#object3d.shadow

        if (shadow) {
          this.#parametersManagers.push(
            new En3ParametersManager(shadow, {
              folderName: `${this.#object3d.name}.Parameters.Shadow`,
              afterChange: () => {
                shadow.needsUpdate = true
              },
            })
          )
        }

        const camera = shadow.camera

        if (camera) {
          this.#parametersManagers.push(
            new En3ParametersManager(shadow, {
              folderName: `${this.#object3d.name}.Parameters.Shadow.Camera`,
              afterChange: () => {
                shadow.camera.updateProjectionMatrix()
              },
            })
          )
        }
      }
    }

    if (this.#helpers.length) {
      ticker.subscribe(this.#tickListener)
    }
  }

  public get object3d() {
    return this.#object3d
  }

  public get helpers() {
    return this.#helpers
  }

  public get raycasterTarget() {
    return this.#helpers[0] || this.#object3d
  }

  public destroy() {
    this.#parametersManagers.forEach((m) => m.destroy())

    this.#position.close()
    this.#rotation.close()
    this.#scale.close()

    this.#object3d.userData.controlled = false

    this.#helpers.forEach((helper) => {
      if (helper) {
        if ('dispose' in helper) {
          ;(helper.dispose as Function)()
          en3.view.remove(helper)
        }
      }
    })

    ticker.unsubscribe(this.#tickListener)
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

  #tickListener = () => {
    this.#helpers.forEach((helper) => {
      if ('update' in helper) {
        ;(helper.update as Function)()
      }
    })
  }
}
