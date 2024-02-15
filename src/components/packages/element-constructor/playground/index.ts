import { ElementConstructor } from '..'

console.log('Playground')

const v = new ElementConstructor('div', {
  style: {
    fontSize: '100px',
  },
  children: [123],
  onClick: {
    callback: (e) => {
      console.log(e)
    },
  },
})

document.body.appendChild(v.node)
