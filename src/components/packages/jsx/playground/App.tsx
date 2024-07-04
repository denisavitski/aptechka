import { en3 } from '@packages/en3'
import { En3Options } from '@packages/en3/core/en3'
import { onConnect } from '../hooks/basic/onConnect'
import { attachShadow } from '../hooks/basic/attachShadow'
import { attachStylesheet } from '../hooks/basic/attachStylesheet'

export const Canvas: JSX.Component<Omit<En3Options, 'containerElement'>> = (
  props
) => {
  attachShadow()

  attachStylesheet({
    ':host': {
      display: 'block',
      width: '100%',
      height: '100%',
    },
  })

  onConnect((e) => {
    en3.setup({
      ...props,
      containerElement: e,
    })

    return () => {
      en3.destroy()
    }
  })
}

export const App: JSX.Component = () => {
  attachShadow()

  attachStylesheet({
    ':host': {
      display: 'block',
      width: '100%',
      height: '100%',
    },
  })

  return <Canvas></Canvas>
}
