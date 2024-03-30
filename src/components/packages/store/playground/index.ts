import { generateId } from '@packages/utils'
import { DerivedArray, Store } from '..'

const arr = new Store<Array<{ value: number }>>([])

const derived = new DerivedArray(arr, (v) => {
  return v
})

derived.subscribe((e) => {
  console.log(e.current)
})

let index = 0

addEventListener('keydown', (e) => {
  if (e.key === '1') {
    arr.current = [...arr.current, { value: 0 }]
  } else if (e.key === '2') {
    arr.current = arr.current.slice(1)
  }
})
