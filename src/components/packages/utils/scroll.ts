import {
  findScrollParentElement,
  getCumulativeOffsetTop,
  getElement,
  type ElementOrSelector,
} from '@packages/utils'

export function scrollToElement(
  elementOrSelectorOrNumber: ElementOrSelector<HTMLElement> | number,
  {
    behavior = 'instant',
    offset = 0,
    center = false,
    scrollElement,
    scrollCallback,
  }: {
    behavior?: ScrollBehavior
    offset?: number | string | ElementOrSelector<HTMLElement>
    center?: boolean
    scrollElement?: HTMLElement | Window
    scrollCallback?: (top: number, behaviour: ScrollBehavior) => void
  } = {},
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

    if (scrollCallback) {
      scrollCallback(top, behavior)
    } else {
      scrollContainerElement.scroll({
        top,
        behavior,
      })
    }
  }
}
