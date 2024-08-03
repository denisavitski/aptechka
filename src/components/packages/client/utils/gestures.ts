export function setupDrag(
  onMove: (moveEvent: PointerEvent) => void,
  onDrop?: () => void
) {
  const move = (moveEvent: PointerEvent) => {
    onMove?.(moveEvent)
  }

  const drop = () => {
    removeEventListener('pointermove', move)
    removeEventListener('pointerup', drop)
    removeEventListener('touchend', drop)

    onDrop?.()
  }

  addEventListener('pointermove', move)
  addEventListener('pointerup', drop)
  addEventListener('touchend', drop)
}
