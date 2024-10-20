import { device } from '@packages/device'
import { SourceElement } from '@packages/source'

export class ImageElement extends SourceElement<HTMLImageElement> {
  protected override createConsumer() {
    return document.createElement('img')
  }

  protected override consumeSource(url: string | null) {
    if (url && this.hasAttribute('webp') && device.isWebp) {
      const webpUrl = url.split('.').slice(0, -1).join('.') + '.webp'

      this.consumerElement.src = webpUrl
    } else {
      this.consumerElement.src = url || ''
    }
  }
}

if (!customElements.get('e-image')) {
  customElements.define('e-image', ImageElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-image': ImageElement
  }
}
