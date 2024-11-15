import { scrollEntries } from '@packages/scroll-entries'
import { getCumulativeOffsetTop } from '../layout'
import { setIntervalOnIntersection } from '../timeouts'

const scrollEl = document.querySelector('.scroll') as HTMLElement
const boxEl = document.querySelector('.box') as HTMLElement

setIntervalOnIntersection(boxEl, 1000, (e) => {
  console.log(e)
})
