import { Material, WebGLProgramParametersWithUniforms } from 'three'

export type En3VertexChunk =
  | 'begin_vertex'
  | 'beginnormal_vertex'
  | 'clipping_planes_pars_vertex'
  | 'clipping_planes_vertex'
  | 'color_pars_vertex'
  | 'color_vertex'
  | 'default_vertex'
  | 'defaultnormal_vertex'
  | 'displacementmap_pars_vertex'
  | 'displacementmap_vertex'
  | 'envmap_pars_vertex'
  | 'envmap_vertex'
  | 'fog_pars_vertex'
  | 'fog_vertex'
  | 'lights_pars_begin'
  | 'logdepthbuf_pars_vertex'
  | 'logdepthbuf_vertex'
  | 'morphcolor_vertex'
  | 'morphnormal_vertex'
  | 'morphtarget_pars_vertex'
  | 'morphtarget_vertex'
  | 'normal_pars_vertex'
  | 'normal_vertex'
  | 'project_vertex'
  | 'shadowmap_pars_vertex'
  | 'shadowmap_vertex'
  | 'skinbase_vertex'
  | 'skinning_pars_vertex'
  | 'skinning_vertex'
  | 'skinnormal_vertex'
  | 'uv_pars_vertex'
  | 'uv_vertex'
  | 'worldpos_vertex'

export type En3FragmentChunk =
  | 'alphahash_fragment'
  | 'alphahash_pars_fragment'
  | 'alphamap_fragment'
  | 'alphamap_pars_fragment'
  | 'alphatest_fragment'
  | 'alphatest_pars_fragment'
  | 'aomap_fragment'
  | 'aomap_pars_fragment'
  | 'bumpmap_pars_fragment'
  | 'clearcoat_normal_fragment_begin'
  | 'clearcoat_normal_fragment_maps'
  | 'clearcoat_pars_fragment'
  | 'clipping_planes_fragment'
  | 'clipping_planes_pars_fragment'
  | 'color_fragment'
  | 'color_pars_fragment'
  | 'colorspace_fragment'
  | 'colorspace_pars_fragment'
  | 'cube_uv_reflection_fragment'
  | 'default_fragment'
  | 'dithering_fragment'
  | 'dithering_pars_fragment'
  | 'emissivemap_fragment'
  | 'emissivemap_pars_fragment'
  | 'envmap_common_pars_fragment'
  | 'envmap_fragment'
  | 'envmap_pars_fragment'
  | 'envmap_physical_pars_fragment'
  | 'fog_fragment'
  | 'fog_pars_fragment'
  | 'gradientmap_pars_fragment'
  | 'iridescence_fragment'
  | 'iridescence_pars_fragment'
  | 'lightmap_fragment'
  | 'lightmap_pars_fragment'
  | 'lights_fragment_begin'
  | 'lights_fragment_end'
  | 'lights_fragment_maps'
  | 'lights_lambert_fragment'
  | 'lights_lambert_pars_fragment'
  | 'lights_phong_fragment'
  | 'lights_phong_pars_fragment'
  | 'lights_physical_fragment'
  | 'lights_physical_pars_fragment'
  | 'lights_toon_fragment'
  | 'lights_toon_pars_fragment'
  | 'logdepthbuf_fragment'
  | 'logdepthbuf_pars_fragment'
  | 'map_fragment'
  | 'map_pars_fragment'
  | 'map_particle_fragment'
  | 'map_particle_pars_fragment'
  | 'metalnessmap_fragment'
  | 'metalnessmap_pars_fragment'
  | 'normal_fragment_begin'
  | 'normal_fragment_maps'
  | 'normal_pars_fragment'
  | 'normalmap_pars_fragment'
  | 'opaque_fragment'
  | 'premultiplied_alpha_fragment'
  | 'roughnessmap_fragment'
  | 'roughnessmap_pars_fragment'
  | 'shadowmap_pars_fragment'
  | 'shadowmask_pars_fragment'
  | 'specularmap_fragment'
  | 'specularmap_pars_fragment'
  | 'tonemapping_fragment'
  | 'tonemapping_pars_fragment'
  | 'transmission_fragment'
  | 'transmission_pars_fragment'
  | 'uv_pars_fragment'

export type En3ModifiedMaterialUniforms = { [key: string]: { value: any } }

export interface En3ModifiedMaterialParameters<
  TMaterial extends Material,
  Uniforms extends En3ModifiedMaterialUniforms = {}
> {
  material: TMaterial
  uniforms?: Uniforms
  vertextDeclarations?: string
  fragmentDeclarations?: string
  vertexChunk?: {
    update?: En3VertexChunk
    replace?: En3VertexChunk
    content: string
  }
  fragmentChunk?: {
    update?: En3FragmentChunk
    replace?: En3FragmentChunk
    content: string
  }
  log?: boolean
  onReady?: (modifiedMaterial: En3ModifiedMaterial<TMaterial, Uniforms>) => Function | void
}

export class En3ModifiedMaterial<
  TMaterial extends Material,
  Uniforms extends En3ModifiedMaterialUniforms = {}
> {
  #material: TMaterial
  #uniforms: Uniforms

  constructor(parameters: En3ModifiedMaterialParameters<TMaterial, Uniforms>) {
    this.#material = parameters.material
    this.#uniforms = (parameters.uniforms || {}) as Uniforms
    this.#material.userData.uniforms = this.#uniforms

    let destroy: Function | void

    const dispose = () => {
      destroy?.()
    }

    this.#material.addEventListener('dispose', dispose)

    this.#material.onBeforeCompile = (shader) => {
      destroy?.()

      for (const key in this.#uniforms) {
        shader.uniforms[key] = this.#uniforms[key]
      }

      if (parameters.vertextDeclarations) {
        shader.vertexShader = `
          ${parameters.vertextDeclarations}
          ${shader.vertexShader}
        `
      }

      if (parameters.fragmentDeclarations) {
        shader.fragmentShader = `
          ${parameters.fragmentDeclarations}
          ${shader.fragmentShader}
        `
      }

      this.#chunk(shader, 'vertex', parameters)
      this.#chunk(shader, 'fragment', parameters)

      destroy = parameters.onReady?.(this)

      if (parameters.log) {
        console.log('VERTEX SHADER: ', shader.vertexShader)
        console.log('FRAGMENT SHADER: ', shader.fragmentShader)
      }
    }
  }

  public get material() {
    return this.#material
  }

  public get uniforms() {
    return this.#uniforms
  }

  #chunk(
    shader: WebGLProgramParametersWithUniforms,
    type: 'vertex' | 'fragment',
    parameters: En3ModifiedMaterialParameters<TMaterial, Uniforms>
  ) {
    const chunkName = type === 'vertex' ? 'vertexChunk' : 'fragmentChunk'
    const shaderName = type === 'vertex' ? 'vertexShader' : 'fragmentShader'

    if (parameters[chunkName]) {
      if (parameters[chunkName]!.replace) {
        shader[shaderName] = shader[shaderName].replace(
          `#include <${parameters[chunkName]!.replace}>`,
          parameters[chunkName]!.content
        )
      } else if (parameters[chunkName]!.update) {
        shader[shaderName] = shader[shaderName].replace(
          `#include <${parameters[chunkName]!.update}>`,
          `
            #include <${parameters[chunkName]!.update}>
            ${parameters[chunkName]!.content}
          `
        )
      }
    }
  }
}
