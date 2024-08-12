import { isBrowser } from '@packages/utils'
import { ScrollUserElement } from './ScrollUserElement'

export abstract class ScrollButtonElement extends ScrollUserElement {
  constructor() {
    super()

    if (isBrowser) {
      this.addEventListener('click', () => {
        this.handleClick()
      })
    }
  }

  protected abstract handleClick(): void
}
