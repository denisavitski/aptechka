import { Pass } from 'three/examples/jsm/Addons.js'
import { en3 } from '../core/en3'

export class En3ComposerManager {
  #originalAddPass
  #originalRemovePass
  #originalInsertPass

  constructor() {
    this.#originalAddPass = en3.composer.addPass = en3.composer.addPass.bind(
      en3.composer
    )

    en3.composer.addPass = (...args) => {
      this.#addPass(args[0])
      this.#originalAddPass(...args)
    }

    this.#originalRemovePass = en3.composer.removePass =
      en3.composer.removePass.bind(en3.composer)

    en3.composer.removePass = (...args) => {
      this.#removePass(args[0])
      this.#originalRemovePass(...args)
    }

    this.#originalInsertPass = en3.composer.insertPass =
      en3.composer.insertPass.bind(en3.composer)

    en3.composer.insertPass = (...args) => {
      this.#addPass(args[0])
      this.#originalInsertPass(...args)
    }
  }

  public destroy() {
    en3.composer.addPass = this.#originalAddPass
    en3.composer.removePass = this.#originalRemovePass
    en3.composer.insertPass = this.#originalInsertPass
  }

  #addPass(pass: Pass) {
    // TODO
  }

  #removePass(pass: Pass) {
    // TODO
  }
}
