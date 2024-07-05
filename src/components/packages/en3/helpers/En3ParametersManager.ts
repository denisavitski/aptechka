import {
  Store,
  StoreManagers,
  StoreNumberManager,
  StoreSelectManager,
} from '@packages/store'
import * as THREE from 'three'

const blendingEquations = [
  'AddEquation',
  'SubtractEquation',
  'ReverseSubtractEquation',
  'MinEquation',
  'MaxEquation',
]

const sourceFactors = [
  'ZeroFactor',
  'OneFactor',
  'SrcColorFactor',
  'OneMinusSrcColorFactor',
  'SrcAlphaFactor',
  'OneMinusSrcAlphaFactor',
  'DstAlphaFactor',
  'OneMinusDstAlphaFactor',
  'DstColorFactor',
  'OneMinusDstColorFactor',
  'SrcAlphaSaturateFactor',
  'ConstantColorFactor',
  'OneMinusConstantColorFactor',
  'ConstantAlphaFactor',
  'OneMinusConstantAlphaFactor',
]

const destinationFactors = [...sourceFactors, 'SrcAlphaSaturateFactor']

const blendingModes = [
  'NoBlending',
  'NormalBlending',
  'AdditiveBlending',
  'SubtractiveBlending',
  'MultiplyBlending',
  'CustomBlending',
]

const depthModes = [
  'NeverDepth',
  'AlwaysDepth',
  'EqualDepth',
  'LessDepth',
  'LessEqualDepth ',
  'GreaterEqualDepth ',
  'GreaterDepth',
  'NotEqualDepth',
]

const stencilFunctions = [
  'NeverStencilFunc',
  'LessStencilFunc',
  'EqualStencilFunc',
  'LessEqualStencilFunc ',
  'GreaterStencilFunc',
  'NotEqualStencilFunc ',
  'GreaterEqualStencilFunc',
  'AlwaysStencilFunc',
]

const stencilOperations = [
  'ZeroStencilOp',
  'KeepStencilOp',
  'ReplaceStencilOp',
  'IncrementStencilOp',
  'DecrementStencilOp',
  'IncrementWrapStencilOp',
  'DecrementWrapStencilOp',
  'InvertStencilOp',
]

const sides = ['FrontSide', 'BackSide', 'DoubleSide']

const normalmapTypes = ['TangentSpaceNormalMap', 'ObjectSpaceNormalMap']

const wireframeLinejoinTypes = ['round', 'bevel', 'miter']

const managerOptions: { [key: string]: StoreManagers[keyof StoreManagers] } = {
  intensity: {
    type: 'number',
    min: 0,
    max: 50,
    step: 0.0001,
  },
  renderOrder: {
    type: 'number',
    step: 1,
  },
  alphaTest: {
    type: 'number',
    min: 0,
    max: 1,
    step: 0.001,
  },
  blendAlpha: {
    type: 'number',
    min: 0,
    max: 1,
    step: 0.001,
  },
  blendDst: {
    type: 'select',
    variants: destinationFactors,
  },
  blendDstAlpha: {
    type: 'number',
    min: 0,
    max: 1,
    step: 0.001,
  },
  blendEquation: {
    type: 'select',
    variants: blendingEquations,
  },
  blendEquationAlpha: {
    type: 'number',
    min: 0,
    max: 1,
    step: 0.001,
  },
  blending: {
    type: 'select',
    variants: blendingModes,
  },
  blendSrc: {
    type: 'select',
    variants: sourceFactors,
  },
  blendSrcAlpha: {
    type: 'number',
    min: 0,
    max: 1,
    step: 0.001,
  },
  depthFunc: {
    type: 'select',
    variants: depthModes,
  },
  stencilFunc: {
    type: 'select',
    variants: stencilFunctions,
  },
  stencilRef: {
    type: 'number',
    min: 0,
    step: 1,
  },
  stencilFail: {
    type: 'select',
    variants: stencilOperations,
  },
  stencilZFail: {
    type: 'select',
    variants: stencilOperations,
  },
  stencilZPass: {
    type: 'select',
    variants: stencilOperations,
  },
  opacity: {
    type: 'number',
    min: 0,
    max: 1,
    step: 0.0001,
  },
  side: {
    type: 'select',
    variants: sides,
  },
  roughness: {
    type: 'number',
    min: 0,
    max: 1,
    step: 0.0001,
  },
  metalness: {
    type: 'number',
    min: 0,
    max: 1,
    step: 0.0001,
  },
  lightMapIntensity: {
    type: 'number',
    min: 0,
    max: 20,
    step: 0.0001,
  },
  aoMapIntensity: {
    type: 'number',
    min: 0,
    max: 20,
    step: 0.0001,
  },
  bumpScale: {
    type: 'number',
    min: 0,
    step: 0.0001,
  },
  normalMapType: {
    type: 'select',
    variants: normalmapTypes,
  },
  wireframeLinejoin: {
    type: 'select',
    variants: wireframeLinejoinTypes,
  },
  envMapIntensity: {
    type: 'number',
    min: 0,
    max: 20,
    step: 0.0001,
  },
  emissiveIntensity: {
    type: 'number',
    min: 0,
    max: 20,
    step: 0.0001,
  },
}

const skipKeys = new Set([
  'stencilFuncMask',
  'needsUpdate',
  'version',
  'wireframeLinewidth',
  'position',
  'scale',
  'rotation',
])

export class En3ParametersManager {
  #subject: any

  #managers: Array<Store> = []

  constructor(subject: any) {
    this.#subject = subject

    this.#manage(this.#subject, `${this.#subject.name}.Parameters`)

    const material = this.#subject.material

    if (material instanceof THREE.Material) {
      this.#manage(
        material,
        `${this.#subject.name}.Parameters.Material`,
        () => {
          material.needsUpdate = true
        }
      )
    }
  }

  public destroy() {
    this.#managers.forEach((manager) => {
      manager.close()
    })
  }

  #manage(subject: any, folderKey: string, afterChange?: () => void) {
    for (const key in subject) {
      if (key.startsWith('_') || skipKeys.has(key)) {
        continue
      }

      const value = subject[key]

      const name = `${folderKey}.${key}`

      const foundedManagerOptions =
        managerOptions[key as keyof typeof managerOptions]

      if (typeof value === 'number') {
        if (foundedManagerOptions?.type === 'select') {
          this.#createSelectManager(
            name,
            value,
            subject,
            key,
            foundedManagerOptions
          )
        } else {
          this.#createNumberManager(
            name,
            value,
            subject,
            key,
            foundedManagerOptions
          )
        }
      } else if (
        value instanceof THREE.Vector2 ||
        value instanceof THREE.Vector3
      ) {
        this.#createVectorManager(
          name,
          value,
          subject,
          key,
          foundedManagerOptions
        )
      } else if (
        typeof value === 'boolean' &&
        !key.startsWith('is') &&
        !key.startsWith('matrix')
      ) {
        this.#createBooleanManager(name, value, subject, key)
      } else if (value instanceof THREE.Color) {
        this.#createColorManager(name, value, subject, key)
      } else if (foundedManagerOptions) {
        if (foundedManagerOptions?.type === 'select') {
          this.#createSelectManager(
            name,
            value,
            subject,
            key,
            foundedManagerOptions
          )
        }
      }
    }
  }

  #createNumberManager(
    name: string,
    initialValue: any,
    subject: any,
    key: string,
    foundedManagerOptions?: (typeof managerOptions)[keyof typeof managerOptions],
    afterChange?: () => void
  ) {
    const manager = new Store(initialValue, {
      passport: {
        name,
        manager: {
          type: 'number',
          ...foundedManagerOptions,
        },
      },
    })

    manager.subscribe((e) => {
      subject[key] = e.current
      afterChange?.()
    })
  }

  #createVectorManager(
    name: string,
    initialValue: THREE.Vector2 | THREE.Vector3,
    subject: any,
    key: string,
    foundedManagerOptions?: (typeof managerOptions)[keyof typeof managerOptions],
    afterChange?: () => void
  ) {
    const vectorToArray = (value: THREE.Vector2 | THREE.Vector3) => {
      const arr = [value.x, value.y]

      if (value instanceof THREE.Vector3) {
        arr.push(value.z)
      }

      return arr
    }

    const manager = new Store(vectorToArray(initialValue), {
      passport: {
        name,
        manager: {
          type: 'number',
          ...foundedManagerOptions,
        },
      },
    })

    manager.subscribe((e) => {
      ;(subject[key] as any).set(...e.current)
      afterChange?.()
    })
  }

  #createBooleanManager(
    name: string,
    initialValue: boolean,
    subject: any,
    key: string,
    afterChange?: () => void
  ) {
    const manager = new Store(initialValue, {
      passport: {
        name,
        manager: {
          type: 'boolean',
        },
      },
    })

    manager.subscribe((e) => {
      subject[key] = e.current
      afterChange?.()
    })
  }

  #createColorManager(
    name: string,
    initialValue: THREE.Color,
    subject: any,
    key: string,
    afterChange?: () => void
  ) {
    const manager = new Store(`#${initialValue.getHexString()}`, {
      passport: {
        name,
        manager: {
          type: 'color',
        },
      },
    })

    manager.subscribe((e) => {
      subject[key] = new THREE.Color(e.current)
      afterChange?.()
    })
  }

  #createSelectManager(
    name: string,
    initialValue: any,
    subject: any,
    key: string,
    foundedManagerOptions: StoreSelectManager,
    afterChange?: () => void
  ) {
    const variants = foundedManagerOptions.variants

    let initialVariant = null

    for (const key of variants) {
      if (initialValue === THREE[key as keyof typeof THREE]) {
        initialVariant = key
      }
    }

    const manager = new Store(initialVariant || initialValue, {
      passport: {
        name,
        manager: {
          ...foundedManagerOptions,
        },
      },
    })

    manager.subscribe((e) => {
      if (typeof e.current === 'string') {
        if (e.current[0] === e.current[0].toUpperCase()) {
          subject[key] = THREE[e.current as keyof typeof THREE]
        } else {
          subject[key] = e.current
        }
      }
      afterChange?.()
    })
  }
}
