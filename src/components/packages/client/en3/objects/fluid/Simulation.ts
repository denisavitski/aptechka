import { device } from '@packages/client/device'
import { en3 } from '@packages/client/en3/core/en3'
import { Store } from '@packages/client/store'

import { FloatType, HalfFloatType, Vector2, WebGLRenderTarget } from 'three'

import { Advection } from './Advection'
import { ExternalForce } from './ExternalForce'
import { Viscous } from './Viscous'
import { Divergence } from './Divergence'
import { Poisson } from './Poisson'
import { Pressure } from './Pressure'

export interface SimulationFBOS {
  vel0: WebGLRenderTarget
  vel1: WebGLRenderTarget

  // for calc next velocity with viscous
  velViscous0: WebGLRenderTarget
  velViscous1: WebGLRenderTarget

  // for calc pressure
  div: WebGLRenderTarget

  // for calc poisson equation
  pressure0: WebGLRenderTarget
  pressure1: WebGLRenderTarget
}

export class Simulation {
  #parameters = {
    isViscous: new Store(false, {
      passport: {
        name: 'Fluid.Вязкость.Активна',
        manager: {
          type: 'boolean',
        },
      },
    }),

    viscous: new Store(30, {
      passport: {
        name: 'Fluid.Вязкость.Величина',
        manager: {
          type: 'number',
          min: 0,
          max: 500,
        },
      },
    }),

    iterationsViscous: new Store(16, {
      passport: {
        name: 'Fluid.Вязкость.Количество итераций',
        manager: {
          type: 'number',
          min: 1,
          max: 32,
          step: 1,
        },
      },
    }),

    pointerForce: new Store(20, {
      passport: {
        name: 'Fluid.Курсор.Сила',
        manager: {
          type: 'number',
          min: 1,
          max: 200,
          step: 1,
        },
      },
    }),

    pointerSize: new Store(100, {
      passport: {
        name: 'Fluid.Курсор.Размер',
        manager: {
          type: 'number',
          min: 10,
          max: 200,
          step: 1,
        },
      },
    }),

    dt: new Store(0.014, {
      passport: {
        name: 'Fluid.Скорость',
        manager: {
          type: 'number',
          min: 0.001,
          max: 0.1,
          step: 0.001,
        },
      },
    }),

    iterationsPoisson: new Store(16, {
      passport: {
        name: 'Fluid.Poisson',
        manager: {
          type: 'number',
          min: 1,
          max: 32,
          step: 1,
        },
      },
    }),

    resolution: new Store(0.5, {
      passport: {
        name: 'Fluid.Разрешение',
        manager: {
          type: 'number',
          min: 0.1,
          max: 1,
        },
      },
    }),

    isBounce: new Store(false, {
      passport: {
        name: 'Fluid.Bounce',
        manager: {
          type: 'boolean',
        },
      },
    }),

    BFECC: new Store(true, {
      passport: {
        name: 'Fluid.BFECC',
        manager: {
          type: 'boolean',
        },
      },
    }),
  }

  #fbos: SimulationFBOS = {
    vel0: null!,
    vel1: null!,

    velViscous0: null!,
    velViscous1: null!,

    div: null!,

    pressure0: null!,
    pressure1: null!,
  }

  #fboSize = new Vector2()
  #cellScale = new Vector2()
  #boundarySpace = new Vector2()

  #advection: Advection = null!
  #externalForce: ExternalForce = null!
  #viscous: Viscous = null!
  #divergence: Divergence = null!
  #poisson: Poisson = null!
  #pressure: Pressure = null!

  constructor() {
    this.init()
  }

  public get parameters() {
    return this.#parameters
  }

  public get fbos() {
    return this.#fbos
  }

  public resize() {
    this.#calcSize()

    for (let key in this.fbos) {
      this.#fbos[key as keyof SimulationFBOS].setSize(
        this.#fboSize.x,
        this.#fboSize.y
      )
    }
  }

  public update() {
    if (this.#parameters.isBounce.current) {
      this.#boundarySpace.set(0, 0)
    } else {
      this.#boundarySpace.copy(this.#cellScale)
    }

    this.#advection.update({
      BFECC: this.#parameters.BFECC.current,
      dt: this.#parameters.dt.current,
      isBounce: this.#parameters.isBounce.current,
    })

    this.#externalForce.update({
      pointerSize: this.#parameters.pointerSize.current,
      pointerForce: this.#parameters.pointerForce.current,
      cellScale: this.#cellScale,
    })

    let vel = this.#fbos.vel1

    if (this.#parameters.isViscous.current) {
      vel = this.#viscous.update({
        viscous: this.#parameters.viscous.current,
        iterations: this.#parameters.iterationsViscous.current,
        dt: this.#parameters.dt.current,
      })
    }

    this.#divergence.update({ vel })

    const pressure = this.#poisson.update({
      iterations: this.#parameters.iterationsPoisson.current,
    })

    this.#pressure.update({ vel, pressure })
  }

  public dispose() {
    this.#advection.dispose()
    this.#viscous.dispose()
    this.#divergence.dispose()
    this.#poisson.dispose()
    this.#pressure.dispose()

    for (const key in this.#fbos) {
      const fbo = this.#fbos[key as keyof SimulationFBOS]
      fbo.dispose()
    }

    for (const key in this.#parameters) {
      const parameter = this.#parameters[key as keyof Simulation['parameters']]
      parameter.close()
    }
  }

  protected init() {
    this.#calcSize()
    this.#createAllFBO()
    this.#createShaderPass()

    setTimeout(() => {
      this.#parameters.isViscous.subscribe(() => {})

      this.#parameters.viscous.subscribe(() => {})

      this.#parameters.iterationsViscous.subscribe(() => {})

      this.#parameters.pointerSize.subscribe(() => {})

      this.#parameters.pointerForce.subscribe(() => {})

      this.#parameters.dt.subscribe(() => {})

      this.#parameters.resolution.subscribe(() => {
        this.resize()
      })

      this.#parameters.iterationsPoisson.subscribe(() => {})
      this.#parameters.isBounce.subscribe(() => {})
      this.#parameters.BFECC.subscribe(() => {})
    })
  }

  #calcSize() {
    const width = Math.round(this.#parameters.resolution.current * en3.width)
    const height = Math.round(this.#parameters.resolution.current * en3.height)

    const px_x = 1.0 / width
    const px_y = 1.0 / height

    this.#cellScale.set(px_x, px_y)
    this.#fboSize.set(width, height)
  }

  #createAllFBO() {
    const type = device.isApple ? HalfFloatType : FloatType

    for (let key in this.#fbos) {
      this.#fbos[key as keyof SimulationFBOS] = new WebGLRenderTarget(
        this.#fboSize.x,
        this.#fboSize.y,
        {
          type: type,
        }
      )
    }
  }

  #createShaderPass() {
    this.#advection = new Advection({
      cellScale: this.#cellScale,
      fboSize: this.#fboSize,
      dt: this.#parameters.dt.current,
      src: this.#fbos.vel0,
      dst: this.#fbos.vel1,
      BFECC: this.#parameters.BFECC.current,
    })

    this.#externalForce = new ExternalForce({
      cellScale: this.#cellScale,
      pointerSize: this.#parameters.pointerSize.current,
      dst: this.#fbos.vel1,
    })

    this.#viscous = new Viscous({
      cellScale: this.#cellScale,
      boundarySpace: this.#boundarySpace,
      viscous: this.#parameters.viscous.current,
      src: this.#fbos.vel1,
      dst: this.#fbos.velViscous1,
      dst_: this.#fbos.velViscous0,
      dt: this.#parameters.dt.current,
    })

    this.#divergence = new Divergence({
      cellScale: this.#cellScale,
      boundarySpace: this.#boundarySpace,
      src: this.#fbos.velViscous0,
      dst: this.#fbos.div,
      dt: this.#parameters.dt.current,
    })

    this.#poisson = new Poisson({
      cellScale: this.#cellScale,
      boundarySpace: this.#boundarySpace,
      src: this.#fbos.div,
      dst: this.#fbos.pressure1,
      dst_: this.#fbos.pressure0,
    })

    this.#pressure = new Pressure({
      cellScale: this.#cellScale,
      boundarySpace: this.#boundarySpace,
      srcP: this.#fbos.pressure0,
      srcV: this.#fbos.velViscous0,
      dst: this.#fbos.vel0,
      dt: this.#parameters.dt.current,
    })
  }
}
