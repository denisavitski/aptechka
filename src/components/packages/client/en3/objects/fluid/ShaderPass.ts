import { en3 } from '@packages/client/en3/core/en3'
import { dispose } from '@packages/client/en3/utils/dispose'
import {
  Camera,
  Mesh,
  PlaneGeometry,
  RawShaderMaterial,
  Scene,
  type ShaderMaterialParameters,
  Texture,
  WebGLRenderTarget,
} from 'three'

export interface ShaderPassParameters<
  Uniforms extends ShaderPassDefaultUniforms = ShaderPassDefaultUniforms
> {
  material?: Omit<ShaderMaterialParameters, 'uniforms'> & {
    uniforms?: Uniforms
  }
  output: WebGLRenderTarget<Texture>
}

export type ShaderPassDefaultUniforms = { [key: string]: any }

export class ShaderPass<
  Uniforms extends ShaderPassDefaultUniforms = ShaderPassDefaultUniforms
> {
  public output: WebGLRenderTarget<Texture>

  #scene: Scene = null!
  #camera: Camera = null!

  #geometry: PlaneGeometry = null!
  #material: RawShaderMaterial = null!
  #plane: Mesh<PlaneGeometry, RawShaderMaterial> = null!

  #materialParameters: ShaderMaterialParameters | undefined
  #uniforms = {} as { [K in keyof Uniforms]: { value: Uniforms[K] } }

  constructor(parameters: ShaderPassParameters<Uniforms>) {
    this.#materialParameters = parameters.material

    if (parameters.material?.uniforms) {
      for (const key in parameters.material.uniforms) {
        this.#uniforms[key] = { value: parameters.material.uniforms[key] }
      }
    }

    this.output = parameters.output
  }

  public get scene() {
    return this.#scene
  }

  public get camera() {
    return this.#camera
  }

  public get uniforms() {
    return this.#uniforms
  }

  public update(..._args: any[]) {
    en3.webglRenderer.setRenderTarget(this.output)
    en3.webglRenderer.render(this.#scene, this.#camera)
    en3.webglRenderer.setRenderTarget(null)
  }

  public dispose() {
    dispose(this.#camera)
    dispose(this.#scene)
  }

  protected init(..._args: any[]) {
    this.#scene = new Scene()
    this.#camera = new Camera()

    if (Object.keys(this.#uniforms).length) {
      this.#geometry = new PlaneGeometry(2.0, 2.0)

      this.#material = new RawShaderMaterial({
        ...this.#materialParameters,
        uniforms: this.#uniforms,
      })

      this.#plane = new Mesh(this.#geometry, this.#material)
      this.#scene.add(this.#plane)
    }
  }
}
