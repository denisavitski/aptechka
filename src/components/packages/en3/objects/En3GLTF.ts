import { Group } from 'three'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { en3 } from '../core/en3'
import { dispose } from '../utils/dispose'
import { en3GLTFLoader } from '../loaders/en3GLTFLoader'
import { En3SourceConsumer } from './En3SourceConsumer'
import {
  En3SourceManager,
  En3SourceManagerParameters,
} from '../attachments/En3SourceManager'

export class En3GLTF extends Group implements En3SourceConsumer<GLTF> {
  #sourceManager: En3SourceManager<GLTF>

  constructor(parameters: En3SourceManagerParameters<GLTF>) {
    super()

    this.#sourceManager = new En3SourceManager({
      loader: en3GLTFLoader,
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
}
