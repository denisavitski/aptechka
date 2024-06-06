import { Texture, Vector2, WebGLRenderTarget } from 'three'

import faceVert from './glsl/face.vert?raw'
import pressureFrag from './glsl/pressure.frag?raw'

import { ShaderPass } from './ShaderPass'

export interface PressureParameters {
  boundarySpace: Vector2
  srcP: WebGLRenderTarget<Texture>
  srcV: WebGLRenderTarget<Texture>
  dst: WebGLRenderTarget<Texture>
  cellScale: Vector2
  dt: number
}

export interface PressureUpdateParameters {
  vel: WebGLRenderTarget<Texture>
  pressure: WebGLRenderTarget<Texture>
}

export interface PressureUniforms {
  boundarySpace: Vector2
  pressure: Texture
  velocity: Texture
  px: Vector2
  dt: number
}

export class Pressure extends ShaderPass<PressureUniforms> {
  constructor(parameters: PressureParameters) {
    super({
      material: {
        vertexShader: faceVert,
        fragmentShader: pressureFrag,
        uniforms: {
          boundarySpace: parameters.boundarySpace,
          pressure: parameters.srcP.texture,
          velocity: parameters.srcV.texture,
          px: parameters.cellScale,
          dt: parameters.dt,
        },
      },
      output: parameters.dst,
    })

    this.init()
  }

  public override update(parameters: PressureUpdateParameters) {
    this.uniforms.velocity.value = parameters.vel.texture
    this.uniforms.pressure.value = parameters.pressure.texture

    super.update()
  }
}
