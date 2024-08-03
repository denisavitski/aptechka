import '@packages/client/tweaker'
import { en3 } from '../index'
import {
  ACESFilmicToneMapping,
  BoxGeometry,
  Color,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  Vector2,
} from 'three'
import { En3Helpers } from '../helpers/En3Helpers'
import {
  AfterimagePass,
  BokehPass,
  EffectComposer,
  FilmPass,
  RenderPass,
  UnrealBloomPass,
} from 'three/examples/jsm/Addons.js'
import { ticker } from '@packages/client/ticker'

en3.setup({
  composer: EffectComposer,
})

en3.webglRenderer.toneMapping = ACESFilmicToneMapping
en3.webglRenderer.toneMappingExposure = 1.4

new En3Helpers()

const renderPass = new RenderPass(en3.scene, en3.camera)
en3.composer.addPass(renderPass)
const film = new UnrealBloomPass(
  new Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
)
en3.composer.addPass(film)

const boxes: Array<Mesh<BoxGeometry, MeshStandardMaterial>> = []

for (let index = 0; index < 5; index++) {
  const geo = new BoxGeometry()
  const mat = new MeshStandardMaterial({ color: 'lightblue' })
  const mesh = new Mesh(geo, mat)
  mesh.name = `T.P.Objects.XXX-${index + 1}`
  mesh.scale.setScalar(200)
  mesh.position.z = 250 * index * -1
  mesh.position.x = 60 * index
  boxes.push(mesh)

  en3.view.add(mesh)
}

const hemi = new DirectionalLight()
hemi.name = 'T.P.Lights.Directional'
en3.view.add(hemi)

boxes.forEach((box) => {
  box.addEventListener('pointerEnter', (e) => {
    box.material.color = new Color('tomato')
  })

  box.addEventListener('pointerLeave', (e) => {
    box.material.color = new Color('lightblue')
  })
})

ticker.subscribe((t) => {
  boxes.forEach((box) => {
    box.rotation.z = t.timestamp * 0.001
  })
})
