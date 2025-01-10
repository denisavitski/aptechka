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

      this.scrollContainer.addEventListener('scrollResize', this.resize)
      this.resize()
    } else {
      console.error(this, 'e-scroll not found')
    }
  }

  protected override disconnectedCallback() {
    super.disconnectedCallback()

    if (this.scrollContainer instanceof ScrollElement) {
      this.scrollContainer.removeEventListener(
        'scrollSectionsChange',
        this.findAnotherScrollEntries
      )

      this.scrollContainer.removeEventListener('scrollResize', this.resize)
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
