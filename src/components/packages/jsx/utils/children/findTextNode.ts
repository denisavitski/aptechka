export function findTextNode(element: Element, text: string) {
  let founded: ChildNode | null = null

  const nodes = element.childNodes

  for (let i = nodes.length - 1; i >= 0; i--) {
    if (nodes[i].nodeType === Node.TEXT_NODE) {
      if (nodes[i].textContent === text) {
        founded = nodes[i]
      }
    }
  }

  return founded
}
