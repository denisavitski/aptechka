import { Store } from '@packages/store'

new Store(false, {
  name: 'xxx.boolean',
  __manager: {
    type: 'boolean',
  },
}).subscribe(() => {})

new Store('#ffffff', {
  name: 'xxx.color',
  __manager: {
    type: 'color',
  },
}).subscribe(() => {})

new Store('123', {
  name: 'xxx.link',
  __manager: {
    type: 'link',
  },
}).subscribe(() => {})

new Store(0, {
  name: 'xxx.number',
  __manager: {
    type: 'number',
    min: 0,
    max: 100,
  },
}).subscribe(() => {})

new Store([1, 2, 3], {
  name: 'xxx.numbers',
  __manager: {
    type: 'number',
  },
}).subscribe(() => {})

new Store('1', {
  name: 'xxx.select',
  __manager: {
    type: 'select',
    variants: ['1', '2'],
  },
}).subscribe(() => {})

new Store('xx', {
  name: 'xxx.string',
  __manager: {
    type: 'string',
  },
}).subscribe(() => {})

// addEventListener('keydown', (e) => {
//   if (e.key === '1') {
//     tween.set(0)
//   } else if (e.key === '2') {
//     tween.set(100)
//   }
// })
