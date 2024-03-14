import { useConnect } from '../hooks/useConnect'
import { useShadow } from '../hooks/useShadow'
import { useStylesheet } from '../hooks/useStylesheet'
import { useDisconnect } from '../hooks/useDisconnect'
import { Store } from '@packages/store'
import { createContext, useContext } from '../hooks/useContext'

const Nested: JSX.Component<{ x: number; y: number }> = (e) => {
  console.log('Nested created')

  const context = useContext('xxx')

  useConnect(() => {
    console.log('Nested connect')
  })

  useDisconnect(() => {
    console.log('Nested disconnect')
  })

  return (
    <div>
      {e.x} {e.y}
    </div>
  )
}

const Component: JSX.Component<{ x: number; y: number }> = (e) => {
  const store = new Store<JSX.Component | null>(null)

  addEventListener('keydown', (e) => {
    if (e.key === '1') {
      store.current = (
        <Nested
          x={2}
          y={2}
        ></Nested>
      )
    } else if (e.key === '2') {
      store.current = null
    }
  })

  return <div>{store}</div>
}

const List: JSX.Component = (e) => {
  return <div>List</div>
}

export const App: JSX.Component = (e) => {
  useShadow()

  useStylesheet({
    ':host': {
      width: '100px',
      height: '100px',
      backgroundColor: 'tomato',
      display: 'block',
    },
  })

  createContext('xxx', 1123)

  useConnect(() => {})

  return (
    <>
      <Component
        x={1}
        y={2}
      ></Component>
      <List></List>
    </>
  )
}

App.formAssociated = true
