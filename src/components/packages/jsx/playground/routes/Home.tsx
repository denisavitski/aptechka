import { onConnect } from '@packages/jsx/hooks/basic/onConnect'
import { createDerivedComponents } from '@packages/jsx/hooks/store'
import { createArrayStore } from '@packages/jsx/hooks/store/createArrayStore'

const Item: JSX.Component = (props) => {
  return <component>{props.children}</component>
}

const Home: JSX.Component = () => {
  const data = createArrayStore<number>([])

  onConnect(() => {
    const keydownListener = (e: KeyboardEvent) => {
      if (e.key === '1') {
        data.push(Math.random())
      } else if (e.key === '2') {
        data.shift()
      }
    }

    addEventListener('keydown', keydownListener)

    return () => {
      removeEventListener('keydown', keydownListener)
    }
  })

  return (
    <component>
      {createDerivedComponents(data, (v) => {
        return <Item>{v}</Item>
      })}
    </component>
  )
}

export default Home
