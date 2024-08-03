import { findParentElement } from '@packages/client/utils'
import { ScrollElement } from './ScrollElement'

export class ScrollUserElement extends HTMLElement {
  #scrollElement: ScrollElement = null!

  public get scrollElement() {
    return this.#scrollElement
  }

  protected connectedCallback() {
    const scrollElement = findParentElement(this, ScrollElement)

    if (scrollElement instanceof ScrollElement) {
      this.#scrollElement = scrollElement
    } else {
      console.error(this, 'e-scroll not found')
    }
  }
}
