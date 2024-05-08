import { ticker } from '@packages/ticker'
import { Pointer } from '../Pointer'

const pointer = new Pointer({
  element: document.documentElement,
  cartesian: true,
})

pointer.connect()

ticker.subscribe(() => {
  console.log(pointer.x.current)
})
