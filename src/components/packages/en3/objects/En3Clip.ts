import { LayoutBox } from '@packages/layout-box'
import { TICK_ORDER } from '@packages/order'
import { ticker } from '@packages/ticker'
import { ElementOrSelector } from '@packages/utils'
import { Material, Plane, Vector3 } from 'three'

export class En3Clip {
  #layoutBox: LayoutBox = null!
  #planes: Array<Plane> = []

  constructor(
    material: Material,
    elementOrSelector: ElementOrSelector<HTMLElement>,
  ) {
    this.#layoutBox = new LayoutBox(elementOrSelector, { cartesian: true })

    this.#planes = [
      new Plane(new Vector3(0, 1, 0)),
      new Plane(new Vector3(0, -1, 0)),
      new Plane(new Vector3(-1, 0, 0)),
      new Plane(new Vector3(1, 0, 0)),
    ]

    material.clippingPlanes = this.#planes

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

    // Top (normal = +Y)
    this.#planes[0].constant = -scrollValueY + this.#layoutBox.scale.y / 2

    // Bottom (normal = -Y)
    this.#planes[1].constant = scrollValueY + this.#layoutBox.scale.y / 2

    // Left (normal = -X)
    this.#planes[2].constant = scrollValueX + this.#layoutBox.scale.x / 2

    // Right (normal = +X)
    this.#planes[3].constant = -scrollValueX + this.#layoutBox.scale.x / 2
  }
}
