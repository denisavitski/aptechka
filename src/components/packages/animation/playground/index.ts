import { ticker } from '@packages/ticker'
import { Damped } from '../Damped'
import { Tweened } from '../Tweened'
import { easeInOutExpo, easeInQuint, easeOutExpo } from '@packages/utils'

const box = document.querySelector('.box') as HTMLElement

const t1 = new Damped(0, {
  min: 0,
  max: 180,
  damping: 20,
  mass: 2,
  stiffness: 300,
})

const t2 = new Damped(0, {
  min: 0,
  max: 100,
  damping: 20,
  mass: 2,
  stiffness: 300,
})

t1.link(t2, 0.5, 100)

ticker.subscribe(() => {
  box.style.transform = `translateX(${t2.current}px) rotate(${t1.current}deg)`
})

addEventListener('keydown', (e) => {
  if (e.key === '1') {
    t1.set(180)
  } else if (e.key === '2') {
    t1.set(0)
  }
})
