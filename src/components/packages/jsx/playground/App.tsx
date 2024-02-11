import { Store } from '@packages/store'
import { useCreate, useStylesheet } from '../hooks'

function Component() {
  useCreate(() => {
    console.log('A')
  })

  return (
    <component>
      <h1>123</h1>
    </component>
  )
}

export function App() {
  const store = new Store<any>(1)

  addEventListener('click', () => {
    store.current++
  })

  useStylesheet({
    'component-app': {
      color: 'red',
    },
  })

  useStylesheet({
    'component-app': {
      color: 'red',
    },
  })

  useStylesheet({
    'component-app': {
      color: 'red',
    },
  })

  return (
    <component>
      <Component></Component>
    </component>
  )
}
