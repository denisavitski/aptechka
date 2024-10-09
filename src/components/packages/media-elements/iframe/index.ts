import { SourceElement } from '../source'

export class IFrameElement extends SourceElement<HTMLElement> {
  #iframeElement: HTMLElement | null = null

  protected override createConsumer() {
    return document.createElement('div')
  }

  protected override consumeSource(code: string | null) {
    if (this.#iframeElement) {
      this.#iframeElement.onload = null
      this.#iframeElement.onerror = null
    }

    this.consumerElement.innerHTML =
      code
        ?.replace(/\\u003C/g, '<')
        .replace(/\\u003E/g, '>')
        .replace(/\\"/g, '"') || ''

    this.#iframeElement = this.consumerElement.querySelector('iframe')

    if (this.#iframeElement) {
      this.#iframeElement.onload = this.#iframeLoadListener
      this.#iframeElement.onerror = this.#iframeErrorListener
    }
  }

  #iframeLoadListener = () => {
    this.consumerElement.onload?.(new Event('load'))
  }

  #iframeErrorListener = () => {
    this.consumerElement.onload?.(new Event('error'))
  }
}

if (!customElements.get('e-iframe')) {
  customElements.define('e-iframe', IFrameElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-iframe': IFrameElement
  }
}
