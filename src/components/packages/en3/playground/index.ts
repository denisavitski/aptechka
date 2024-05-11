import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import { En3Clip, En3ClipHelpers, en3 } from '..'
import { ticker } from '@packages/ticker'

console.log('Playground')

en3.setup({
  view: {
    // sizeElement: '.right',
  },
})

en3.webglRenderer.localClippingEnabled = true

const mesh = new Mesh(
  new BoxGeometry(),
  new MeshBasicMaterial({ color: 'red' })
)

mesh.scale.setScalar(200)

en3.view.add(mesh)

const mesh2 = new Mesh(
  new BoxGeometry(),
  new MeshBasicMaterial({ color: 'red' })
)

mesh2.scale.setScalar(200)

const view2 = en3.createView('second', {
  sizeElement: '.right',
})

view2.add(mesh2)

const clip = new En3Clip('second')
const clipHelpers = new En3ClipHelpers(clip, 300)

view2.add(clipHelpers)

mesh2.material.clippingPlanes = clip.planes

ticker.subscribe((e) => {
  mesh2.rotation.y = e.timestamp * 0.001
})
