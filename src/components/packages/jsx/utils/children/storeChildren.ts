import { Store } from '@packages/store'
import { DerivedKeyedArray } from '@packages/store/DerivedArray'

export function storeChildren(element: Element, store: Store<any>) {
  const currentChildNodes = [...element.childNodes].filter((node) => {
    return node.__storeId === store.id
  })

  const newChildren = store.current

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
      newNode.__storeId = store.id
      newNodes.push(newNode)
    }
  })

  if (store instanceof DerivedKeyedArray) {
    const nodesToStay: Array<Node> = []

    newNodes.forEach((newNode, i) => {
      const oldNode = currentChildNodes.find(
        (oldNode) => oldNode.__key === newNode.__key,
      )

      if (oldNode) {
        if (!oldNode.isEqualNode(newNode)) {
          oldNode.replaceWith(newNode)
          nodesToStay.push(newNode)
        } else {
          nodesToStay.push(oldNode)
        }
      } else {
        nodesToStay.push(newNode)
        element.appendChild(newNode)
      }
    })

    currentChildNodes.forEach((currentNode) => {
      if (!nodesToStay.includes(currentNode)) {
        currentNode.remove()
      }
    })
  } else {
    newNodes.forEach((node, i) => {
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
            lastChildNode.nextSibling,
          )
        } else {
          element.appendChild(node)
        }
      }
    })

    currentChildNodes.slice(newNodes.length).forEach((node) => {
      node.remove()
    })
  }
}
