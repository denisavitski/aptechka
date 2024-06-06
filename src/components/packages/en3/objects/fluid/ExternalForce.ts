import {
  AdditiveBlending,
  Mesh,
  PlaneGeometry,
  RawShaderMaterial,
  Texture,
  Vector2,
  WebGLRenderTarget,
} from 'three'

import mouseVert from './glsl/mouse.vert?raw'
import externalForceFrag from './glsl/externalForce.frag?raw'

import { ShaderPass } from './ShaderPass'
import { en3FluidPointer } from './En3FluidPointer'

export interface ExternalForceParameters {
  cellScale: Vector2
  pointerSize: number
  dst: WebGLRenderTarget<Texture>
}

export interface ExternalForceUpdateParameters {
  cellScale: Vector2
  pointerForce: number
  pointerSize: number
}

export class ExternalForce extends ShaderPass {
  #mouse: Mesh<PlaneGeometry, RawShaderMaterial> = null!

  constructor(parameters: ExternalForceParameters) {
    super({
      output: parameters.dst,
    })

    this.init(parameters)
  }

  public override update(parameters: ExternalForceUpdateParameters) {
    const forceX = (en3FluidPointer.diff.x / 2) * parameters.pointerForce
    const forceY = (en3FluidPointer.diff.y / 2) * parameters.pointerForce

    const pointerSizeX = parameters.pointerSize * parameters.cellScale.x
    const pointerSizeY = parameters.pointerSize * parameters.cellScale.y

    const centerX = Math.min(
      Math.max(
        en3FluidPointer.coords.x,
        -1 + pointerSizeX + parameters.cellScale.x * 2
      ),
      1 - pointerSizeX - parameters.cellScale.x * 2
    )
    const centerY = Math.min(
      Math.max(
        en3FluidPointer.coords.y,
        -1 + pointerSizeY + parameters.cellScale.y * 2
      ),
      1 - pointerSizeY - parameters.cellScale.y * 2
    )

    const uniforms = this.#mouse.material.uniforms

    uniforms.force!.value.set(forceX, forceY)
    uniforms.center!.value.set(centerX, centerY)
    uniforms.scale!.value.set(parameters.pointerSize, parameters.pointerSize)

    super.update()
  }

  protected override init(parameters: ExternalForceParameters) {
    super.init()

    const mouseG = new PlaneGeometry(1, 1)

    const mouseM = new RawShaderMaterial({
      vertexShader: mouseVert,
      fragmentShader: externalForceFrag,
      blending: AdditiveBlending,
      uniforms: {
        px: {
          value: parameters.cellScale,
        },
        force: {
          value: new Vector2(0.0, 0.0),
        },
        center: {
          value: new Vector2(0.0, 0.0),
        },
        scale: {
          value: new Vector2(parameters.pointerSize, parameters.pointerSize),
        },
      },
    })

    this.#mouse = new Mesh(mouseG, mouseM)
    this.scene.add(this.#mouse)
  }
}
