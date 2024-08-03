import { easeInOutExpo } from '@packages/client/utils'
import { Damped } from '../Damped'
import { Tweened } from '../Tweened'

const box1 = document.getElementById('box-1')!
const box2 = document.getElementById('box-2')!

const t1 = new Tweened(0, {
  easing: easeInOutExpo,
})

const t2 = new Damped(0, {
  min: 0,
  max: 1,
})

t1.subscribe((e) => {
  box1.style.transform = `rotate(${e.current}deg)`
})

t2.subscribe((e) => {
  box2.style.transform = `rotate(${e.current}deg)`
})

addEventListener('keydown', (e) => {
  if (e.key === '1') {
    t2.set(360)
  } else if (e.key === '2') {
    t2.set(0)
  }
})
