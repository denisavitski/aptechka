import { Damped } from '../Damped'
import { Tweened } from '../Tweened'

const box = document.querySelector('.box') as HTMLElement

const damped = new Tweened(0, {
  duration: 1000,
})

damped.subscribe((e) => {
  box.style.transform = `rotate(${e.current}deg)`
})

const linked = new Tweened(0, {
  duration: 500,
})

linked.subscribe((e) => {
  box.style.width = `${100 + e.current}px`
})

damped.link(linked, 0.5, 300)

addEventListener('keydown', (e) => {
  if (e.key === '1') {
    damped.set(360)
  } else if (e.key === '2') {
    damped.set(0)
  }
})
