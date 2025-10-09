import { SourceElement } from '@packages/source'
import { isBrowser } from '@packages/utils'

export class IFrameElement extends SourceElement<HTMLElement> {
  #iframeElement: HTMLIFrameElement | null = null

  constructor() {
    super({
      sourceSetOptions: {
        mediaBuckets: false,
      },
    })
  }

  public get iframeElement() {
    return this.#iframeElement
  }

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
    this.#iframeElement?.setAttribute('scrolling', 'none')

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

if (isBrowser && !customElements.get('e-iframe')) {
  customElements.define('e-iframe', IFrameElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-iframe': IFrameElement
  }
}
