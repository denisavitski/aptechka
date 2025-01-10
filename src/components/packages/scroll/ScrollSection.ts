/**
 * TODO: как-то уёбищно выглядят методы для классов и атрибутов. Может быть как то это все переделать?
 */

import { scrollEntries } from '@packages/scroll-entries'

import {
  getCumulativeOffsetTop,
  getCumulativeOffsetLeft,
  clamp,
  dispatchEvent,
} from '@packages/utils'

import { ScrollElement } from './ScrollElement'

export type ScrollSectionMark = 'current' | 'previous' | 'next' | null

export type ScrollSectionMarkChangeDetail = {
  mark: ScrollSectionMark
}

export interface ScrollSectionEvents {
  scrollSectionMarkChange: ScrollSectionMarkChangeEvent
}

export type ScrollSectionMarkChangeEvent =
  CustomEvent<ScrollSectionMarkChangeDetail>

export class ScrollSection {
  #element: HTMLElement
  #index: number
  #scrollElement: ScrollElement

  #size = 0
  #position = 0
  #currentMark: ScrollSectionMark = null
  #transformPosition = 0

  constructor(
    element: HTMLElement,
    index: number,
    scrollElement: ScrollElement
  ) {
    this.#element = element
    this.#index = index
    this.#scrollElement = scrollElement

    scrollEntries.register(this.#element)

    this.setIndex(this.#index)
  }

  public get element() {
    return this.#element
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

  public get transformPosition() {
    return this.#transformPosition
  }

  public destroy() {
    scrollEntries.unregister(this.#element)
    this.unsetTransform()
  }

  public unsetTransform() {
    this.#element.style.transform = ''
    this.setMark(null)
    this.setIndex(null)
    this.setCurrentIndex(null)
    this.setCurrentIndexArc(null)
    this.setCurrentIndexArcAbs(null)
    this.setMiddle(false)
    this.setSize()
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

    this.#transformPosition = value * -1

    if (this.#scrollElement.vertical) {
      this.#element.style.transform = `translate3d(0px, ${
        this.#transformPosition
      }px, 0px)`
    } else {
      this.#element.style.transform = `translate3d(${
        this.#transformPosition
      }px, 0px, 0px)`
    }
  }

  public setMark(mark: ScrollSectionMark) {
    if (this.#currentMark !== mark) {
      if (this.#currentMark) {
        this.#element.classList.remove(this.#currentMark)
      }

      if (mark) {
        this.#element.classList.add(mark)
      }

      this.#currentMark = mark

      dispatchEvent(this.#element, 'scrollSectionMarkChange', {
        composed: true,
        detail: {
          mark: this.#currentMark,
        },
        custom: true,
      })
    }
  }

  public setMiddle(bool: boolean) {
    this.#element.classList.toggle('middle', bool)
  }

  public setIndex(value: number | null) {
    this.#setVar('--index', value)
  }

  public setCurrentIndex(value: number | null) {
    this.#setVar('--current-index', value)
  }

  public setCurrentIndexArc(value: number | null) {
    this.#setVar('--current-index-arc', value)
  }

  public setCurrentIndexArcAbs(value: number | null) {
    this.#setVar('--current-index-arc-abs', value)
  }

  #setVar(name: string, value: string | number | null) {
    if (value !== null) {
      this.#element.style.setProperty(name, value.toString())
    } else {
      this.#element.style.removeProperty(name)
    }
  }
}

declare global {
  interface HTMLElementEventMap extends ScrollSectionEvents {}
}
