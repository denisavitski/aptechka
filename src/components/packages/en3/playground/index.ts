import '@packages/tweaker'
import { en3 } from '../index'
import {
  ACESFilmicToneMapping,
  BoxGeometry,
  Color,
  DirectionalLight,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
} from 'three'
import { En3Helpers } from '../helpers/En3Helpers'

en3.setup({
  webGLRendererParameters: {},
})

new En3Helpers()

en3.webglRenderer.toneMapping = ACESFilmicToneMapping
en3.webglRenderer.toneMappingExposure = 1.4

const boxes: Array<Mesh<BoxGeometry, MeshStandardMaterial>> = []

for (let index = 0; index < 1; index++) {
  const geo = new BoxGeometry()
  const mat = new MeshStandardMaterial({ color: 'lightblue' })
  const mesh = new Mesh(geo, mat)
  mesh.name = `Objects.XXX-${index + 1}`
  mesh.scale.setScalar(200)
  mesh.position.z = 250 * index * -1
  mesh.position.x = 60 * index
  boxes.push(mesh)

  if (index === 0) {
    en3.view.add(mesh, '.box')
  } else {
    en3.view.add(mesh)
  }
}

const directionalLight = new DirectionalLight()
directionalLight.name = 'Lights.Directional'

en3.view.add(directionalLight)

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
