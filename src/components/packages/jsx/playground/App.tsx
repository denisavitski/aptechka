import { createDerivedArray, createStore } from '@packages/store/hooks'
import { onConnect, onDisconnect } from '../hooks'

export const Component: JSX.Component<{ value: number }> = (props) => {
  console.log('Constructor', props.value)

  onConnect(() => {
    console.log('onConnect', props.value)
  })

  onDisconnect(() => {
    console.log('onDisconnect', props.value)
  })

  return (
    <component>
      <div>{props.value}</div>
    </component>
  )
}

export const App: JSX.Component = () => {
  const data = createStore<Array<number>>([])

  let index = 0

  addEventListener('keydown', (e) => {
    if (e.key === '1') {
      data.current = [...data.current, index++]
    } else if (e.key === '2') {
      data.current = [...data.current].sort(() => 0.5 - Math.random())
    }
  })

  return (
    <component>
      {createDerivedArray(data, (v) => {
        return <Component value={v}></Component>
      })}
    </component>
  )
}
