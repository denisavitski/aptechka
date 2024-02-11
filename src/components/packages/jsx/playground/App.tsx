import { Store } from '@packages/store'
import { useConnect, useCreate, useDisconnect, useStyle } from '../hooks'

function Component() {
  useCreate(() => {
    console.log('useCreate')
  })

  useConnect(() => {
    console.log('useConnect')

    return () => {
      console.log('useConnect return')
    }
  })

  useDisconnect(() => {
    console.log('useDisconnect')
  })

  useStyle({
    div: {
      width: '100px',
      height: '100px',
      backgroundColor: 'red',
    },
  })

  return (
    <>
      <div>1</div>
      <div>2</div>
      <div>3</div>
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
