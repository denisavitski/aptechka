export function findParentElement<T extends typeof Element>(
  element: Element | null,
  Constructor: T
): T | null {
  if (!element) {
    return null
  }

  let parent = element.parentElement as T | null

  if (!(element.parentElement instanceof Constructor)) {
    parent = findParentElement(element.parentElement, Constructor)
  }

  return parent as T
}

export type ElementOrSelector<T extends Element = Element> = string | T

export function getElement<T extends Element>(
  elementOrSelector: ElementOrSelector<T>,
  from = document
) {
  return typeof elementOrSelector === 'string'
    ? from.querySelector<T>(elementOrSelector)
    : elementOrSelector
}

export function findScrollParentElement(
  node: Node | null,
  _initial: Node | null = null
): HTMLElement {
  _initial = _initial || node

  if (!node || !(node instanceof HTMLElement)) {
    return document.body
  }

  if (_initial !== node) {
    const computedStyle = getComputedStyle(node)

    if (
      computedStyle.overflow.includes('auto') ||
      computedStyle.overflow.includes('scroll')
    ) {
      return node
    }
  }

  return findScrollParentElement(node.parentNode, _initial)
}
