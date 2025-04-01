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
  }: {
    behavior?: ScrollBehavior
    offset?: number | ElementOrSelector<HTMLElement>
    center?: boolean
    scrollElement?: HTMLElement | Window
  } = {}
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
      (typeof offset === 'number'
        ? offset
        : getElement(offset)?.offsetHeight || 0) * -1

    const height =
      centerElement instanceof HTMLElement
        ? centerElement.offsetHeight
        : innerHeight

    const centerValue = center ? (innerHeight / 2) * -1 + height / 2 : 0

    scrollContainerElement.scroll({
      top: start + offsetValue + centerValue,
      behavior: behavior,
    })
  }
}
