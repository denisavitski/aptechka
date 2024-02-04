import { Store } from '@packages/store'

new Store(0, {
  passport: {
    name: 'a.string',
    manager: {
      type: 'string',
    },
  },
}).subscribe(() => {})

const numberStore = new Store(0, {
  passport: {
    name: 'a.number',
    manager: {
      type: 'number',
      step: 0.01,
      min: 0,
      max: 100,
    },
  },
}).subscribe(() => {})

const rangeStore = new Store(0, {
  passport: {
    name: 'a.range',
    manager: {
      type: 'range',
    },
  },
}).subscribe(() => {})

const linkStore = new Store('/home', {
  passport: {
    name: 'a.link',
    manager: {
      type: 'link',
      sameWindow: true,
    },
  },
}).subscribe(() => {})

const colorStore = new Store('#FF0000', {
  passport: {
    name: 'a.color',
    manager: {
      type: 'color',
    },
  },
}).subscribe(() => {})

const selectStore = new Store('111', {
  passport: {
    name: 'a.select',
    manager: {
      type: 'select',
      variants: ['111', '222', '333'],
    },
  },
}).subscribe(() => {})

const booleanStore = new Store(false, {
  passport: {
    name: 'a.boolean',
    manager: {
      type: 'boolean',
    },
  },
}).subscribe(() => {})
