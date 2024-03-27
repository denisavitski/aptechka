import { define } from '@packages/custom-element'
import { SourceElement } from '@packages/source'

@define('e-image')
export class ImageElement extends SourceElement<HTMLImageElement> {
  protected override createConsumer() {
    return document.createElement('img')
  }

  protected override consumeSource(url: string | null) {
    this.consumerElement.src = url || ''
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-image': ImageElement
  }
}
