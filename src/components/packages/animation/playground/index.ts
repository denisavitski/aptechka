import { Damped } from '../Damped'

const box = document.querySelector('.box') as HTMLElement

const damped = new Damped(0, {})

damped.subscribe((e) => {
  box.style.transform = `rotate(${e.current}deg)`
})

addEventListener('keydown', (e) => {
  if (e.key === '1') {
    damped.set(360)
  } else if (e.key === '2') {
    damped.set(-360)
  }
})
