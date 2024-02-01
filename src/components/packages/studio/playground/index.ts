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

const sub = () => {}

addEventListener('keydown', (e) => {
  if (e.key === '1') {
    store1.subscribe(sub)
    store2.subscribe(sub)
    store3.subscribe(sub)
  } else if (e.key === '2') {
    store1.unsubscribe(sub)
    store2.unsubscribe(sub)
    store3.unsubscribe(sub)
  }
})
