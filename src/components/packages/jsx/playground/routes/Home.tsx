import { watchAttribute } from '@packages/jsx/hooks/watchAttribute'

const Home: JSX.Component = () => {
  const attribute = watchAttribute('damping', 0)

  return (
    <component damping="10">
      <h1>{attribute}</h1>
    </component>
  )
}

export default Home
