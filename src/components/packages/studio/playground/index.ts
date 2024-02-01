import { Store } from '@packages/store'

const store1 = new Store(0, {
  passport: {
    name: 'a.b.c.d.x',
  },
})

const store2 = new Store(0, {
  passport: {
    name: 'a.b.c.d.y',
  },
})

const store3 = new Store(0, {
  passport: {
    name: 'a.b.c.d.z',
  },
})

store1.subscribe((e) => {})
store2.subscribe((e) => {})
store3.subscribe((e) => {})
