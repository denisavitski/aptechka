import { scrollEntries } from '@packages/client/scroll-entries'
import { ScrollElement } from './ScrollElement'
import {
  getCumulativeOffsetTop,
  getCumulativeOffsetLeft,
  clamp,
} from '@packages/client/utils'

export type ScrollSectionMark = 'current' | 'previous' | 'next' | null

export type ScrollSectionMarkChangeEvent = CustomEvent<{
  mark: ScrollSectionMark
}>

export class ScrollSection {
  #element: HTMLElement
  #index: number
  #scrollElement: ScrollElement

  #size = 0
  #position = 0
  #currentMark: ScrollSectionMark = null

  constructor(
    element: HTMLElement,
    index: number,
    scrollElement: ScrollElement
  ) {
    this.#element = element
    this.#index = index
    this.#scrollElement = scrollElement

    scrollEntries.register(this.#element)
  }

  public get index() {
    return this.#index
  }

  public get size() {
    return this.#size
  }

  public get position() {
    return this.#position
  }

  public destroy() {
    scrollEntries.unregister(this.#element)
    this.#element.style.transform = ''
    this.mark(null)
  }

  public setSize(value?: number) {
    if (value) {
      this.#element.style.setProperty('--size', value + 'px')

      if (this.#scrollElement.axisCSSProperty.current === 'x') {
        this.#element.style.width = value + 'px'
        this.#element.style.height = ''
      } else {
        this.#element.style.height = value + 'px'
        this.#element.style.width = ''
      }
    } else {
      this.#element.style.width = ''
      this.#element.style.height = ''
      this.#element.style.removeProperty('--size')
    }
  }

  public resize() {
    this.#size = this.#scrollElement.vertical
      ? this.#element.offsetHeight
      : this.#element.offsetWidth

    this.#position = this.#scrollElement.vertical
      ? getCumulativeOffsetTop(this.#element)
      : getCumulativeOffsetLeft(this.#element)

    this.#position -= this.#scrollElement.contentPosition
  }

  public transform() {
    let offset = 0

    const distanceAddition =
      this.#scrollElement.viewportSize *
      this.#scrollElement.sectionDistanceScaleCSSProperty.current

    if (
      this.#scrollElement.loopCSSProperty.current &&
      this.#scrollElement.overscroll &&
      this.#position + this.#size < this.#scrollElement.currentScrollValue
    ) {
      offset = this.#scrollElement.distance * -1 - this.#scrollElement.gap
    }

    scrollEntries.update(
      this.#element,
      this.#scrollElement.axisCSSProperty.current,
      offset
    )

    const valueToClamp = this.#scrollElement.currentScrollValue + offset
    const min =
      this.#position - this.#scrollElement.viewportSize - distanceAddition
    const max = this.#position + this.#size + distanceAddition
    const value = clamp(valueToClamp, min, max)

    if (this.#scrollElement.vertical) {
      this.#element.style.transform = `translate3d(0px, ${value * -1}px, 0px)`
    } else {
      this.#element.style.transform = `translate3d(${value * -1}px, 0px, 0px)`
    }
  }

  public mark(mark: ScrollSectionMark) {
    if (this.#currentMark !== mark) {
      if (this.#currentMark) {
        this.#element.classList.remove(this.#currentMark)
      }

      if (mark) {
        this.#element.classList.add(mark)
      }

      this.#currentMark = mark

      this.#element.dispatchEvent(
        new CustomEvent<ScrollSectionMarkChangeEvent['detail']>(
          'sectionsChange',
          {
            composed: true,
            detail: {
              mark: this.#currentMark,
            },
          }
        )
      )
    }
  }
}

declare global {
  interface HTMLElementEventMap {
    sectionMarkChange: ScrollSectionMarkChangeEvent
  }
}
