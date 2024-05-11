import {
  CSS3DObject,
  CSS3DRenderer,
} from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import { RESIZE_ORDER, TICK_ORDER } from '@packages/order'
import { windowResizer } from '@packages/window-resizer'
import { ticker } from '@packages/ticker'
import { en3 } from '../core/en3'

export interface En3HTMLParameters {
  element: HTMLElement
}

export class En3HTML extends CSS3DObject {
  static #cssRenderer: CSS3DRenderer = null!

  static #createRenderer() {
    En3HTML.#cssRenderer = new CSS3DRenderer()
    En3HTML.#cssRenderer.domElement.style.cssText = `
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      pointer-events: none;
      overflow: hidden;
    `

    en3.containerElement.prepend(En3HTML.#cssRenderer.domElement)

    windowResizer.subscribe(this.#resizeListener, RESIZE_ORDER.EN3 + 1)
    ticker.subscribe(this.#tickListener, { order: TICK_ORDER.EN3 + 1 })
  }

  public static destroy() {
    windowResizer.unsubscribe(this.#resizeListener)
    ticker.unsubscribe(this.#tickListener)

    this.#cssRenderer = null!
  }

  static #tickListener = () => {
    this.#cssRenderer.render(en3.view.scene, en3.view.camera)
  }

  static #resizeListener = () => {
    this.#cssRenderer.setSize(en3.width, en3.height)
  }

  constructor(parameters: En3HTMLParameters) {
    super(parameters.element)

    if (!En3HTML.#cssRenderer) {
      En3HTML.#createRenderer()
    }
  }
}
