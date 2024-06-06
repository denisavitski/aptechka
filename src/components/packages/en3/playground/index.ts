import '@packages/tweaker'
import { En3FluidElement, En3ModifiedMaterial, en3 } from '../index'
import { ACESFilmicToneMapping, MeshStandardMaterial } from 'three'
en3.setup({
  webGLRendererParameters: {
    alpha: true,
  },
})

en3.webglRenderer.toneMapping = ACESFilmicToneMapping
en3.webglRenderer.toneMappingExposure = 1.4

en3.webglRenderer.autoClear = false
en3.webglRenderer.setClearColor(0x000000)
en3.webglRenderer.localClippingEnabled = true

document.body.appendChild(new En3FluidElement())
