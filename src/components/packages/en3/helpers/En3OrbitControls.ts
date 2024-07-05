import { Store } from '@packages/store'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { en3 } from '../core/en3'

export class En3OrbitControls {
  #controls: OrbitControls
  #target: Store<[number, number, number]>

  constructor() {
    this.#controls = new OrbitControls(en3.camera, en3.webglRenderer.domElement)

    this.#target = new Store([0, 0, 0], {
      passport: {
        name: 'Controls.OrbitControls.Target',
        manager: {
          type: 'number',
          step: 0.0001,
          ease: 10,
        },
      },
    })

    let updateAllowed = true

    this.#target.subscribe((e) => {
      this.#controls.target.set(...e.current)

      if (updateAllowed) {
        this.#controls.update()
      }
    })

    this.#controls.addEventListener('change', () => {
      updateAllowed = false

      this.#target.current = [
        this.#controls.target.x,
        this.#controls.target.y,
        this.#controls.target.z,
      ]

      updateAllowed = true
    })
  }

  public get controls() {
    return this.#controls
  }

  public destroy() {
    this.#controls.dispose()
    this.#target.close()
  }
}
