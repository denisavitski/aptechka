import { RESIZE_ORDER } from '@packages/order'
import { resizer } from '@packages/resizer'
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

  #unsubscribeFromResizer: Function

  constructor(query: string) {
    super(false)

    this.#query = query

    this.#unsubscribeFromResizer = resizer.subscribe(() => {
      if (matchMedia(this.#query).matches) {
        this.current = true
      } else {
        this.current = false
      }
    }, RESIZE_ORDER.MEDIA)
  }

  public override close() {
    super.close()
    this.#unsubscribeFromResizer()
  }
}
