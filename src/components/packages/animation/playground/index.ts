import { easeInOutExpo } from '@packages/utils'
import { Tweened } from '../Tweened'
import { Damped } from '../Damped'

const box = document.querySelector('.box') as HTMLElement
const input = document.querySelector('input')!

input.addEventListener('input', () => {
  t1.updateManually(parseFloat(input.value))
})

const t1 = new Damped(0, {
  min: -100,
  max: 100,
})

t1.subscribe(() => {
  console.log(t1.progress)
  box.style.transform = `rotate(${t1.current}deg)`
})
