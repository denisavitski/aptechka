import { elementResizer } from '@packages/element-resizer'
import { Store, StoreOptions } from '@packages/store'
import { ElementOrSelector } from '@packages/utils'
import { windowResizer } from '@packages/window-resizer'

export interface ResizedOptions extends StoreOptions<number, 'number'> {
  dispatcher?: ElementOrSelector
}

export type ResizedCallback = () => number

export class Resized extends Store<number, 'number'> {
  #callback: ResizedCallback

  constructor(callback: ResizedCallback, options?: ResizedOptions) {
    super(callback(), options)

    this.#callback = callback

    if (options?.dispatcher instanceof Element) {
      elementResizer.subscribe(options.dispatcher, this.#resizeCallback)
    } else {
      windowResizer.subscribe(this.#resizeCallback)
    }
  }

  public override close() {
    super.close()

    windowResizer.unsubscribe(this.#callback)
    elementResizer.unsubscribe(this.#callback)
  }

  #resizeCallback = () => {
    this.current = this.#callback()
  }
}
