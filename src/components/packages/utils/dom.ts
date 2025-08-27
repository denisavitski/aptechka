export function findParentElement<T extends CustomElementConstructor>(
  element: Element | null,
  Constructor: T,
): InstanceType<T> | null {
  if (!element) {
    return null
  }

  let parent = element.parentElement as InstanceType<T> | null

  if (!(element.parentElement instanceof Constructor)) {
    parent = findParentElement(element.parentElement, Constructor)
  }

  return parent as InstanceType<T>
}

export type ElementOrSelector<T extends Element = Element> = string | T

export function getElement<T extends Element>(
  elementOrSelector: ElementOrSelector<T> | undefined,
  from = document,
) {
  return typeof elementOrSelector === 'string'
    ? from.querySelector<T>(elementOrSelector)
    : elementOrSelector
}

export function findScrollParentElement(
  node: Node | null,
  _initial: Node | null = null,
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

export function getAllParentElements(node: Node) {
  let allParentNodes: Array<HTMLElement> = []

  document.documentElement.addEventListener(
    '__illuminate-tree',
    (e) => {
      const path = e.composedPath()

      path.forEach((item) => {
        if (item instanceof HTMLElement) {
          allParentNodes.push(item)
        }
      })
    },
    { once: true },
  )

  node.dispatchEvent(
    new CustomEvent('__illuminate-tree', {
      bubbles: true,
      composed: true,
    }),
  )

  return allParentNodes
}

export function traverseNodes(node: Node, callback: (node: Node) => void) {
  callback(node)

  node.childNodes.forEach((child) => {
    traverseNodes(child, callback)
  })
}

export function traverseShadowRoots(
  root: Element,
  callback: (element: Element) => void,
  includeShadowRoots: boolean = true,
): void {
  if (root.shadowRoot) {
    callback(root)

    if (includeShadowRoots) {
      traverseElements(root.shadowRoot, callback, includeShadowRoots)
    }
  }

  traverseElements(root, callback, includeShadowRoots)
}

function traverseElements(
  root: Element | ShadowRoot,
  callback: (element: Element) => void,
  includeShadowRoots: boolean,
): void {
  const children =
    root.children || (root instanceof ShadowRoot ? root.children : [])

  for (const element of Array.from(children)) {
    traverseShadowRoots(element, callback, includeShadowRoots)
  }
}

export function intersectElements(
  elements: Array<Element>,
  elementsToIntersect: Array<Element>,
) {
  return elements.filter((element) =>
    elementsToIntersect.find(
      (elementToIntersect) =>
        elementToIntersect.outerHTML === element.outerHTML,
    ),
  )
}

export function excludeElements(
  elements: Array<Element>,
  elementsToExclude: Array<Element>,
) {
  return elements.filter(
    (element) =>
      !elementsToExclude.find(
        (elementToExclude) => elementToExclude.outerHTML === element.outerHTML,
      ),
  )
}

export function createScriptElement(element: HTMLScriptElement) {
  const newScriptTag = document.createElement('script')

  for (let i = 0; i < element.attributes.length; i++) {
    const attr = element.attributes[i]
    newScriptTag.setAttribute(attr.name, attr.value)
  }

  if (!element.hasAttribute('src')) {
    newScriptTag.innerHTML = element.innerHTML
  }

  return newScriptTag
}
