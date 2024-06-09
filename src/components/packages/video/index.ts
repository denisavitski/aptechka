import { Damped } from '@packages/animation'
import { define } from '@packages/custom-element'
import { SourceElement } from '@packages/source'
import { ticker } from '@packages/ticker'

@define('e-video')
export class VideoElement extends SourceElement<HTMLVideoElement> {
  #loading = new Damped(0, {
    damping: 15,
  })

  protected override connectedCallback() {
    super.connectedCallback()

    this.addEventListener('sourceCapture', () => {
      ticker.subscribe(this.#checkReady)

      if (this.hasAttribute('capture-autoplay')) {
        this.consumerElement.play()
      }
    })

    this.addEventListener('sourceRelease', () => {
      if (this.hasAttribute('capture-autoplay')) {
        this.consumerElement.pause()

        if (this.hasAttribute('replay')) {
          this.consumerElement.currentTime = 0
        }
      }
    })
  }

  public get loading() {
    return this.#loading
  }

  protected override disconnectedCallback() {
    super.disconnectedCallback()

    ticker.unsubscribe(this.#checkReady)

    this.#loading.close()
  }

  protected override createConsumer() {
    return document.createElement('video')
  }

  protected override consumeSource(url: string | null) {
    this.consumerElement.src = url || ''
  }

  #checkReady = () => {
    this.classList.add(`state-${this.consumerElement.readyState}`)

    this.#loading.set(this.consumerElement.readyState / 4)

    if (this.consumerElement.readyState === 4) {
      ticker.unsubscribe(this.#checkReady)
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-video': VideoElement
  }
}
