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

new Store(123, {
  passport: {
    name: 'xxx.number',
    manager: {
      type: 'number',
    },
  },
}).subscribe(() => {})

new Store(123, {
  passport: {
    name: 'xxx.range',
    manager: {
      type: 'range',
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
