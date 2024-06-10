import { define } from '@packages/custom-element'
import { SourceElement } from '@packages/source'
import { ticker } from '@packages/ticker'

export interface ReadyStateChangeEventDetail {
  readyState: number
  progress: number
}

export type ReadyStateChangeEvent = CustomEvent<ReadyStateChangeEventDetail>

@define('e-video')
export class VideoElement extends SourceElement<HTMLVideoElement> {
  #progress = 0

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

      if (this.hasAttribute('reload-source')) {
        this.classList.remove(
          'state-0',
          'state-1',
          'state-2',
          'state-3',
          'state-4'
        )
      }
    })
  }

  protected override disconnectedCallback() {
    super.disconnectedCallback()

    ticker.unsubscribe(this.#checkReady)

    this.#progress = 0
  }

  protected override createConsumer() {
    return document.createElement('video')
  }

  protected override consumeSource(url: string | null) {
    this.consumerElement.src = url || ''
  }

  #checkReady = () => {
    this.classList.add(`state-${this.consumerElement.readyState}`)

    const newProgress = this.consumerElement.readyState / 4

    if (newProgress > this.#progress) {
      this.#progress = newProgress
    }

    this.dispatchEvent(
      new CustomEvent<ReadyStateChangeEventDetail>('readyStateChange', {
        detail: {
          readyState: this.consumerElement.readyState,
          progress: this.#progress,
        },
      })
    )

    if (this.consumerElement.readyState === 4) {
      ticker.unsubscribe(this.#checkReady)
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-video': VideoElement
  }

  interface HTMLElementEventMap {
    readyStateChange: ReadyStateChangeEvent
  }
}
