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

function Component1() {
  const store = new Store(0)

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

  return 'RJV'
}

export function App() {
  useConnect((e) => {
    console.log('APP Connect')
  })

  useDisconnect(() => {
    console.log('APP Disconnect')
  })
}
