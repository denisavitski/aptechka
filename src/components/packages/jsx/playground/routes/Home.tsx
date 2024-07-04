import '@packages/canvas'
import { watchAttribute } from '@packages/jsx/hooks/watchAttribute'

const Home: JSX.Component = () => {
  const attribute = watchAttribute('damping', 0)

  return (
    <component>
      <h1>{attribute}</h1>
    </component>
  )
}

export default Home
