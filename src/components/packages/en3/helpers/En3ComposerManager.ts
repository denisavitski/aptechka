import { Pass } from 'three/examples/jsm/Addons.js'
import { en3 } from '../core/en3'
import { En3ParametersManager } from './En3ParametersManager'

export class En3ComposerManager {
  #originalAddPass
  #originalRemovePass
  #originalInsertPass

  #managers: Array<En3ParametersManager> = []

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

    this.#managers.forEach((m) => {
      m.destroy()
    })
  }

  #addPass(pass: Pass) {
    // TODO

    this.#managers.push(
      new En3ParametersManager(pass, {
        folderName: `EffectComposer.${pass.constructor.name}`,
        skipKeys: [
          'renderToScreen',
          'needsSwap',
          'nMips',
          'oldClearAlpha',
          'clearColor',
          'resolution',
        ],
      })
    )

    if ('uniforms' in pass) {
      this.#managers.push(
        new En3ParametersManager(pass.uniforms, {
          folderName: `EffectComposer.${pass.constructor.name}.Uniforms`,
          optionsCatalog: {
            maxblur: {
              type: 'number',
              min: 0,
              max: 1,
              step: 0.00001,
              ease: 0.1,
            },
            aperture: {
              type: 'number',
              min: 0,
              max: 0.01,
              step: 0.000001,
            },
            focus: {
              type: 'number',
              min: 0,
              step: 0.01,
            },
          },
          skipKeys: ['time', 'resolution'],
        })
      )
    }
  }

  #removePass(pass: Pass) {
    // TODO
  }
}
