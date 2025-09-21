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
