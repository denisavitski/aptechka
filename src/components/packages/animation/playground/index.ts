import { linear } from '@packages/utils'
import { Tweened } from '../Tweened'

const box = document.querySelector('.box') as HTMLElement

const damped = new Tweened(0, {
  duration: 3000,
  easing: linear,
})

damped.subscribe((e) => {
  box.style.transform = `rotate(${e.current}deg)`
})

addEventListener('keydown', (e) => {
  if (e.key === '1') {
    damped.set(360, { restart: true })
  } else if (e.key === '2') {
    damped.set(-360, { restart: true })
  }
})
