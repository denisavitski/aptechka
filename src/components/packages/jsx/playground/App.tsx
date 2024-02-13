import '@packages/studio'
import { Store } from '@packages/store'
import { useConnect, useDamped, useDerived, useDisconnect, useStyle } from '..'

const Component1: JSX.Component = () => {
  const damped = useDamped({ default: 0, damping: 0.01 })
  const derived = useDerived(damped, (v) => {
    return `translateX(${v}px)`
  })

  useStyle({
    '#kek': {
      display: 'block',
      width: '100px',
      height: '100px',
      backgroundColor: 'red',
    },
  })

  return (
    <component
      id="kek"
      style={{
        transform: derived,
      }}
      onClick={() => {
        damped.shift(100)
      }}
    ></component>
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
