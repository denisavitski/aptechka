export function getElementTransitionDurationS(element: HTMLElement) {
  return parseFloat(getComputedStyle(element).transitionDuration || '')
}

export function getElementTransitionDurationMS(element: HTMLElement) {
  return getElementTransitionDurationS(element) * 1000
}
