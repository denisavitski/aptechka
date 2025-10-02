import { Tweened, TweenedOptions } from '@packages/animation/Tweened'
import { TICK_ORDER } from '@packages/order'
import type { SmoothScrollElement } from '@packages/scroll-kit'
import {
  findScrollParentElement,
  getCumulativeOffsetTop,
  getElement,
  type ElementOrSelector,
} from '@packages/utils'

let tweened: Tweened | undefined

export interface ScrollToElementOptions
  extends Pick<TweenedOptions, 'duration' | 'easing'> {
  behavior?: ScrollBehavior
  offset?: number | string | ElementOrSelector<HTMLElement>
  center?: boolean
  scrollElement?: HTMLElement | Window
  scrollCallback?: (value: number) => void
}

export function scrollToElement(
  elementOrSelectorOrNumber: ElementOrSelector<HTMLElement> | number,
  {
    behavior = 'instant',
    offset = 0,
    center = false,
    scrollElement,
    scrollCallback,
    duration,
    easing,
  }: ScrollToElementOptions = {},
) {
  let start
  let centerElement = scrollElement
  let scrollContainerElement = scrollElement

  if (typeof elementOrSelectorOrNumber === 'number') {
    start = elementOrSelectorOrNumber
  } else {
    const element = getElement(elementOrSelectorOrNumber)

    if (element) {
      centerElement = element
      scrollContainerElement = scrollElement || findScrollParentElement(element)
      start = getCumulativeOffsetTop(element)
    }
  }

  if (centerElement && scrollContainerElement && typeof start === 'number') {
    const offsetValue =
      typeof offset === 'number'
        ? offset
        : typeof offset === 'string' && !isNaN(parseFloat(offset))
          ? parseFloat(offset)
          : (getElement(offset)?.offsetHeight || 0) * -1

    const height =
      centerElement instanceof HTMLElement
        ? centerElement.offsetHeight
        : innerHeight

    const centerValue = center ? (innerHeight / 2) * -1 + height / 2 : 0
    const top = start + offsetValue + centerValue

    const scrollToValue = (value: number) => {
      if (
        scrollContainerElement instanceof HTMLElement &&
        scrollContainerElement.tagName === 'E-SMOOTH-SCROLL'
      ) {
        ;(scrollContainerElement as SmoothScrollElement).scrollToValue(
          value,
          duration ? 'instant' : behavior,
        )
      } else {
        scrollContainerElement.scroll({
          top: value,
          behavior: duration ? 'instant' : behavior,
        })
      }
    }

    if (duration) {
      if (tweened) {
        tweened.close()
      }

      let tweenedStart = 0

      if (scrollContainerElement instanceof HTMLElement) {
        tweenedStart = scrollContainerElement.scrollTop
      } else {
        tweenedStart = window.scrollY
      }

      tweened = new Tweened(tweenedStart, {
        duration: duration,
        easing: easing,
        order: TICK_ORDER.SCROLL,
      })

      tweened.subscribe((e) => {
        if (scrollCallback) {
          scrollCallback(e.current)
        } else {
          scrollToValue(e.current)
        }
      })

      tweened.set(top, { duration, easing })
    } else {
      if (scrollCallback) {
        scrollCallback(top)
      } else {
        scrollToValue(top)
      }
    }
  }
}
