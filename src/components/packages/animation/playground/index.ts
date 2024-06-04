import { Damped } from '../Damped'

const box1 = document.getElementById('box-1')!
const box2 = document.getElementById('box-2')!

const t1 = new Damped(0, {
  min: 0,
  max: 1,
})

const t2 = new Damped(0, {
  min: 0,
  max: 1,
})

t2.linkTo(t1, 1, 1)

t1.subscribe((e) => {
  box1.style.transform = `rotate(${e.current * 180}deg)`
})

t2.subscribe((e) => {
  box2.style.transform = `rotate(${e.current * 180}deg)`
})

addEventListener('keydown', (e) => {
  if (e.key === '1') {
    t1.set(1)
  } else if (e.key === '2') {
    t1.set(0)
  }
})
