import { Store } from '@packages/store'

function Component() {
  return (
    <component shadow>
      <h1>123</h1>
    </component>
  )
}

export function App() {
  const store = new Store<any>(1)

  addEventListener('click', () => {
    store.current++
  })

  return (
    <component shadow>
      <Component></Component>
    </component>
  )
}
