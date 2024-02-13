import { ElementConstructor } from '..'

console.log('Playground')

new ElementConstructor('a', {
  children: [123],
  attributes: {
    href: '/',
  },
  parent: document.body,
})
