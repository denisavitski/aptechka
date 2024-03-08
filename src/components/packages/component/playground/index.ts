import { Component, attachShadow, attachStyle, onConnect } from '..'
import { watchAttribute } from '../hooks/attributes'

const wrapper = Component('vvv', () => {
  attachShadow()

  onConnect(() => {
    console.log('A')
  })

  attachStyle({
    ':host': {
      backgroundColor: 'red',
    },
  })

  console.log('1')

  return {
    class: 'xxx',
    children: [123],
  }
})

const app = Component(wrapper, 'app', (e) => {
  attachStyle({
    ':host': {
      color: 'blue',
    },
  })

  const attr = watchAttribute('as', 0)

  return {
    class: 'asd',
    children: ['lol'],
  }
})

document.body.appendChild(app())
