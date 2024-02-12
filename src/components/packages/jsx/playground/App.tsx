import '@packages/studio'
import { Store } from '@packages/store'
import {
  useConnect,
  useCreate,
  useDerived,
  useDisconnect,
  useStore,
} from '../hooks'

const Component1: JSX.Component = () => {
  const store = useStore(0, {
    passport: {
      name: 'xxxx',
      manager: {
        type: 'range',
      },
    },
  })

  const derived = useDerived(store, (v) => v * 2)

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
    <div>
      {store}
      {derived}
    </div>
  )
}

export const App: JSX.Component = () => {
  const store = new Store<any>(null!)

  useConnect(() => {
    console.log('APP connect')
  })

  useDisconnect(() => {
    console.log('APP disconnect')
  })

  addEventListener('keydown', (e) => {
    if (e.key === '1') {
      store.current = <Component1></Component1>
    } else if (e.key === '2') {
      store.current = null
    }
  })

  return <component>{store}</component>
}
