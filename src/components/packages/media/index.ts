import { RESIZE_ORDER } from '@packages/order'
import { windowResizer } from '@packages/window-resizer/vanilla'
import { Store } from '@packages/store/vanilla'

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
