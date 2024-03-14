import { useStore } from '..'
import { useAttribute } from '../hooks/useAttribute'

export const Slider: JSX.Component = (e) => {
  const attr = useAttribute('x', 123, { sync: true })

  return <div>{attr}</div>
}

export const App: JSX.Component = (e) => {
  const store = useStore<JSX.Component | undefined>(undefined)

  addEventListener('keydown', (e) => {
    if (e.key === '1') {
      store.current = <Slider></Slider>
    } else if (e.key === '2') {
      store.current = undefined
    }
  })

  return store
}
