import { ElementConstructor, style } from '..'

const v = new ElementConstructor('div', {
  class: 'xxx',
  children: [
    style({
      '.xxx': {
        fontSize: '100px',
      },
    }),
    123,
  ],
  onClick: {
    callback: (e) => {
      console.log(e)
    },
  },
})
document.body.appendChild(v.node)
