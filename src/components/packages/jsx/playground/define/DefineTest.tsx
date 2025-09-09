import { useShadow } from '@packages/jsx/hooks/component/useShadow'
import { useStylesheet } from '@packages/jsx/hooks/component/useStylesheet'
import { ScrollElement } from '@packages/scroll'

export const DefineTest: JSX.Component = (props) => {
  useShadow()

  useStylesheet({
    'e-scroll': {
      '--axis': 'x',
      '--gap': '10px',
      '--auto-size': 'true',
      '--overflow': 'hidden',
      '--sections-in-view': 3,
      width: '300px',
      border: '1px solid red',
    },

    div: {
      height: '100px',
      backgroundColor: 'red',
    },
  })

  return (
    <component>
      <shadow>
        <ScrollElement>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
        </ScrollElement>
      </shadow>
    </component>
  )
}
