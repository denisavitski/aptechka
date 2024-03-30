import { createStore } from '@packages/store/hooks'

export const Component: JSX.Component = () => {
  const store = createStore(1)

  return (
    <component>
      <div>Component</div>
    </component>
  )
}

export const App: JSX.Component = () => {
  return (
    <component>
      <div>1</div>
    </component>
  )
}
