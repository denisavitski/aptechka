import { useStore } from '@packages/jsx/hooks/store'
import { Test2 } from './Test2'

export const Test = () => {
  useStore(1)
  return (
    <div>
      <Test2></Test2>
    </div>
  )
}
