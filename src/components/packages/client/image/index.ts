import { SourceElement } from '@packages/client/source'

export class ImageElement extends SourceElement<HTMLImageElement> {
  protected override createConsumer() {
    return document.createElement('img')
  }

  protected override consumeSource(url: string | null) {
    this.consumerElement.src = url || ''
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
