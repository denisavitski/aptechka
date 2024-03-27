import { Plane, Vector3 } from 'three'
import { LayoutBox } from '@packages/layout-box'
import { TICK_ORDER } from '@packages/order'
import { ticker } from '@packages/ticker'
import { ElementOrSelector } from '@packages/utils'

export class En3Clip {
  #layoutBox: LayoutBox = null!
  #planes: Array<Plane> = []

  constructor(elementOrSelector: ElementOrSelector<HTMLElement>, scale = 1) {
    this.#layoutBox = new LayoutBox(elementOrSelector, { cartesian: false })

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
    const scrollValueX = this.#layoutBox.position.x
    const scrollValueY = this.#layoutBox.position.y

    // Top
    this.#planes[0].constant = this.#layoutBox.scale.y / 2 + scrollValueY * -1

    // Bottom
    this.#planes[1].constant = this.#layoutBox.scale.y / 2 + scrollValueY

    // Right
    this.#planes[2].constant = this.#layoutBox.scale.x / 2 + scrollValueX

    // Left
    this.#planes[3].constant = this.#layoutBox.scale.x / 2 + scrollValueX * -1
  }
}
