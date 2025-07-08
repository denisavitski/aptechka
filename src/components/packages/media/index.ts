import { RESIZE_ORDER } from '@packages/order'
import { windowResizer } from '@packages/window-resizer'
import { Store } from '@packages/store'

export type MediaCallback = () => void

export type MediaQueries<T extends string = string> = Map<
  T,
  {
    match: MediaCallback
    unmatch?: MediaCallback
  }
>

export class Media extends Store<boolean> {
  #query: string

  #unsubscribeFromwindowResizer: Function

  constructor(query: string) {
    super(false)

    this.#query = query

    const callback = () => {
      if (matchMedia(this.#query).matches) {
        this.current = true
      } else {
        this.current = false
      }
    }

    this.#unsubscribeFromwindowResizer = windowResizer.subscribe(
      callback,
      RESIZE_ORDER.MEDIA
    )
    callback()
  }

  public override close() {
    super.close()
    this.#unsubscribeFromwindowResizer()
  }
}
