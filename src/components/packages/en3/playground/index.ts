import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import { En3Clip, En3ClipHelpers, en3 } from '..'
import { ticker } from '@packages/ticker'

console.log('Playground')

en3.setup({
  view: {
    sizeElement: '.right-content',
  },
})

const mesh = new Mesh(
  new BoxGeometry(),
  new MeshBasicMaterial({ color: 'red' })
)

mesh.scale.setScalar(30)

en3.view.add(mesh)

ticker.subscribe((e) => {
  mesh.rotation.y = e.timestamp * 0.001
})
