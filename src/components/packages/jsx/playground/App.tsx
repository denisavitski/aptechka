import '@packages/studio'
import { useStyle } from '..'
import classes from './styles.module.css'

const Component1: JSX.Component = () => {
  useStyle({
    '#kek': {
      display: 'block',
      width: '100px',
      height: '100px',
      backgroundColor: 'red',
    },
  })

  return <component id="kek"></component>
}

export const App: JSX.Component = () => {
  useStyle({
    h1: {
      color: 'red',
    },
  })

  return (
    <component shadow>
      <h1 class={classes.redColor}>HEH</h1>
      <svg></svg>
    </component>
  )
}
