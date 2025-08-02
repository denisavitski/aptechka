export function storeChildren(element: Element, id: string, newChildren: any) {
  const currentChildNodes = [...element.childNodes].filter((node) => {
    return node.__storeId === id
  })

  const newChildrenArray = Array.isArray(newChildren)
    ? newChildren
    : [newChildren]

  const newNodes: Array<Node> = []

  newChildrenArray.forEach((newChild) => {
    let newNode: Node | null = null

    if (
      typeof newChild === 'boolean' ||
      typeof newChild === 'number' ||
      typeof newChild === 'string'
    ) {
      newNode = document.createTextNode(newChild.toString())
    } else if (newChild instanceof Node) {
      newNode = newChild
    }

    if (newNode) {
      newNode.__storeId = id
      newNodes.push(newNode)
    }
  })

  newNodes.forEach((node, i) => {
    if (node instanceof Element && node.hasAttribute('data-key')) {
      const founded = currentChildNodes.find(
        (currentNode) =>
          currentNode instanceof Element &&
          currentNode.getAttribute('data-key') === node.getAttribute('data-key')
      )

      founded?.replaceWith(node)
    } else {
      const founded = currentChildNodes[i]

      if (founded) {
        if (!founded.isEqualNode(node)) {
          founded.replaceWith(node)
          currentChildNodes[i] = node as ChildNode
        }
      } else {
        const lastChildNode = currentChildNodes[currentChildNodes.length - 1]

        if (lastChildNode) {
          lastChildNode.parentNode?.insertBefore(
            node,
            lastChildNode.nextSibling
          )
        } else {
          element.appendChild(node)
        }
      }
    }
  })

  currentChildNodes.slice(newNodes.length).forEach((node) => {
    node.remove()
  })
}
