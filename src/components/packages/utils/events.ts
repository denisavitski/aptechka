export function dispatchSizeChangeEvent(node: Node) {
  node.dispatchEvent(
    new CustomEvent('size-change', {
      bubbles: true,
      composed: true,
    })
  )
}

declare global {
  interface HTMLElementEventMap {
    'size-change': CustomEvent
  }
}
