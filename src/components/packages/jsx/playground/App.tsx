import '@packages/studio'
import { createContext, useContext } from '..'

const DepNested: JSX.Component = () => {
  console.log('DepNested', useContext('xx'))
  return <div>Deep Nested 2</div>
}

const Nested: JSX.Component = () => {
  console.log('Nested', useContext('xx'))
  return <div>Nested 2</div>
}

const Component2: JSX.Component = () => {
  console.log('Component2', useContext('xx'))

  return <div>Component 2</div>
}

const Component1: JSX.Component = (e) => {
  const contextValue = 'a'

  createContext('xx', contextValue)

  return (
    <component>
      {e?.children}
      <div></div>
      <div></div>
      <div></div>
    </component>
  )
}

export const App: JSX.Component = () => {
  console.log('App', useContext('xx'))

  return (
    <component>
      <Component1>
        <div>123</div>
        <div>456</div>
      </Component1>
    </component>
  )
}
