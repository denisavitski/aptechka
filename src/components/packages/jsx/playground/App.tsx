import { Store } from '@packages/store'
import {
  useConnect,
  useCreate,
  useDisconnect,
  useElementResize,
} from '../hooks'

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

  useElementResize((e) => {
    console.log(e)
  })

  return <h1>123</h1>
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

  return <div>{store}</div>
}
