import '@packages/scroll-kit'
import { Mesh, MeshBasicMaterial, PlaneGeometry } from 'three'
import { En3 } from '../En3'
import { En3ClipHelpers } from '../objects/En3ClipHelpers'

const en3 = new En3()
en3.setup({
  zIndex: -1,
})
en3.webglRenderer.localClippingEnabled = true

const geometry = new PlaneGeometry()
const material = new MeshBasicMaterial({
  color: 'lightblue',
})

const mesh = en3.view.add(new Mesh(geometry, material), '.box', { clip: true })

const helper = new En3ClipHelpers(mesh.userData.clip!, 1000)
en3.view.add(helper)

mesh.userData.box.setScaleStep('s', '+', {})
