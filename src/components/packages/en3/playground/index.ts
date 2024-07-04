import '@packages/tweaker'
import { en3, en3GLTFLoader } from '../index'
import {
  ACESFilmicToneMapping,
  BoxGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
} from 'three'
import { En3Controls } from '../test/En3Controls'

en3.setup({
  webGLRendererParameters: {
    alpha: true,
  },
})

new En3Controls()

en3.webglRenderer.toneMapping = ACESFilmicToneMapping
en3.webglRenderer.toneMappingExposure = 1.4

await en3GLTFLoader.setLoaders({
  draco: true,
})

const boxes: Array<Mesh<BoxGeometry, MeshBasicMaterial>> = []

for (let index = 0; index < 10; index++) {
  const geo = new BoxGeometry()
  const mat = new MeshBasicMaterial({ color: 'lightblue' })
  const mesh = new Mesh(geo, mat)
  mesh.name = `Objects.Object-${index + 1}`
  mesh.scale.setScalar(200)
  mesh.position.z = 250 * index * -1
  mesh.position.x = 60 * index
  en3.view.add(mesh)
  boxes.push(mesh)
}

boxes.forEach((box) => {
  en3.raycaster.add(box, {
    propagation: false,
  })

  box.addEventListener('pointerEnter', (e) => {
    box.material.color = new Color('tomato')
  })

  box.addEventListener('pointerLeave', (e) => {
    box.material.color = new Color('lightblue')
  })
})
