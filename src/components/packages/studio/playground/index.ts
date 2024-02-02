import { Store } from '@packages/store'

const stringStore = new Store(0, {
  passport: {
    name: 'a.a',
    manager: {
      type: 'string',
    },
  },
})

const numberStore = new Store(0, {
  passport: {
    name: 'a.b',
    manager: {
      type: 'number',
      step: 0.01,
      min: 0,
      max: 100,
    },
  },
})

const rangeStore = new Store(0, {
  passport: {
    name: 'a.c',
    manager: {
      type: 'range',
    },
  },
})

stringStore.subscribe(() => {})

numberStore.subscribe((e) => {
  console.log(e.current)
})

rangeStore.subscribe(() => {})
