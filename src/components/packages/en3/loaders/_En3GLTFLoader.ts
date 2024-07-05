/**
 * https://github.com/donmccurdy/three-gltf-viewer/blob/main/src/viewer.js
 */

import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { en3 } from '../core/en3'
import { en3Cache } from '../core/en3Cache'
import { dispose } from '../utils/dispose'
import { loaders } from '.'

export class En3GLTFLoader {
  #gltfLoader: GLTFLoader = new GLTFLoader()

  public get gltfLoader() {
    return this.#gltfLoader
  }

  public setLoaders(options?: {
    draco?: boolean | string | null
    ktx2?: boolean | string | null
    meshopt?: boolean
  }) {
    if (options?.draco && loaders.dracoLoader) {
      const path =
        typeof options.draco === 'boolean'
          ? `${en3.CDNVersion}/examples/jsm/libs/draco/gltf/`
          : options.draco

      loaders.dracoLoader.setDecoderPath(path)

      this.#gltfLoader.setDRACOLoader(loaders.dracoLoader)
    }

    if (options?.ktx2 && loaders.ktx2Loader) {
      const path =
        typeof options.ktx2 === 'boolean'
          ? `${en3.CDNVersion}/examples/jsm/libs/basis/`
          : options.ktx2

      loaders.ktx2Loader.setTranscoderPath(path)

      this.#gltfLoader.setKTX2Loader(
        loaders.ktx2Loader.detectSupport(en3.webglRenderer)
      )
    }

    if (options?.meshopt && loaders.meshoptDecoder) {
      this.#gltfLoader.setMeshoptDecoder(loaders.meshoptDecoder)
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
