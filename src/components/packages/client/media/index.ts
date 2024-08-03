import { RESIZE_ORDER } from '@packages/client/order'
import { windowResizer } from '@packages/client/window-resizer'
import { Store } from '@packages/client/store'

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

    this.#unsubscribeFromwindowResizer = windowResizer.subscribe(() => {
      if (matchMedia(this.#query).matches) {
        this.current = true
      } else {
        this.current = false
      }
    }, RESIZE_ORDER.MEDIA)
  }

  public override close() {
    super.close()
    this.#unsubscribeFromwindowResizer()
  }
}
