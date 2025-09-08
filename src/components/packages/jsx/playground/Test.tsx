import { useConnect } from '../hooks/component/lifecycle'

export const Test: JSX.Component = () => {
  useConnect(() => {
    console.log('connect')

    return () => {
      console.log('disconnect')
    }
  })

  return <button onClick={() => console.log('2123123213123123123')}>123</button>
}
