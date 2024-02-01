import { Store } from '@packages/store'

const store1 = new Store(0, { passport: { name: 'a.s' } })
const store2 = new Store(0, { passport: { name: 'b.s' } })

store1.subscribe((e) => {})
store2.subscribe((e) => {})
