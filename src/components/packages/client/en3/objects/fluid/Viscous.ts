import { ShaderPass } from './ShaderPass'

import viscousFrag from './glsl/viscous.frag?raw'
import faceVert from './glsl/face.vert?raw'
import { Texture, Vector2, WebGLRenderTarget } from 'three'

export interface ViscousParameters {
  boundarySpace: Vector2
  src: WebGLRenderTarget<Texture>
  dst_: WebGLRenderTarget<Texture>
  viscous: number
  cellScale: Vector2
  dt: number
  dst: WebGLRenderTarget<Texture>
}

export interface ViscousUpdateParameters {
  viscous: number
  iterations: number
  dt: number
}

export interface ViscousUniforms {
  boundarySpace: Vector2
  velocity: Texture
  velocity_new: Texture
  v: number
  px: Vector2
  dt: number
}

export class Viscous extends ShaderPass<ViscousUniforms> {
  #output0: WebGLRenderTarget<Texture>
  #output1: WebGLRenderTarget<Texture>

  constructor(parameters: ViscousParameters) {
    super({
      material: {
        vertexShader: faceVert,
        fragmentShader: viscousFrag,
        uniforms: {
          boundarySpace: parameters.boundarySpace,
          velocity: parameters.src.texture,
          velocity_new: parameters.dst_.texture,
          v: parameters.viscous,
          px: parameters.cellScale,
          dt: parameters.dt,
        },
      },

      output: parameters.dst,
    })

    this.#output0 = parameters.dst_
    this.#output1 = parameters.dst

    this.init()
  }

  public override update(parameters: ViscousUpdateParameters) {
    let fboIn: WebGLRenderTarget<Texture> = null!
    let fboOut: WebGLRenderTarget<Texture> = null!

    this.uniforms.v.value = parameters.viscous

    for (var i = 0; i < parameters.iterations; i++) {
      if (i % 2 == 0) {
        fboIn = this.#output0
        fboOut = this.#output1
      } else {
        fboIn = this.#output1
        fboOut = this.#output0
      }

      this.uniforms.velocity_new.value = fboIn.texture
      this.output = fboOut
      this.uniforms.dt.value = parameters.dt

      super.update()
    }

    return fboOut
  }
}
