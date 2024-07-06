import { GridHelper } from 'three'
import { en3 } from '../core/en3'
import { Composed, Store } from '@packages/store'

export class En3GridHelper {
  #helper: GridHelper = null!

  #size = new Store(en3.camera.far, {
    passport: {
      name: 'Helpers.Grid.Size',
      manager: {
        type: 'number',
        step: 1,
      },
    },
  })

  #divisions = new Store(100, {
    passport: {
      name: 'Helpers.Grid.Divisions',
      manager: {
        type: 'number',
      },
    },
  })

  #color1 = new Store('#0000ff', {
    passport: {
      name: 'Helpers.Grid.Color 1',
      manager: {
        type: 'color',
      },
    },
  })

  #color2 = new Store('#808080', {
    passport: {
      name: 'Helpers.Grid.Color 2',
      manager: {
        type: 'color',
      },
    },
  })

  #vertical = new Store(false, {
    passport: {
      name: 'Helpers.Grid.Vertical',
      manager: {
        type: 'boolean',
      },
    },
  })

  #visible = new Store(true, {
    passport: {
      name: 'Helpers.Grid.Visible',
      manager: {
        type: 'boolean',
      },
    },
  })

  #composed

  constructor() {
    this.#composed = new Composed(
      [
        this.#size,
        this.#divisions,
        this.#color1,
        this.#color2,
        this.#vertical,
        this.#visible,
      ],
      () => {
        if (this.#helper) {
          en3.view.remove(this.#helper)
          this.#helper.dispose()
        }

        this.#helper = new GridHelper(
          this.#size.current,
          this.#divisions.current,
          this.#color1.current,
          this.#color2.current
        )

        this.#helper.rotation.x = this.#vertical.current ? Math.PI / 2 : 0

        this.#helper.visible = this.#visible.current

        en3.view.add(this.#helper)
      }
    )

    addEventListener('keydown', this.#keydownListener)
  }

  public get helper() {
    return this.#helper
  }

  public destroy() {
    this.#composed.close()

    if (this.#helper) {
      en3.view.remove(this.#helper)
      this.#helper.dispose()
    }

    removeEventListener('keydown', this.#keydownListener)
  }

  #keydownListener = (e: KeyboardEvent) => {
    if (e.key === 'g') {
      this.#helper.visible = !this.#helper.visible
    }
  }
}
