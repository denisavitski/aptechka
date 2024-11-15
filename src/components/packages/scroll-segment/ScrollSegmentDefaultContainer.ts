import { findScrollParentElement } from '@packages/utils'
import {
  ScrollSegmentElement,
  type ScrollSegmentContainer,
} from './ScrollSegmentElement'
import { elementResizer } from '@packages/element-resizer'
import { windowResizer } from '@packages/window-resizer'

export class ScrollSegmentDefaultContainer implements ScrollSegmentContainer {
  #scrollElement: HTMLElement = null!
  #segmentElement: ScrollSegmentElement
  #isVertical = false

  constructor(segmentElement: ScrollSegmentElement) {
    this.#segmentElement = segmentElement
    this.#scrollElement = findScrollParentElement(this.#segmentElement)

    elementResizer.subscribe(this.#scrollElement, this.#resizeListener)
    windowResizer.subscribe(this.#resizeListener)
    this.#resizeListener()
  }

  public get element() {
    return this.#scrollElement!
  }

  public get currentScrollValue() {
    return this.#isVertical
      ? this.#scrollElement.scrollTop
      : this.#scrollElement.scrollLeft
  }

  public get vertical() {
    return this.#isVertical
  }

  public destroy() {
    elementResizer.unsubscribe(this.#resizeListener)
    windowResizer.unsubscribe(this.#resizeListener)
  }

  public onScroll(callback: Function) {
    this.#scrollElement.addEventListener('scroll', callback as EventListener)
  }

  public offScroll(callback: Function) {
    this.#scrollElement.removeEventListener('scroll', callback as EventListener)
  }

  #resizeListener = () => {
    this.#isVertical = !(
      this.#scrollElement.scrollWidth > this.#scrollElement.clientWidth
    )
  }
}
