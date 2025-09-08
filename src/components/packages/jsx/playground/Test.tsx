import { useConnect } from '../hooks/component/lifecycle'
import { useElementResize, useWindowResize } from '../hooks/resize'

export const Test: JSX.Component = () => {
  useWindowResize(() => {
    console.log('WINDOW RESIZE')
  })

  useElementResize(() => {
    console.log('ELEMENT RESIZE')
  })

  useConnect(() => {
    console.log('connect')

    return () => {
      console.log('disconnect')
    }
  })

  return (
    <component onClick={(e) => console.log('2123123213123123123')}>
      123
    </component>
  )
}
