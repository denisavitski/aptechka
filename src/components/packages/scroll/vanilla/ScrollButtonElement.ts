import { isBrowser } from '@packages/utils'
import { ScrollUserElement } from './ScrollUserElement'
import { ScrollBehaviour, ScrollSetOptions } from './ScrollElement'
import { TweenedOptions } from '@packages/animation'

export abstract class ScrollButtonElement extends ScrollUserElement {
  constructor() {
    super()

    if (isBrowser) {
      this.addEventListener('click', () => {
        const behaviour = this.getAttribute('behaviour') as ScrollBehaviour
        const easing =
          (this.getAttribute('easing') as TweenedOptions['easing']) || undefined
        const duration = easing
          ? parseFloat(this.getAttribute('duration') || '0')
          : undefined

        this.handleClick({
          behaviour,
          tween: easing ? { easing, duration: duration! } : undefined,
        })
      })
    }
  }

  protected abstract handleClick(options: ScrollSetOptions): void
}
