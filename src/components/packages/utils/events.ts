export function dispatchSizeChangeEvent(node: Node) {
  node.dispatchEvent(
    new CustomEvent('sizeChange', {
      bubbles: true,
      composed: true,
    })
  )
}

declare global {
  interface HTMLElementEventMap {
    sizeChange: CustomEvent
  }
}
