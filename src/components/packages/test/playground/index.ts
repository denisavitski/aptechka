import { contents, div, element, fragment } from '@packages/element-constructor'
import { Derived, DerivedArray, Store } from '@packages/store'

export function Component(value: number) {
  console.log('Component')

  return div({
    children: ['Component', value],

    onDestroy: () => {
      console.log('Destroyed', value)
    },
  })
}

export function App() {
  const store = new Store([1, 2, 3])
  const elements = new DerivedArray(store, (v) => Component(v))

  return contents({
    children: [Component(1), Component(2)],
    onDestroy: () => {
      console.log('App Destroyed')
    },
  })
}

const app = App().node

document.body.appendChild(app)

addEventListener('keydown', (e) => {
  if (e.key === 'f') {
    document.body.removeChild(app)
  }
})
