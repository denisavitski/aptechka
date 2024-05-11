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

const m2 = mesh.clone(true)

m2.scale.setScalar(200)

en3.createView('second', {
  sizeElement: '.right',
})

en3.getView('second').add(m2)

const clip = new En3Clip(en3.getView('second'), '.left-clip-2')
const clipHelpers = new En3ClipHelpers(clip, 300)

en3.getView('second').add(clipHelpers)

m2.material.clippingPlanes = clip.planes

ticker.subscribe((e) => {
  m2.rotation.y = e.timestamp * 0.001
})
