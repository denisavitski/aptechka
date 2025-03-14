export function isElementVisible(buttonElement: HTMLElement) {
  const style = window.getComputedStyle(buttonElement)

  return style.display !== 'none' && style.visibility !== 'hidden'
}
