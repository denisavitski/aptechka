import { Store } from '@packages/store'

const store = new Store(0, {
  passport: {
    name: 'xxx',
  },
})

store.subscribe(() => {})
