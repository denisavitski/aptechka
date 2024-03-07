import { Component, attachStyle } from '..'

const app = Component('app', () => {
  attachStyle({
    '.xxx': {
      color: 'red',
    },
  })

  return {
    class: 'xxx',
    children: [123],
  }
})

document.body.appendChild(app())
