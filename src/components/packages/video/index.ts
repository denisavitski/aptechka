import { define } from '@packages/custom-element'
import { SourceElement } from '@packages/source'

@define('e-video')
export class VideoElement extends SourceElement<HTMLVideoElement> {
  protected override connectedCallback() {
    super.connectedCallback()

    this.addEventListener('sourceCapture', () => {
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

    this.consumerElement.addEventListener('loadeddata', () => {
      if (this.consumerElement.readyState === 4) {
        this.classList.add('enough-data')
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
