import { Group } from 'three'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { en3 } from '../core/en3'
import { dispose } from '../utils/dispose'
import {
  En3SourceManager,
  En3SourceManagerParameters,
} from '../misc/En3SourceManager'
import { loaders } from '../loaders/loaders'

import { En3SourceConsumer } from './En3SourceConsumer'

export class En3GLTF extends Group implements En3SourceConsumer<GLTF> {
  #sourceManager: En3SourceManager<GLTF>

  constructor(parameters: En3SourceManagerParameters<GLTF>) {
    super()

    this.#sourceManager = new En3SourceManager({
      loader: loaders.gltfLoader,
      consumer: this,
      ...parameters,
    })

    this.#sourceManager.processData = (data) => {
      if (en3.cacheAssets) {
        const d = {
          ...data,
        }

        d.scene = data.scene.clone(true)

        d.scenes = data.scenes.map((scene) => {
          return data.scene === scene ? d.scene : scene.clone(true)
        })

        return d
      }

      return data
    }

    this.#sourceManager.data.subscribe((detail) => {
      if (!detail.current) {
        this.children.forEach((child) => {
          this.remove(child)
          dispose(child)
        })
      } else {
        this.add(...detail.current.scene.children)
      }
    })
  }

  public get sourceManager() {
    return this.#sourceManager
  }

  public destroy() {
    this.#sourceManager.close()
    dispose(this)
  }
}
