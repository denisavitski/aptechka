import { ticker } from '@packages/ticker'
import { Spring } from '../Spring'

const boxElement = document.getElementById('box')!

const springX = new Spring({ preset: 'airy' })
const springY = new Spring({ preset: 'airy' })

ticker.subscribe(() => {
  boxElement.style.transform = `translate(${springX.current - boxElement.offsetWidth / 2}px, ${springY.current - boxElement.offsetHeight / 2}px)`
})

addEventListener('pointermove', (e) => {
  springX.set(e.x)
  springY.set(e.y)
})
