export function iElementVisible(buttonElement: HTMLElement) {
  const style = window.getComputedStyle(buttonElement)

  return (
    style.width !== '0' &&
    style.height !== '0' &&
    style.opacity !== '0' &&
    style.display !== 'none' &&
    style.visibility !== 'hidden'
  )
}
