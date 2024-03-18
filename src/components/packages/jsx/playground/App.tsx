import { attachStylesheet } from '../hooks'
import { createStore } from '@packages/store/hooks'
import { DerivedArray } from '@packages/store'

const Item: JSX.Component<{ index: number }> = (props) => {
  attachStylesheet({
    ':host': {
      width: '5vw',
      height: '5vw',
      display: 'block',
      border: '1px solid red',
    },
  })

  return <component index={props.index}>{props.index}</component>
}

export const App: JSX.Component = () => {
  const arr = createStore<Array<number>>([])

  let index = 0

  addEventListener('keydown', (e) => {
    if (e.key === '1') {
      arr.current = [...arr.current, index++]
    }
  })

  return (
    <component>
      {new DerivedArray(arr, (e) => <Item index={e}></Item>)}
    </component>
  )
}
