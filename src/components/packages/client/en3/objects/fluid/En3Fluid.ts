/**
 * Based on https://github.com/mnmxmx/fluid-three
 */

import { Color, Mesh, PlaneGeometry, RawShaderMaterial, Vector2 } from 'three'

import { Store } from '@packages/client/store'
import { Tweened } from '@packages/client/animation'
import { debounce, easeInOutCubic } from '@packages/client/utils'

import faceVert from './glsl/face.vert?raw'
import colorFrag from './glsl/color.frag?raw'

import { Simulation } from './Simulation'
import { en3FluidPointer } from './En3FluidPointer'

export class En3Fluid extends Mesh<PlaneGeometry, RawShaderMaterial> {
  public colorTweenDuration = 1000

  #simulation: Simulation

  #backgroundColor = new Store('#000000', {
    passport: {
      name: 'Fluid.Цвета.Фон.Цвет',
      manager: {
        type: 'color',
      },
    },
  })

  #backgroundMixThreshold = new Store(1, {
    passport: {
      name: 'Fluid.Цвета.Фон.Порог',
      manager: {
        type: 'number',
        min: 0,
        max: 1,
      },
    },
  })

  #backgroundOpacity = new Store(1, {
    passport: {
      name: 'Fluid.Цвета.Фон.Прозрачность',
      manager: {
        type: 'number',
        min: 0,
        max: 1,
      },
    },
  })

  #fluidColor = new Store('#ffffff', {
    passport: {
      name: 'Fluid.Цвета.Жидкость.Цвет',
      manager: {
        type: 'color',
      },
    },
  })

  #fluidOpacity = new Store(1, {
    passport: {
      name: 'Fluid.Цвета.Жидкость.Прозрачность',
      manager: {
        type: 'number',
        min: 0,
        max: 1,
      },
    },
  })

  #colorTween = new Tweened(0, {
    easing: easeInOutCubic,
    min: 0,
    max: 1,
    duration: this.colorTweenDuration,
  })

  #fluidThreeColor = new Color()
  #backgroundThreeColor = new Color()

  #newFluidThreeColor = new Color()
  #newBackgroundThreeColor = new Color()

  constructor() {
    super()

    this.#simulation = new Simulation()

    en3FluidPointer.init()

    this.geometry = new PlaneGeometry(2, 2)

    this.material = new RawShaderMaterial({
      vertexShader: faceVert,
      fragmentShader: colorFrag,
      transparent: true,
      uniforms: {
        velocity: {
          value: this.#simulation.fbos.vel0.texture,
        },
        backgroundColor: {
          value: this.#backgroundThreeColor,
        },
        backgroundOpacity: {
          value: this.#backgroundOpacity.current,
        },
        fluidColor: {
          value: this.#fluidThreeColor,
        },
        fluidOpacity: {
          value: this.#fluidOpacity.current,
        },
        backgroundMixThreshold: {
          value: 0,
        },
        opacity: {
          value: 1,
        },
        boundarySpace: {
          value: new Vector2(0, 0),
        },
      },
    })

    this.#backgroundColor.subscribe((e) => {
      this.#newBackgroundThreeColor = new Color(e.current)
      this.#startTween()
    })

    this.#fluidColor.subscribe((e) => {
      this.#newFluidThreeColor = new Color(e.current)
      this.#startTween()
    })

    this.#backgroundOpacity.subscribe((e) => {
      this.material.uniforms.backgroundOpacity!.value = e.current
    })

    this.#fluidOpacity.subscribe((e) => {
      this.material.uniforms.fluidOpacity!.value = e.current
    })

    this.#backgroundMixThreshold.subscribe((e) => {
      this.material.uniforms.backgroundMixThreshold!.value = e.current
    })

    this.#colorTween.subscribe((e) => {
      this.#backgroundThreeColor.lerp(this.#newBackgroundThreeColor, e.current)
      this.#fluidThreeColor.lerp(this.#newFluidThreeColor, e.current)
    })
  }

  public get backgroundColor() {
    return this.#backgroundColor
  }

  public get backgroundMixThreshold() {
    return this.#backgroundMixThreshold
  }

  public get backgroundOpacity() {
    return this.#backgroundOpacity
  }

  public get fluidColor() {
    return this.#fluidColor
  }

  public get fluidOpacity() {
    return this.#fluidOpacity
  }

  public resize() {
    this.#simulation.resize()
  }

  public update() {
    en3FluidPointer.update()
    this.#simulation.update()
  }

  public dispose() {
    en3FluidPointer.dispose()
    this.#simulation.dispose()
    this.#backgroundColor.close()
    this.#backgroundOpacity.close()
    this.#fluidColor.close()
    this.#fluidOpacity.close()
    this.#backgroundMixThreshold.close()
  }

  #startTween = debounce(() => {
    this.#colorTween.reset()
    this.#colorTween.set(1)
  }, 0)
}
