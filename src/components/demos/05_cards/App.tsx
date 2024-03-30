import { en3 } from '@packages/en3'
import { Combat } from './Combat'

export const App: JSX.Component = () => {
  en3.setup()

  return (
    <component>
      <Combat></Combat>
    </component>
  )
}
