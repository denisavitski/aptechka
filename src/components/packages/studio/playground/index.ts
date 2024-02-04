import { Store } from '@packages/store'

for (let index = 0; index < 50; index++) {
  new Store(0, {
    passport: {
      name: 'a' + index,
    },
  }).subscribe(() => {})
}

for (let index = 0; index < 50; index++) {
  new Store(0, {
    passport: {
      name: 'a.b' + index,
    },
  }).subscribe(() => {})
}
