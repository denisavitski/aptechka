/**
 * https://github.com/donmccurdy/three-gltf-viewer/blob/main/src/viewer.js
 */

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'

import { MeshoptDecoder } from '../libs/MeshoptDecoder'
import { en3 } from '../core/en3'

class En3GLTFLoader {
  readonly #gltfLoader = new GLTFLoader()

  readonly #dracoLoader = new DRACOLoader().setDecoderPath(
    `${en3.CDNVersion}/examples/jsm/libs/draco/gltf/`
  )

  readonly #ktx2Loader = new KTX2Loader().setTranscoderPath(
    `${en3.CDNVersion}/examples/jsm/libs/basis/`
  )

  #ktx2DetectedSupport = false

  constructor() {
    this.#gltfLoader
      .setCrossOrigin('anonymous')
      .setDRACOLoader(this.#dracoLoader)
      .setMeshoptDecoder(MeshoptDecoder)
  }

  public get gltfLoader() {
    return this.#gltfLoader
  }

  public get dracoLoader() {
    return this.#dracoLoader
  }

  public get ktx2Loader() {
    return this.#ktx2Loader
  }

  public load(...parameters: Parameters<typeof this.gltfLoader.load>) {
    if (!this.#ktx2DetectedSupport) {
      this.#gltfLoader.setKTX2Loader(this.#ktx2Loader.detectSupport(en3.webglRenderer))
      this.#ktx2DetectedSupport = true
    }

    this.gltfLoader.load(...parameters)
  }
}

export const en3GLTFLoader = new En3GLTFLoader()
