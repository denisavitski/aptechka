import { useConnect } from '../hooks'

export const Component1: JSX.Component = () => {
  useConnect((e) => {
    console.log(e)
  })

  useConnect((e) => {
    console.log(e)
  })

  useConnect((e) => {
    console.log(e)
  })

  return (
    <>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div></div>
      <div></div>
      <div></div>
    </>
  )
}

Component1.shadow = true

export function App() {
  return <Component1></Component1>
}

App.shadow = true
