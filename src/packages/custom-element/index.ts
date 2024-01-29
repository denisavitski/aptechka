import { isBrowser } from '$packages/utils'

export function define(name: string) {
  return function (Constructor: CustomElementConstructor) {
    if (isBrowser && !customElements.get(name)) {
      customElements.define(name, Constructor)
    }
  }
}

const HTMLElement = (
  isBrowser
    ? window.HTMLElement
    : class {
        attachShadow(..._: any): any {}
      }
) as typeof window.HTMLElement

export class CustomElement extends HTMLElement {}
