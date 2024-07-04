import { attachStylesheet } from '@packages/jsx/hooks/basic/attachStylesheet'
import { useCSSProperty } from '@packages/jsx/hooks/useCSSProperty'

const Home: JSX.Component = () => {
  const cssProperty = useCSSProperty('--color', 'blue')

  attachStylesheet({
    ':host': {
      '--color': 'red',
    },
  })

  return (
    <component>
      <h1>{cssProperty}</h1>
    </component>
  )
}

export default Home
