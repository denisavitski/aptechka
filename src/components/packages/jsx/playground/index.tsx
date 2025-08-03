import { useStylesheet } from '..'
import { useComponent } from '../hooks/component/lifecycle'
import { useResourceStore } from '../hooks/store'

const Item: JSX.Component = (props) => {
  useComponent((e) => {
    console.log(e)
  })

  return (
    <div
      onClick={() => {
        console.log('A')
      }}
    >
      DIVVIVIVVIVIV
    </div>
  )
}

Item.template = true

export const App: JSX.Component = (props) => {
  useStylesheet({
    div: {
      display: 'block',
      color: 'red',
    },
  })

  const resource = useResourceStore('fetching....', async () => {
    await new Promise<void>((res) => {
      setTimeout(() => {
        res()
      }, 1000)
    })

    return 'fetched'
  })

  return (
    <component>
      {resource}
      <Item></Item>
    </component>
  )
}
