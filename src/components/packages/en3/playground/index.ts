import '@packages/scroll-kit'
import { Mesh, MeshBasicMaterial, PlaneGeometry } from 'three'
import { En3 } from '../En3'

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
