import { CanvasElement } from '@packages/canvas'
import { useShadow } from '@packages/jsx/hooks/component/useShadow'
import { useStylesheet } from '@packages/jsx/hooks/component/useStylesheet'

export const DefineTest: JSX.Component = (props) => {
  useShadow()

  useStylesheet({
    ':host': {
      display: 'block',
      width: '100%',
      height: '100%',
    },
  })

  return (
    <component>
      <shadow>
        <CanvasElement></CanvasElement>
      </shadow>
    </component>
  )
}
