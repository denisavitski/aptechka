import { Tweened, TweenedOptions } from '@packages/animation/Tweened'
import { TICK_ORDER } from '@packages/order'
import type { SmoothScrollElement } from '@packages/scroll-kit'
import {
  findScrollParentElement,
  getCumulativeOffsetTop,
  getElement,
  type ElementOrSelector,
} from '@packages/utils'

export const scrollToElementTweened: { value: Tweened | null } = { value: null }

export interface ScrollToElementOptions
  extends Pick<TweenedOptions, 'duration' | 'easing'> {
  behavior?: ScrollBehavior
  offset?: number | string | ElementOrSelector<HTMLElement>
  center?: boolean
  startValue?: number
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
    startValue,
  }: ScrollToElementOptions = {},
) {
  let elementPosition
  let centerElement = scrollElement
  let scrollContainerElement = scrollElement

  if (typeof elementOrSelectorOrNumber === 'number') {
    elementPosition = elementOrSelectorOrNumber
  } else {
    const element = getElement(elementOrSelectorOrNumber)

    if (element) {
      centerElement = element
      scrollContainerElement = scrollElement || findScrollParentElement(element)
      elementPosition = getCumulativeOffsetTop(element)
    }
  }

  if (
    centerElement &&
    scrollContainerElement &&
    typeof elementPosition === 'number'
  ) {
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
    const top = elementPosition + offsetValue + centerValue

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
      if (scrollToElementTweened.value) {
        scrollToElementTweened.value.close()
      }

      let tweenedStart = 0

      if (startValue) {
        tweenedStart = startValue
      } else {
        if (scrollContainerElement instanceof HTMLElement) {
          tweenedStart = scrollContainerElement.scrollTop
        } else {
          tweenedStart = window.scrollY
        }
      }

      scrollToElementTweened.value = new Tweened(tweenedStart, {
        order: TICK_ORDER.SCROLL,
      })

      scrollToElementTweened.value.subscribe((e) => {
        if (scrollCallback) {
          scrollCallback(e.current)
        } else {
          scrollToValue(e.current)
        }
      })

      scrollToElementTweened.value.set(top, {
        duration: Math.min(
          duration,
          duration * (Math.abs(tweenedStart - top) / 3000),
        ),
        easing,
      })
    } else {
      if (scrollCallback) {
        scrollCallback(top)
      } else {
        scrollToValue(top)
      }
    }
  }
}
