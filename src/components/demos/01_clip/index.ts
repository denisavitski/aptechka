import '@packages/scroll'

import { En3Clip, en3, en3GLTFLoader, traverseMaterials } from '@packages/en3'
import { ticker } from '@packages/ticker'
import { ElementOrSelector, getElement } from '@packages/utils'
import {
  ACESFilmicToneMapping,
  AmbientLight,
  BufferGeometry,
  DirectionalLight,
  DynamicDrawUsage,
  Group,
  InstancedMesh,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  Object3DEventMap,
} from 'three'

en3.setup({
  webGLRendererParameters: {
    antialias: true,
  },
  cameraType: 'orthographic',
})

en3.webglRenderer.toneMapping = ACESFilmicToneMapping
en3.webglRenderer.toneMappingExposure = 1.4
en3.webglRenderer.localClippingEnabled = true

export interface ParticlesParameters {
  url: string
  amount: number
}

class Particles {
  #amount: number
  #mesh: InstancedMesh = null!
  #dummy = new Object3D()
  #rand: number

  constructor(parameters: ParticlesParameters) {
    this.#amount = parameters.amount
    this.#rand = 1 + Math.random() * 100

    en3GLTFLoader.load(parameters.url, (d) => {
      const mesh = d.scene.children[0] as Mesh<
        BufferGeometry,
        MeshStandardMaterial
      >

      this.#mesh = new InstancedMesh(mesh.geometry, mesh.material, this.#amount)

      this.#mesh.instanceMatrix.setUsage(DynamicDrawUsage)

      this.onLoad?.()
    })
  }

  public get mesh() {
    return this.#mesh
  }

  public onLoad?(): void

  public update(t: number) {
    if (!this.#mesh) {
      return
    }

    for (let index = 0; index < this.#amount; index++) {
      const indexCos = Math.abs(Math.cos(index * 0.1 + this.#rand))

      const s = en3.width * 0.2 + indexCos * en3.width * 0.1

      this.#dummy.scale.setScalar(s)

      const x = (Math.cos(index * 10 + this.#rand) * en3.width) / 2

      const height = en3.height

      const y =
        (height / 2 + s / 2) * -1 + ((t + 10000 * indexCos) % (height + s))

      const z = indexCos * -1 * en3.cameraDistance

      this.#dummy.position.set(x, y, z)

      const rz = t * 0.001 + index
      const rx = t * 0.001 + index

      this.#dummy.rotation.z = rz
      this.#dummy.rotation.x = rx

      this.#dummy.updateMatrix()

      this.#mesh.setMatrixAt(index, this.#dummy.matrix)
    }

    this.#mesh.instanceMatrix.needsUpdate = true
    this.#mesh.computeBoundingSphere()
  }
}

export interface WorldParameters {
  containerElement: ElementOrSelector
  particles: Array<ParticlesParameters>
}

class World extends Group {
  #sectionElement: HTMLElement
  #clip: En3Clip
  #particles: Array<Particles> = []

  constructor(parameters: WorldParameters) {
    super()

    this.#sectionElement = getElement(parameters.containerElement)!
    this.#clip = new En3Clip(this.#sectionElement, 3)

    // en3.add(new En3ClipHelpers(this.#clip, 1500))

    parameters.particles.forEach((p) => {
      this.#particles.push(new Particles(p))
    })

    this.#particles.forEach((p) => {
      p.onLoad = () => {
        this.add(p.mesh)
      }
    })
  }

  public override add(...objects: Object3D<Object3DEventMap>[]) {
    objects.forEach((object) => {
      traverseMaterials(object, (material) => {
        material.clippingPlanes = this.#clip.planes
      })
    })

    return super.add(...objects)
  }

  public update(t: number) {
    for (let index = 0; index < this.#particles.length; index++) {
      this.#particles[index].update(t)
    }
  }
}

const apples = new World({
  containerElement: '#apples',
  particles: [
    {
      url: '/models/apple-opt.glb',
      amount: 15,
    },
  ],
})

en3.add(apples)

const pears = new World({
  containerElement: '#pears',
  particles: [
    {
      url: '/models/pear-opt.glb',
      amount: 15,
    },
  ],
})

en3.add(pears)

const dl = new DirectionalLight()
dl.intensity = 2
dl.position.z = en3.cameraDistance
en3.add(dl)

const al = new AmbientLight()
al.intensity = 1
en3.add(al)

ticker.subscribe((e) => {
  apples.update(e.timestamp * 0.1)
  pears.update(e.timestamp * 0.1)
})
