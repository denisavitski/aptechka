import { onElementResize } from '@packages/element-resizer/hooks'
import { attachShadow, attachStylesheet } from '../hooks'

const Item: JSX.Component<{ index: number }> = (props) => {
  onElementResize((e) => {
    console.log(props.index, e.contentRect.width)
  })

  attachShadow()

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
  return (
    <component>
      {new Array(10).fill(0).map((_, index) => (
        <Item index={index}></Item>
      ))}
    </component>
  )
}
