export function getCumulativePosition(
  target: HTMLElement,
  from: 'offsetLeft' | 'offsetTop' = 'offsetLeft',
  stopElement?: HTMLElement
) {
  let acc = 0

  do {
    acc += target[from] || 0
    target = target.offsetParent as HTMLElement
  } while (target && target !== stopElement)

  return acc
}

export function getCumulativeOffsetLeft(
  target: HTMLElement,
  stopElement?: HTMLElement
) {
  return getCumulativePosition(target, 'offsetLeft', stopElement)
}

export function getCumulativeOffsetTop(
  target: HTMLElement,
  stopElement?: HTMLElement
) {
  return getCumulativePosition(target, 'offsetTop', stopElement)
}

export function getStickyOffset(el: HTMLElement, type: 'top' | 'left') {
  const stickyParents: HTMLElement[] = []
  let parent = el.parentElement

  while (parent) {
    const style = window.getComputedStyle(parent)

    if (style.position === 'sticky') {
      stickyParents.push(parent)
    }

    parent = parent.parentElement
  }

  const stickyOffset = stickyParents.reduce(
    (p, c) => p + (type === 'top' ? c.offsetTop : c.offsetLeft),
    0
  )

  return stickyOffset
}
