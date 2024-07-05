export function dispatchSizeChangeEvent(node: Node) {
  node.dispatchEvent(
    new CustomEvent('sizeChange', {
      bubbles: true,
      composed: true,
    })
  )
}

export function dispatchBeforeSizeChangeEvent(node: Node) {
  node.dispatchEvent(
    new CustomEvent('beforeSizeChange', {
      bubbles: true,
      composed: true,
    })
  )
}

declare global {
  interface HTMLElementEventMap {
    sizeChange: CustomEvent
    beforeSizeChange: CustomEvent
  }
}
