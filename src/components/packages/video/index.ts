import { define } from '@packages/custom-element'
import { SourceElement } from '@packages/source'

@define('e-video')
export class VideoElement extends SourceElement<HTMLVideoElement> {
  protected override connectedCallback() {
    super.connectedCallback()

    this.captureEvent.subscribe(() => {
      if (this.hasAttribute('e-autoplay')) {
        this.consumerElement.play()
      }
    })

    this.releaseEvent.subscribe(() => {
      if (this.hasAttribute('e-autoplay')) {
        this.consumerElement.pause()

        if (this.hasAttribute('replay')) {
          this.consumerElement.currentTime = 0
        }
      }
    })
  }

  protected override createConsumer() {
    return document.createElement('video')
  }

  protected override consumeSource(url: string | null) {
    this.consumerElement.src = url || ''
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-video': VideoElement
  }
}
