import { scrollEntries } from '@packages/scroll-entries'
import { getCumulativeOffsetTop } from '../layout'

const scrollEl = document.querySelector('.scroll') as HTMLElement
const boxEl = document.querySelector('.box') as HTMLElement

scrollEl.addEventListener('scroll', () => {
  const top = getCumulativeOffsetTop(boxEl)

  console.log(top)
})

scrollEntries.register(scrollEl)
