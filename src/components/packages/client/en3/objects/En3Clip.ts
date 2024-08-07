import { LayoutBox } from '@packages/client/layout-box'
import { TICK_ORDER } from '@packages/client/order'
import { ticker } from '@packages/client/ticker'
import { ElementOrSelector } from '@packages/client/utils'

import { Plane, Vector3 } from 'three'

import { En3View } from '../core/En3View'
import { en3 } from '../core/en3'

export interface En3ClipOptions {
  viewName?: string
  scale?: number
}

export class En3Clip {
  #view: En3View
  #layoutBox: LayoutBox
  #planes: Array<Plane> = []

  constructor(
    elementOrSelector: ElementOrSelector<HTMLElement>,
    options?: En3ClipOptions
  ) {
    this.#view = en3.getView(options?.viewName || 'default')

    this.#layoutBox = new LayoutBox(elementOrSelector, { cartesian: false })

    const scale = options?.scale || 1

    this.#planes = [
      new Plane(new Vector3(0, -1 * scale, 0)),
      new Plane(new Vector3(0, 1 * scale, 0)),
      new Plane(new Vector3(-1 * scale, 0, 0)),
      new Plane(new Vector3(1 * scale, 0, 0)),
    ]

    ticker.subscribe(this.#tickListener, { order: TICK_ORDER.LAYOUT_BOX })
  }

  public get planes() {
    return this.#planes
  }

  public get layoutBox() {
    return this.#layoutBox
  }

  public destroy() {
    ticker.unsubscribe(this.#tickListener)
    this.#layoutBox.destroy()
  }

  #tickListener = () => {
    const left = this.#layoutBox.left - this.#view.box.left
    const top = this.#layoutBox.top - this.#view.box.top

    let scrollValueX = 0
    let scrollValueY = 0

    if (!this.#view.isClipped) {
      scrollValueX = this.#layoutBox.position.x - this.#layoutBox.left
      scrollValueY = this.#layoutBox.position.y - this.#layoutBox.top
    }

    const sizeXDiff = this.#view.box.width - this.#layoutBox.scale.x
    const xDiff = left - sizeXDiff
    const sizeYDiff = this.#view.box.height - this.#layoutBox.scale.y
    const yDiff = top - sizeYDiff

    // Top
    this.#planes[0].constant =
      this.#layoutBox.scale.y / 2 + scrollValueY * -1 - sizeYDiff / 2 - yDiff

    // Bottom
    this.#planes[1].constant =
      this.#layoutBox.scale.y / 2 + scrollValueY + sizeYDiff / 2 + yDiff

    // Right
    this.#planes[2].constant =
      this.#layoutBox.scale.x / 2 + scrollValueX + sizeXDiff / 2 + xDiff

    // Left
    this.#planes[3].constant =
      this.#layoutBox.scale.x / 2 + scrollValueX * -1 - sizeXDiff / 2 - xDiff
  }
}
