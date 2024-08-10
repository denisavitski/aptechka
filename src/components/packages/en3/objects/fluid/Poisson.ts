import { Texture, Vector2, WebGLRenderTarget } from 'three'

import faceVert from './glsl/face.vert?raw'
import poissonFrag from './glsl/poisson.frag?raw'

import { ShaderPass } from './ShaderPass'

export interface PoissonParameters {
  boundarySpace: Vector2
  dst: WebGLRenderTarget<Texture>
  dst_: WebGLRenderTarget<Texture>
  src: WebGLRenderTarget<Texture>
  cellScale: Vector2
}

export interface PoissonUpdateParameters {
  iterations: number
}

export interface PoissonUniforms {
  boundarySpace: Vector2
  pressure: Texture
  divergence: Texture
  px: Vector2
}

export class Poisson extends ShaderPass<PoissonUniforms> {
  #output0: WebGLRenderTarget<Texture>
  #output1: WebGLRenderTarget<Texture>

  constructor(parameters: PoissonParameters) {
    super({
      material: {
        vertexShader: faceVert,
        fragmentShader: poissonFrag,
        uniforms: {
          boundarySpace: parameters.boundarySpace,
          pressure: parameters.dst_.texture,
          divergence: parameters.src.texture,
          px: parameters.cellScale,
        },
      },
      output: parameters.dst,
    })

    this.#output0 = parameters.dst_
    this.#output1 = parameters.dst

    this.init()
  }

  public override update(parameters: PoissonUpdateParameters) {
    let pIn: WebGLRenderTarget<Texture> = null!
    let pOut: WebGLRenderTarget<Texture> = null!

    for (var i = 0; i < parameters.iterations; i++) {
      if (i % 2 == 0) {
        pIn = this.#output0
        pOut = this.#output1
      } else {
        pIn = this.#output1
        pOut = this.#output0
      }

      this.uniforms.pressure.value = pIn.texture
      this.output = pOut

      super.update()
    }

    return pOut
  }
}
