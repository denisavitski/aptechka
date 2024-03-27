import { attachStylesheet } from '../hooks'

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
  return <component>123</component>
}
