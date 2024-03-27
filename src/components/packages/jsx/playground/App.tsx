import { createStore } from '@packages/store/hooks'

const Item: JSX.Component<{ index: number }> = (props) => {
  return <component>123</component>
}

const Wrapper: JSX.Component = (props) => {
  const store = createStore<JSX.Component | null>(null)

  addEventListener('keydown', (e) => {
    if (e.key === '1') {
      store.current = <Item index={1}></Item>
    } else if (e.key === '2') {
      store.current = null
    }
  })

  return (
    <component>
      {props.children}
      {store}
    </component>
  )
}

const Test: JSX.Component = (props) => {
  return <component>GGGG</component>
}

export const App: JSX.Component = () => {
  return (
    <component>
      <Wrapper>
        <Test></Test>
      </Wrapper>
    </component>
  )
}
