import { beautifyNumber } from '../number'
import { setIntervalOnIntersection } from '../timeouts'

console.log(beautifyNumber('900 000'))

setIntervalOnIntersection(document.body, 2000, (e) => {
  console.log(e)
})
