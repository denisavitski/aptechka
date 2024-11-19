import {
  findScrollParentElement,
  getCumulativeOffsetTop,
  getElement,
  type ElementOrSelector,
} from '@packages/utils'

export function scrollToElement(
  elementOrSelector: ElementOrSelector<HTMLElement>,
  {
    behaviour = 'instant',
    offset = 0,
    center = false,
    scrollElement,
  }: {
    behaviour?: ScrollBehavior
    offset?: number | ElementOrSelector<HTMLElement>
    center?: boolean
    scrollElement?: HTMLElement
  } = {}
) {
  const element = getElement(elementOrSelector)

  if (element) {
    const parent = scrollElement || findScrollParentElement(element)

    const top = getCumulativeOffsetTop(element)

    const offsetValue =
      (typeof offset === 'number'
        ? offset
        : getElement(offset)?.offsetHeight || 0) * -1

    const centerValue = center
      ? (innerHeight / 2) * -1 + element.offsetHeight / 2
      : 0

    parent?.scroll({
      top: top + offsetValue + centerValue,
      behavior: behaviour,
    })
  }
}
