import { DirectionalLight, MeshBasicMaterial } from 'three'
import { En3GLTF, En3Image, en3 } from '..'
import '@packages/scroll'

console.log('Playground')

en3.setup({})

const dl = new DirectionalLight()
dl.intensity = 10
dl.position.z = 1000

en3.view.add(dl)

const gltf = new En3GLTF({
  srcset: '/horse.glb',
})

gltf.scale.setScalar(100)

en3.view.add(gltf)
