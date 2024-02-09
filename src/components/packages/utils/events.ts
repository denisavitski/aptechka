export function dispatchSizeChangeEvent(node: Node) {
  node.dispatchEvent(
    new CustomEvent('e-size-change', {
      bubbles: true,
      composed: true,
    })
  )
}

declare global {
  interface HTMLElementEventMap {
    'e-size-change': CustomEvent
  }
}
