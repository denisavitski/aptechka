export function distributeProgress(
  progress: number,
  ...items: Array<{
    weight: number
    callback?: (progress: number) => void
  }>
): number[] {
  if (items.length === 0) {
    return []
  }

  if (items.some((item) => item.weight < 0)) {
    throw new Error('Все веса должны быть неотрицательными числами')
  }

  const weights = items.map((item) => item.weight)
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)

  if (totalWeight === 0) {
    items.forEach((item) => item.callback?.(0))
    return Array(items.length).fill(0)
  }

  const distributed: number[] = []
  let accumulatedProgress = 0

  for (let i = 0; i < items.length; i++) {
    const { weight, callback } = items[i]
    const itemShare = weight / totalWeight

    const itemStart = accumulatedProgress
    const itemEnd = accumulatedProgress + itemShare

    let itemProgress = 0

    if (progress >= itemEnd) {
      itemProgress = 1
    } else if (progress > itemStart) {
      itemProgress = (progress - itemStart) / itemShare
    }

    const finalProgress = Math.min(1, Math.max(0, itemProgress))
    distributed.push(finalProgress)

    callback?.(finalProgress)

    accumulatedProgress = itemEnd
  }

  return distributed
}
export function splitProgress(
  progress: number,
  items: number,
  initialItemsWithFullProgress: number = 0,
) {
  const totalItems = items - initialItemsWithFullProgress
  const splitted: Array<number> = []

  for (let item = 0; item < items; item++) {
    const offset = item / totalItems - initialItemsWithFullProgress / totalItems

    const itemProgress = Math.min(
      1,
      Math.max(0, (progress - offset) * totalItems),
    )

    splitted.push(itemProgress)
  }

  return splitted
}

export function setElementsProgress(
  progress: number,
  elements: Array<HTMLElement>,
  initialItemsWithFullProgress: number = 0,
) {
  const totalItems = elements.length - initialItemsWithFullProgress

  elements.forEach((el, index) => {
    const offset =
      index / totalItems - initialItemsWithFullProgress / totalItems

    const itemProgress = Math.min(
      1,
      Math.max(0, (progress - offset) * totalItems),
    )

    el.style.setProperty('--item-progress', itemProgress.toString())
  })
}

export function setActiveContentClasses(
  index: number,
  elements: Array<HTMLElement>,
) {
  elements.forEach((el, i) => {
    if (i > index) {
      el.classList.remove('current', 'previous')
      el.classList.add('next')
    } else if (i < index) {
      el.classList.remove('current', 'next')
      el.classList.add('previous')
    } else {
      el.classList.remove('previous', 'next')
      el.classList.add('current')
    }
  })
}
