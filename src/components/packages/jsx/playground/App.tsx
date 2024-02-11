import { Store } from '@packages/store'
import { useConnect, useCreate, useDisconnect } from '../hooks'

function Component2() {
  useCreate(() => {
    console.log('2 useCreate')
  })

  useConnect(() => {
    console.log('2 useConnect')

    return () => {
      console.log('2 useConnect return')
    }
  })

  useDisconnect(() => {
    console.log('2 useDisconnect')
  })

  return (
    <>
      <div>Component 2</div>
    </>
  )
}

function Component() {
  useCreate(() => {
    console.log('1 useCreate')
  })

  useConnect(() => {
    console.log('1 useConnect')

    return () => {
      console.log('1 useConnect return')
    }
  })

  useDisconnect(() => {
    console.log('1 useDisconnect')
  })

  return (
    <>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <Component2></Component2>
    </>
  )
}

export function App() {
  const store = new Store<any>(null)

  addEventListener('keydown', (e) => {
    if (e.key === '1') {
      store.current = <Component></Component>
    } else if (e.key === '2') {
      store.current = null
    }
  })

  return <section>{store}</section>
}
