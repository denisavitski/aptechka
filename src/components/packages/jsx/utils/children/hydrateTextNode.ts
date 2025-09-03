export function hydrateTextNode(
  element: Element,
  newChild: any,
  index: number,
) {
  const existingChild = element.childNodes[index]

  if (existingChild && existingChild.nodeType === Node.TEXT_NODE) {
    if (existingChild.textContent !== String(newChild)) {
      console.warn(
        `Hydration text mismatch: expected "${newChild}", got "${existingChild.textContent}"`,
      )
      existingChild.textContent = String(newChild)
    }
  } else if (newChild !== undefined && newChild !== null && newChild !== '') {
    element.insertBefore(
      document.createTextNode(String(newChild)),
      element.childNodes[index] || null,
    )
  }
}
