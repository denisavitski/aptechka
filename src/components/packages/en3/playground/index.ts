import { En3GLTF, en3, en3GLTFLoader } from '../index'
import { ACESFilmicToneMapping, DirectionalLight } from 'three'
en3.setup({
  webGLRendererParameters: {
    alpha: true,
  },
})

en3.webglRenderer.toneMapping = ACESFilmicToneMapping
en3.webglRenderer.toneMappingExposure = 1.4

await en3GLTFLoader.setLoaders({
  draco: true,
})

const gltf = new En3GLTF({
  srcset: '/strawberry-opt.glb',
})

gltf.scale.setScalar(500)

en3.view.add(gltf)

const dl = new DirectionalLight()
dl.intensity = 2
dl.position.z = 1000

en3.view.add(dl)
