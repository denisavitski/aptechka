import { setupDrag } from '../gestures'

let x = 0
let y = 0

addEventListener('pointerdown', (e) => {
  setupDrag((moveEvent) => {
    const dx = moveEvent.x - e.x
    const dy = moveEvent.y - e.y

    x = startX + dx
    y = startY + dy

    console.log(x, y)
  })

  const startX = x
  const startY = y
})
