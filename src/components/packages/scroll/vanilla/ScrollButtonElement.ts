import { isBrowser } from '@packages/utils'
import { ScrollUserElement } from './ScrollUserElement'
import { ScrollBehaviour, ScrollSetOptions } from './ScrollElement'
import { CSSProperty } from '@packages/css-property'
import { TweenEasingName } from '@packages/animation/Tweened'

export abstract class ScrollButtonElement extends ScrollUserElement {
  #behaviour = new CSSProperty<ScrollBehaviour>(this, '--behaviour', 'smooth')
  #easing = new CSSProperty<TweenEasingName | false>(
    this,
    '--tween-easing',
    false
  )
  #duration = new CSSProperty(this, '--tween-duration', 0)

  constructor() {
    super()

    if (isBrowser) {
      this.addEventListener('click', () => {
        const behaviour = this.#behaviour.current
        const easing = this.#easing.current
        const duration = this.#duration.current

        this.handleClick({
          behaviour,
          tween: easing || duration ? { easing, duration } : undefined,
        })
      })
    }
  }

  protected abstract handleClick(options: ScrollSetOptions): void

  protected override connectedCallback() {
    super.connectedCallback()

    this.#behaviour.observe()
    this.#easing.observe()
    this.#duration.observe()
  }

  protected disconnectedCallback() {
    this.#behaviour.close()
    this.#easing.close()
    this.#duration.close()
  }
}
