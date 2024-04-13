import { isBrowser } from '@packages/utils'

export function define(name: string, extend?: keyof HTMLElementTagNameMap) {
  return function (Constructor: CustomElementConstructor) {
    if (isBrowser && !customElements.get(name)) {
      customElements.define(name, Constructor, { extends: extend })
    }
  }
}

export function defineElement(
  name: string,
  Constructor: CustomElementConstructor,
  extend?: keyof HTMLElementTagNameMap
) {
  if (isBrowser && !customElements.get(name)) {
    customElements.define(name, Constructor, { extends: extend })
  }
}

const HTMLElement = (
  isBrowser
    ? window.HTMLElement
    : class {
        attachShadow() {}
      }
) as typeof window.HTMLElement

export class CustomElement extends HTMLElement {
  public openShadow(...stylesheets: Array<CSSStyleSheet>) {
    if (!this.shadowRoot && isBrowser) {
      const shadow = this.attachShadow({ mode: 'open' })

      this.addStylesheet(...stylesheets)

      return shadow
    }

    return this.shadowRoot!
  }

  public addStylesheet(...stylesheets: Array<CSSStyleSheet>) {
    if (this.shadowRoot && isBrowser) {
      this.shadowRoot.adoptedStyleSheets.push(...stylesheets)
    }
  }
}
