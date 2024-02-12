import '@packages/studio'
import { Store } from '@packages/store'
import { useConnect, useCreate, useDisconnect } from '../hooks'

const Component1: JSX.Component = () => {
  const store = new Store(0, {
    passport: {
      name: 'x',
      manager: {
        type: 'range',
      },
    },
  })

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

  return <div>{store}</div>
}

export const App: JSX.Component = () => {
  return <Component1></Component1>
}
