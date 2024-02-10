export const getCumulativePosition = (
  target: HTMLElement,
  from: 'offsetLeft' | 'offsetTop' = 'offsetLeft',
  stopElement?: HTMLElement
): number => {
  let acc = 0

  do {
    acc += target[from] || 0
    target = target.offsetParent as HTMLElement
  } while (target && target !== stopElement)

  return acc
}

export const getCumulativeOffsetLeft = (
  target: HTMLElement,
  stopElement?: HTMLElement
) => {
  return getCumulativePosition(target, 'offsetLeft', stopElement)
}

export const getCumulativeOffsetTop = (
  target: HTMLElement,
  stopElement?: HTMLElement
) => {
  return getCumulativePosition(target, 'offsetTop', stopElement)
}
