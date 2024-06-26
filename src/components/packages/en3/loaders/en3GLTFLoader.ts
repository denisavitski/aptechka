/**
 * https://github.com/donmccurdy/three-gltf-viewer/blob/main/src/viewer.js
 */

import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { en3 } from '../core/en3'
import { en3Cache } from './en3Cache'
import { dispose } from '../utils/dispose'

class En3GLTFLoader {
  readonly #gltfLoader = new GLTFLoader()

  public get gltfLoader() {
    return this.#gltfLoader
  }

  public async setLoaders(options?: {
    draco?: boolean | string | null
    ktx2?: boolean | string | null
    meshopt?: boolean
  }) {
    if (options?.draco) {
      const { DRACOLoader } = await import(
        'three/examples/jsm/loaders/DRACOLoader.js'
      )
      const dracoLoader = new DRACOLoader()

      const path =
        typeof options.draco === 'boolean'
          ? `${en3.CDNVersion}/examples/jsm/libs/draco/gltf/`
          : options.draco

      dracoLoader.setDecoderPath(path)

      this.#gltfLoader.setDRACOLoader(dracoLoader)
    }

    if (options?.ktx2) {
      const { KTX2Loader } = await import(
        'three/examples/jsm/loaders/KTX2Loader.js'
      )
      const ktx2Loader = new KTX2Loader()

      const path =
        typeof options.ktx2 === 'boolean'
          ? `${en3.CDNVersion}/examples/jsm/libs/basis/`
          : options.ktx2

      ktx2Loader.setTranscoderPath(path)

      this.#gltfLoader.setKTX2Loader(
        ktx2Loader.detectSupport(en3.webglRenderer)
      )
    }

    if (options?.meshopt) {
      const { MeshoptDecoder } = await import('../libs/MeshoptDecoder')

      this.#gltfLoader.setMeshoptDecoder(MeshoptDecoder())
    }
  }

  public load(...parameters: Parameters<typeof this.gltfLoader.load>) {
    const [url, onLoad, ...rest] = parameters

    if (en3.cacheAssets && en3Cache.has(url)) {
      const cached = en3Cache.get(url)!.data as GLTF

      onLoad(cached)
    } else {
      this.gltfLoader.load(
        url,
        (data) => {
          if (en3.cacheAssets) {
            en3Cache.set(url, {
              data: data,
              dispose: () => {
                data.cameras.forEach((c) => dispose(c))
                data.scenes.forEach((scene) => {
                  dispose(scene)
                })
              },
            })
          }

          onLoad(data)
        },
        ...rest
      )
    }
  }
}

export const en3GLTFLoader = new En3GLTFLoader()
