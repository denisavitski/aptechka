import { en3 } from '@packages/client/en3/core/en3'

import * as THREE from 'three'

class En3FluidPointer {
  public disabled = false

  #coords = new THREE.Vector2()
  #oldCoords = new THREE.Vector2()
  #diff = new THREE.Vector2()

  public init() {
    document.body.addEventListener(
      'pointermove',
      this.#pointerMoveListener,
      false
    )
  }

  public dispose() {
    document.body.removeEventListener(
      'pointermove',
      this.#pointerMoveListener,
      false
    )
  }

  public get coords() {
    return this.#coords
  }

  public get diff() {
    return this.#diff
  }

  public updateCoords(x = 0, y = 0) {
    this.#coords.set((x / en3.width) * 2 - 1, -(y / en3.height) * 2 + 1)

    if (Math.abs(this.#coords.x - this.#oldCoords.x) > 0.2) {
      this.#oldCoords.copy(this.#coords)
      this.#diff.subVectors(this.#coords, this.#oldCoords)
    }
  }

  public update() {
    this.#diff.subVectors(this.#coords, this.#oldCoords)
    this.#oldCoords.copy(this.#coords)

    if (this.#oldCoords.x === 0 && this.#oldCoords.y === 0) {
      this.#diff.set(0, 0)
    }
  }

  #pointerMoveListener = (e: PointerEvent) => {
    if (!this.disabled) {
      this.updateCoords(e.clientX, e.clientY)
    }
  }
}

export const en3FluidPointer = new En3FluidPointer()
