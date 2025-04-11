import { setIntervalOnIntersection } from '../timeouts'

const boxEl = document.querySelector('.box') as HTMLElement

setIntervalOnIntersection(boxEl, 1000, (e) => {
  console.log(e)
})
