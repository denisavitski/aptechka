import { Texture, Vector2, WebGLRenderTarget } from 'three'

import faceVert from './glsl/face.vert?raw'
import divergenceFrag from './glsl/divergence.frag?raw'

import { ShaderPass } from './ShaderPass'

export interface DivergenceParameters {
  boundarySpace: Vector2
  src: WebGLRenderTarget<Texture>
  cellScale: Vector2
  dt: number
  dst: WebGLRenderTarget<Texture>
}

export interface DivergenceUpdateParameters {
  vel: WebGLRenderTarget<Texture>
}

export interface DivergenceUniforms {
  boundarySpace: Vector2
  velocity: Texture
  px: Vector2
  dt: number
}

export class Divergence extends ShaderPass<DivergenceUniforms> {
  constructor(parameters: DivergenceParameters) {
    super({
      material: {
        vertexShader: faceVert,
        fragmentShader: divergenceFrag,
        uniforms: {
          boundarySpace: parameters.boundarySpace,
          velocity: parameters.src.texture,
          px: parameters.cellScale,
          dt: parameters.dt,
        },
      },
      output: parameters.dst,
    })

    this.init()
  }

  public override update(parameters: DivergenceUpdateParameters) {
    this.uniforms.velocity.value = parameters.vel.texture
    super.update()
  }
}
