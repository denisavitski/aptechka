import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import { en3 } from '..'
import { ticker } from '@packages/ticker'
import '@packages/scroll'

console.log('Playground')

en3.setup({
  view: {
    sizeElement: '.content',
  },
})

const mesh = new Mesh(
  new BoxGeometry(),
  new MeshBasicMaterial({ color: 'red' })
)

mesh.scale.setScalar(30)

en3.view.add(mesh, '.box')

ticker.subscribe((e) => {
  mesh.rotation.y = e.timestamp * 0.001
})
