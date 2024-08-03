import {
  BufferAttribute,
  BufferGeometry,
  LineSegments,
  RawShaderMaterial,
  Texture,
  Vector2,
  WebGLRenderTarget,
} from 'three'

import faceVert from './glsl/face.vert?raw'
import lineVert from './glsl/line.vert?raw'
import advectionFrag from './glsl/advection.frag?raw'
import { ShaderPass } from './ShaderPass'

export interface AdvectionParameters {
  cellScale: Vector2
  fboSize: Vector2
  dt: number
  src: WebGLRenderTarget<Texture>
  dst: WebGLRenderTarget<Texture>
  BFECC: boolean
}

export interface AdvectionUpdateParameters {
  dt: number
  isBounce: boolean
  BFECC: boolean
}

export interface AdvectionUniforms {
  boundarySpace: Vector2
  px: Vector2
  fboSize: Vector2
  velocity: Texture
  dt: number
  isBFECC: boolean
}

export class Advection extends ShaderPass<AdvectionUniforms> {
  #line: LineSegments = null!

  constructor(parameters: AdvectionParameters) {
    super({
      material: {
        vertexShader: faceVert,
        fragmentShader: advectionFrag,
        uniforms: {
          boundarySpace: parameters.cellScale,
          px: parameters.cellScale,
          fboSize: parameters.fboSize,
          velocity: parameters.src.texture,
          dt: parameters.dt,
          isBFECC: parameters.BFECC,
        },
      },
      output: parameters.dst,
    })

    this.init()
  }

  public override update(parameters: AdvectionUpdateParameters) {
    this.uniforms.dt.value = parameters.dt
    this.#line.visible = parameters.isBounce
    this.uniforms.isBFECC.value = parameters.BFECC

    super.update()
  }

  protected override init() {
    super.init()
    this.#createBoundary()
  }

  #createBoundary() {
    const boundaryG = new BufferGeometry()

    const verticesBoundary = new Float32Array([
      // left
      -1, -1, 0, -1, 1, 0,

      // top
      -1, 1, 0, 1, 1, 0,

      // right
      1, 1, 0, 1, -1, 0,

      // bottom
      1, -1, 0, -1, -1, 0,
    ])

    boundaryG.setAttribute('position', new BufferAttribute(verticesBoundary, 3))

    const boundaryM = new RawShaderMaterial({
      vertexShader: lineVert,
      fragmentShader: advectionFrag,
      uniforms: this.uniforms,
    })

    this.#line = new LineSegments(boundaryG, boundaryM)
    this.scene.add(this.#line)
  }
}
