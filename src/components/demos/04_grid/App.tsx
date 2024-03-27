import { en3 } from '@packages/en3'
import { onConnect, onDisconnect, attachStylesheet } from '@packages/jsx/hooks'
import { BoxGeometry, Mesh } from 'three'

const Box: JSX.Component = (e) => {
  attachStylesheet({
    'e-box': {
      width: '10vmin',
      height: '10vmin',
      '--depth': '10vmin',
    },
  })

  const mesh = new Mesh(new BoxGeometry())

  onConnect((e) => {
    en3.add(mesh, e)
  })

  onDisconnect(() => {
    en3.remove(mesh)
  })
}

export const App: JSX.Component = (e) => {
  en3.setup()

  attachStylesheet({
    'e-app': {
      width: '100%',
      height: '100%',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridTemplateRows: 'repeat(3, 1fr)',
      placeItems: 'center',
    },
  })

  return <>{...new Array(12).fill(0).map(() => <Box></Box>)}</>
}
