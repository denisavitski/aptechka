import { Store } from '@packages/store'
import { createContext } from '../hooks/createContext'
import { attachShadow, onConnect } from '../hooks'

const items = ['a', 'b', 'c']

const Inner: JSX.Component<{ name: string }> = (e) => {
  onConnect((e) => {
    console.log('Inner', e)
  })

  return <div>{e.children}</div>
}

Inner.noCustomElement = true

const Item: JSX.Component<{ name: string }> = (e) => {
  attachShadow()

  createContext(e.name, e.name)

  onConnect((e) => {
    console.log('Item', e)
  })

  return (
    <component
      lightChildren
      class="item"
    >
      <div>
        <Inner name={e.name}>{e.children}</Inner>
      </div>
    </component>
  )
}

export const App: JSX.Component = () => {
  const children = items.map((item) => {
    return <Item name={item}>{item}</Item>
  })

  const store = new Store('xx')

  onConnect((e) => {
    console.log('APP', e)
  })

  return (
    <component class={store}>
      <h1>Hi!</h1>
      {children}
    </component>
  )
}
