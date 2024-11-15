import { ScrollSegmentElement as ScrollSeg } from '@packages/scroll-segment'
import { findParentElement, isBrowser } from '@packages/utils'
import { ScrollElement } from './ScrollElement'

export class ScrollSegmentElement extends ScrollSeg {
  protected override connectedCallback() {
    const scrollElement = findParentElement(this, ScrollElement)

    if (scrollElement instanceof ScrollElement) {
      this.scrollContainer = scrollElement

      this.scrollContainer.addEventListener(
        'scrollSectionsChange',
        this.findAnotherScrollEntries
      )
    } else {
      console.error(this, 'e-scroll not found')
    }
  }
}

if (isBrowser && !customElements.get('e-scroll-segment')) {
  customElements.define('e-scroll-segment', ScrollSegmentElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-scroll-segment': ScrollSegmentElement
  }
}
