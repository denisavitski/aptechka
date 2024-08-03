import {
  Store,
  StoreManagers,
  StoreSelectManager,
} from '@packages/client/store'
import * as THREE from 'three'
import { en3 } from '../core/en3'
import { traverseMaterials } from '../utils'
import { isObject } from '@packages/client/utils'

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

const toneMappingTypes = [
  'NoToneMapping',
  'LinearToneMapping',
  'ReinhardToneMapping',
  'CineonToneMapping',
  'ACESFilmicToneMapping',
  'AgXToneMapping',
  'NeutralToneMapping',
  'CustomToneMapping',
]

const defautOptionsCatalog: {
  [key: string]: StoreManagers[keyof StoreManagers]
} = {
  intensity: {
    type: 'number',
    min: 0,
    max: 20,
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
  fov: {
    type: 'number',
    min: 0,
    max: 180,
    step: 1,
  },
  zoom: {
    type: 'number',
    min: 0,
    step: 0.0001,
  },
  near: {
    type: 'number',
    min: 0,
    step: 0.0001,
  },
  far: {
    type: 'number',
    min: 0,
    step: 1,
  },
  filmGauge: {
    type: 'number',
    min: 0,
    step: 0.0001,
  },
  filmOffset: {
    type: 'number',
    min: 0,
    step: 0.0001,
  },
  distance: {
    type: 'number',
    min: 0,
    step: 0.1,
  },
  decay: {
    type: 'number',
    min: 0,
    step: 0.00001,
    ease: 0.001,
  },
  focus: {
    type: 'number',
    min: 0,
    max: 1,
    step: 0.00001,
  },
  bias: {
    type: 'number',
    min: 0,
    max: 0.01,
    step: 0.000001,
    ease: 0.01,
  },
  blurSamples: {
    type: 'number',
    min: 0,
    step: 1,
  },
  normalBias: {
    type: 'number',
    min: 0,
    step: 0.001,
    ease: 0.01,
  },
  radius: {
    type: 'number',
    min: 0,
    step: 0.001,
    ease: 0.01,
  },
  penumbra: {
    type: 'number',
    min: 0,
    max: 1,
    step: 0.000001,
  },
  power: {
    type: 'number',
    min: 0,
    step: 0.001,
    ease: 0.01,
  },
  angle: {
    type: 'number',
    min: 0,
    step: 0.000001,
    ease: 0.001,
  },
  toneMapping: {
    type: 'select',
    variants: toneMappingTypes,
  },
  toneMappingExposure: {
    type: 'number',
    min: 0,
    step: 0.001,
    ease: 0.1,
  },
  mapSize: {
    type: 'number',
    min: 0,
    step: 1,
  },
  damp: {
    type: 'number',
    min: 0,
    max: 1,
    step: 0.000001,
  },
  strength: {
    type: 'number',
    min: 0,
    step: 0.01,
  },
  threshold: {
    type: 'number',
    min: 0,
    max: 1,
    step: 0.0001,
  },
}

const defaultSkipKeys = new Set([
  'stencilFuncMask',
  'needsUpdate',
  'version',
  'wireframeLinewidth',
  'position',
  'scale',
  'rotation',
  'coordinateSystem',
  'aspect',
  'autoUpdate',
  'up',
])

interface ManageParameters {
  subject: any
  folderKey: string
  optionsCatalog?: any
  skipKeys: Set<string>
  afterChange?: () => void
}

interface ManagerParameters<
  M extends StoreManagers[keyof StoreManagers] = StoreManagers[keyof StoreManagers]
> {
  name: string
  value: any
  subject: any
  key: string
  managerOptions?: M
  afterChange?: () => void
}

export type OptionsCatalog = {
  [key: string]: StoreManagers[keyof StoreManagers]
}

export interface En3ParametersManagerOptions {
  optionsCatalog?: OptionsCatalog
  folderName?: string
  skipKeys?: Array<string>
  afterChange?: () => void
}

export class En3ParametersManager {
  #subject: any

  #managers: Array<Store<any, any>> = []

  constructor(subject: any, options?: En3ParametersManagerOptions) {
    this.#subject = subject

    const optionsCatalog = {
      ...defautOptionsCatalog,
      ...options?.optionsCatalog,
    }
    const skipKeys = new Set([...defaultSkipKeys, ...(options?.skipKeys || [])])
    const folderName = options?.folderName || this.#subject.name
    const afterChange = options?.afterChange

    this.#manage({
      subject: this.#subject,
      skipKeys,
      optionsCatalog,
      folderKey: folderName,
      afterChange,
    })
  }

  public destroy() {
    this.#managers.forEach((manager) => {
      manager.close()
    })
  }

  #manage(parameters: ManageParameters) {
    const { subject, folderKey, optionsCatalog, afterChange, skipKeys } =
      parameters

    for (const key in subject) {
      if (key.startsWith('_') || skipKeys.has(key)) {
        continue
      }

      const valueOrObjectWithValue = subject[key]
      const value = this.#getValue(valueOrObjectWithValue)

      const name = `${folderKey}.${key}`

      const managerOptions = optionsCatalog[key as keyof typeof optionsCatalog]

      if (typeof value === 'number') {
        if (managerOptions?.type === 'select') {
          this.#createSelectManager({
            name,
            value: valueOrObjectWithValue,
            subject,
            key,
            managerOptions,
            afterChange,
          })
        } else {
          this.#createNumberManager({
            name,
            value: valueOrObjectWithValue,
            subject,
            key,
            managerOptions,
            afterChange,
          })
        }
      } else if (
        value instanceof THREE.Vector2 ||
        value instanceof THREE.Vector3
      ) {
        this.#createVectorManager({
          name,
          value: valueOrObjectWithValue,
          subject,
          key,
          managerOptions,
          afterChange,
        })
      } else if (
        typeof value === 'boolean' &&
        !key.startsWith('is') &&
        !key.startsWith('matrix')
      ) {
        this.#createBooleanManager({
          name,
          value: valueOrObjectWithValue,
          subject,
          key,
          managerOptions,
          afterChange,
        })
      } else if (value instanceof THREE.Color) {
        this.#createColorManager({
          name,
          value: valueOrObjectWithValue,
          subject,
          key,
          managerOptions,
          afterChange,
        })
      } else if (managerOptions) {
        if (managerOptions?.type === 'select') {
          this.#createSelectManager({
            name,
            value: valueOrObjectWithValue,
            subject,
            key,
            managerOptions,
            afterChange,
          })
        }
      }
    }
  }

  #createNumberManager({
    name,
    value,
    subject,
    key,
    managerOptions,
    afterChange,
  }: ManagerParameters) {
    const manager = new Store(this.#getValue(value), {
      passport: {
        name,
        manager: {
          type: 'number',
          ...managerOptions,
        },
      },
    })

    manager.subscribe((e) => {
      this.#setObjectValue(
        subject,
        key,
        (object, key) => (object[key] = e.current)
      )
      afterChange?.()
    })

    this.#managers.push(manager)
  }

  #createVectorManager({
    name,
    value,
    subject,
    key,
    managerOptions,
    afterChange,
  }: ManagerParameters) {
    const vectorToArray = (value: THREE.Vector2 | THREE.Vector3) => {
      const arr = [value.x, value.y]

      if (value instanceof THREE.Vector3) {
        arr.push(value.z)
      }

      return arr
    }

    const manager = new Store(vectorToArray(this.#getValue(value)), {
      passport: {
        name,
        manager: {
          type: 'number',
          ...managerOptions,
        },
      },
    })

    manager.subscribe((e) => {
      this.#setObjectValue(subject, key, (object, key) =>
        object[key].set(...e.current)
      )
      afterChange?.()
    })

    this.#managers.push(manager)
  }

  #createBooleanManager({
    name,
    value,
    subject,
    key,
    managerOptions,
    afterChange,
  }: ManagerParameters) {
    const manager = new Store(this.#getValue(value), {
      passport: {
        name,
        manager: {
          type: 'boolean',
          ...managerOptions,
        },
      },
    })

    manager.subscribe((e) => {
      this.#setObjectValue(
        subject,
        key,
        (object, key) => (object[key] = e.current)
      )
      afterChange?.()
    })

    this.#managers.push(manager)
  }

  #createColorManager({
    name,
    value,
    subject,
    key,
    managerOptions,
    afterChange,
  }: ManagerParameters) {
    const manager = new Store(`#${this.#getValue(value).getHexString()}`, {
      passport: {
        name,
        manager: {
          type: 'color',
          ...managerOptions,
        },
      },
    })

    manager.subscribe((e) => {
      this.#setObjectValue(
        subject,
        key,
        (object, key) => (object[key] = new THREE.Color(e.current))
      )
      afterChange?.()
    })

    this.#managers.push(manager)
  }

  #createSelectManager({
    name,
    value,
    subject,
    key,
    managerOptions,
    afterChange,
  }: ManagerParameters<StoreSelectManager>) {
    const variants = managerOptions?.variants

    if (variants) {
      let initialVariant = null

      for (const key of variants) {
        if (value === THREE[key as keyof typeof THREE]) {
          initialVariant = key
        }
      }

      const manager = new Store(initialVariant || this.#getValue(value), {
        passport: {
          name,
          manager: {
            ...managerOptions,
          },
        },
      })

      manager.subscribe((e) => {
        if (typeof e.current === 'string') {
          if (e.current[0] === e.current[0].toUpperCase()) {
            this.#setObjectValue(
              subject,
              key,
              (object, key) =>
                (object[key] = THREE[e.current as keyof typeof THREE])
            )
          } else {
            this.#setObjectValue(
              subject,
              key,
              (object, key) => (object[key] = e.current)
            )
          }
        }
        afterChange?.()
      })

      this.#managers.push(manager)
    }
  }

  #isObjectWithValue(valueOrObjectwithValue: any) {
    return isObject(valueOrObjectwithValue) && 'value' in valueOrObjectwithValue
  }

  #getValue(valueOrObjectwithValue: any) {
    return this.#isObjectWithValue(valueOrObjectwithValue)
      ? valueOrObjectwithValue.value
      : valueOrObjectwithValue
  }

  #setObjectValue(
    object: any,
    key: string,
    callback: (object: any, key: string) => any
  ) {
    if (this.#isObjectWithValue(object[key])) {
      callback(object[key], 'value')
    } else {
      callback(object, key)
    }
  }
}
