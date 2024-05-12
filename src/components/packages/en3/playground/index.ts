import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import {
  En3Clip,
  En3ClipHelpers,
  en3,
  en3GLTFLoader,
  en3TextureLoader,
} from '..'
import { ticker } from '@packages/ticker'
import '@packages/scroll'

console.log('Playground')

en3.setup({})

en3.webglRenderer.localClippingEnabled = true

const view2 = en3.createView('second', {
  sizeElement: '.content',
})

const clipLeft = new En3Clip('.clip-left', {
  viewName: 'second',
})

const clipLeftHelper = new En3ClipHelpers(clipLeft, 300)

view2.add(clipLeftHelper)

const clipRight = new En3Clip('.clip-right', {
  viewName: 'second',
})

const mesh = new Mesh(
  new BoxGeometry(),
  new MeshBasicMaterial({ color: 'red', clippingPlanes: clipLeft.planes })
)

mesh.scale.setScalar(30)

view2.add(mesh, '.box')

ticker.subscribe((e) => {
  mesh.rotation.y = e.timestamp * 0.001
})

en3TextureLoader.load(
  '/env.png',
  (texture) => {},
  (e) => {
    console.log(e)
  }
)

en3GLTFLoader.load('/strawberry-opt.glb', (e) => {
  console.log(e)
})
