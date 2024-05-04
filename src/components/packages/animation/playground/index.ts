import { ticker } from '@packages/ticker'
import { Damped } from '../Damped'
import { Tweened } from '../Tweened'
import { easeInOutExpo, easeInQuint, easeOutExpo } from '@packages/utils'

const box = document.querySelector('.box') as HTMLElement

const t1 = new Tweened(0, {
  min: 0,
  max: 360,
  easing: easeInOutExpo,
})

const t2 = new Tweened(0, {
  min: 0,
  max: 100,
  easing: easeOutExpo,
})

t1.link(t2, 0.1, 100)

ticker.subscribe(() => {
  box.style.transform = `translateX(${t2.current}px) rotate(${t1.current}deg)`
})

addEventListener('keydown', (e) => {
  if (e.key === '1') {
    t1.set(360)
  } else if (e.key === '2') {
    t1.set(0)
  }
})
