import { Circle, Dot2D, Rect2D } from './ts-shape.js'

export function dotRectCollision(dot: Dot2D, rect: Rect2D) {
  return (
    dot.x < rect.x + rect.width && dot.x > rect.x && dot.y < rect.y + rect.height && dot.y > rect.y
  )
}

export function dotCircleCollision(dot: Dot2D, circle: Circle) {
  const distance = Math.sqrt((dot.x - circle.x) ** 2 + (dot.y - circle.y) ** 2)
  return distance < circle.radius
}
