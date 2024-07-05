import { Animation, Tweened } from '@packages/animation'
import { Store } from '@packages/store'

new Store(false, {
  passport: {
    name: 'xxx.boolean',
    manager: {
      type: 'boolean',
    },
  },
}).subscribe(() => {})

new Store('#ffffff', {
  passport: {
    name: 'xxx.color',
    manager: {
      type: 'color',
    },
  },
}).subscribe(() => {})

new Store('123', {
  passport: {
    name: 'xxx.link',
    manager: {
      type: 'link',
    },
  },
}).subscribe(() => {})

new Store(0, {
  passport: {
    name: 'xxx.number',
    manager: {
      type: 'number',
      min: 0,
      max: 100,
    },
  },
}).subscribe(() => {})

new Store([1, 2, 3], {
  passport: {
    name: 'xxx.numbers',
    manager: {
      type: 'number',
    },
  },
}).subscribe(() => {})

new Store('1', {
  passport: {
    name: 'xxx.select',
    manager: {
      type: 'select',
      variants: ['1', '2'],
    },
  },
}).subscribe(() => {})

new Store('xx', {
  passport: {
    name: 'xxx.string',
    manager: {
      type: 'string',
    },
  },
}).subscribe(() => {})

// addEventListener('keydown', (e) => {
//   if (e.key === '1') {
//     tween.set(0)
//   } else if (e.key === '2') {
//     tween.set(100)
//   }
// })
