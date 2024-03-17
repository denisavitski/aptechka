import '@packages/studio'
import '@packages/slicer'
import { dispose, en3, en3GLTFLoader, getCurrentViewport } from '@packages/en3'
import {
  createContext,
  onConnect,
  onContext,
  attachShadow,
  attachStylesheet,
} from '@packages/jsx/hooks'
import { createStore } from '@packages/store/hooks'
import { onAnimationFrame } from '@packages/ticker/hooks'
import {
  DepthOfFieldEffect,
  EdgeDetectionMode,
  EffectComposer,
  EffectPass,
  RenderPass,
  SMAAEffect,
  SMAAPreset,
  ToneMappingEffect,
  ToneMappingMode,
} from 'postprocessing'
import {
  BufferGeometry,
  Color,
  DynamicDrawUsage,
  EquirectangularReflectionMapping,
  Group,
  InstancedMesh,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PlaneGeometry,
  SRGBColorSpace,
  TextureLoader,
} from 'three'
import { onWindowResize } from '@packages/window-resizer/hooks'
import { RESIZE_ORDER } from '@packages/order'
import { Derived, Store } from '@packages/store'
import { createDamped } from '@packages/animation/hooks'
import { Animated } from '@packages/animation'
import { ContextCallback } from '@packages/jsx/hooks'

export interface ParticlesParameters {
  amount?: number
  url: string
  visibility: Animated
}

export const Particles: JSX.Component<ParticlesParameters> = (props) => {
  const amount = props.amount || 30
  const dummy = new Object3D()
  const rand = 1 + Math.random() * 100

  let instancedMesh: InstancedMesh = null!

  onConnect(() => {
    en3GLTFLoader.load(props.url, (d) => {
      const mesh = d.scene.children[0] as Mesh<
        BufferGeometry,
        MeshStandardMaterial
      >

      const geometry = mesh.geometry
      const material = mesh.material

      material.transparent = true

      instancedMesh = new InstancedMesh(geometry, material, amount)

      instancedMesh.instanceMatrix.setUsage(DynamicDrawUsage)

      en3.add(instancedMesh)
    })

    return () => {
      dispose(instancedMesh)
      en3.remove(instancedMesh)
    }
  })

  onAnimationFrame((e) => {
    if (!instancedMesh || !props.visibility.current) {
      return
    }

    const t = e.timestamp * 0.3

    const max = Math.max(en3.width, en3.height)

    for (let index = 0; index < amount; index++) {
      const indexCos = Math.abs(Math.cos(index * 0.1 + rand))

      const indexPositionZ =
        (en3.cameraPosition.current.z + indexCos * en3.camera.far) * -1

      const { width, height } = getCurrentViewport([0, 0, indexPositionZ])

      let indexScale = max * 0.4 + indexCos * max * 0.2

      indexScale *= Math.pow(props.visibility.current, 1 + index / 2)

      const indexPositionX =
        (Math.cos(index * 10 + rand) * (width - indexScale)) / 2

      const offset = en3.height * 0.8

      let indexPositionY = (height / 2 + offset) * 1
      indexPositionY -= (t + 10000) % (height + offset * 2)

      dummy.rotation.z = t * 0.001 + index
      dummy.rotation.x = t * 0.001 + index

      dummy.scale.setScalar(indexScale)
      dummy.position.set(indexPositionX, indexPositionY, indexPositionZ)

      dummy.updateMatrix()

      instancedMesh.setMatrixAt(index, dummy.matrix)
    }

    instancedMesh.instanceMatrix.needsUpdate = true
    instancedMesh.computeBoundingSphere()
  })
}

export type SlideName = 'banana' | 'strawberry'

export interface SlideParameters {
  name: SlideName
  description: string
  models: Array<{
    url: string
    amount: number
  }>
}

export const Slide: JSX.Component<SlideParameters> = (props) => {
  attachShadow()

  attachStylesheet({
    ':host': {
      display: 'block',
      width: '100%',
      height: '100%',
    },

    '.description': {
      position: 'absolute',
      bottom: '50%',
      left: '50%',
      transform: 'translate(-50%, 25vmin)',

      fontSize: '5vmin',
      fontFamily: 'sans-serif',
      fontWeight: '700',
      color: 'white',

      display: 'inline-flex',
    },

    '.word, .letter': {
      display: 'inline-flex',
    },

    '.letter': {
      overflow: 'hidden',
    },

    '.value': {
      transform: 'translateY(100%) scale(0)',
      transitionDelay: 'calc(0.01s * var(--letter-index))',
      transitionProperty: 'opacity, transform',
      transitionDuration: '0.8s',
      willChange: 'transform',
    },

    '.letter:nth-child(3n) .value': {
      transform: 'translateY(-100%) scale(0)',
    },

    ':host(.show) .value': {
      transform: 'translateY(0) scale(1)',
      opacity: '1',
    },
  })

  const visibility = createDamped({
    default: 0,
    min: 0,
    max: 1,
    damping: 0.006,
  })

  const visibilityType = createStore<'show' | 'hide'>('show')

  useSlider((context) => {
    context.activeSlide.subscribe((e) => {
      if (e.current === props.name) {
        visibility.set(1)
        visibilityType.current = 'show'
      } else {
        visibility.set(0)
        visibilityType.current = 'hide'
      }
    })
  })

  let packageGroup: Group = null!
  let icecreamGroup: Group = null!

  onConnect(() => {
    en3GLTFLoader.load('/models/package2-opt.glb', (data) => {
      packageGroup = data.scene

      const mesh = packageGroup.getObjectByName('package') as Mesh<
        BufferGeometry,
        MeshStandardMaterial
      >

      if (props.name === 'banana') {
        mesh.material.color = new Color('#fac000')
      } else if (props.name === 'strawberry') {
        mesh.material.color = new Color('firebrick')
      }

      en3.add(packageGroup)
    })

    en3GLTFLoader.load('/models/icecream2-opt.glb', (data) => {
      icecreamGroup = data.scene

      const mesh = icecreamGroup.getObjectByName('food') as Mesh<
        BufferGeometry,
        MeshStandardMaterial
      >

      if (props.name === 'banana') {
        mesh.material.color = new Color('#ffc60a')
      } else if (props.name === 'strawberry') {
        mesh.material.color = new Color('red')
      }

      en3.add(icecreamGroup)
    })

    return () => {
      dispose(packageGroup)
      dispose(icecreamGroup)
    }
  })

  onAnimationFrame((e) => {
    if (!packageGroup || !icecreamGroup || !visibility.current) {
      return
    }

    const rv = 1 - visibility.current

    const isShow = visibilityType.current === 'show'

    let packageX = isShow ? (en3.width / 2) * -1 * rv : 0
    let icecreamX = isShow ? (en3.width / 2) * rv : 0
    packageX += (en3.width / 3.2) * -1
    icecreamX += en3.width / 3.2

    let packageY = isShow ? 0 : en3.height * rv * -1.1
    let icecreamY = isShow ? 0 : en3.height * rv * -1.1

    packageGroup.position.x = packageX
    icecreamGroup.position.x = icecreamX

    packageGroup.position.y = packageY
    icecreamGroup.position.y = icecreamY

    packageGroup.rotation.y = visibility.current * Math.PI * (isShow ? 2 : 0)
    icecreamGroup.rotation.y = visibility.current * Math.PI * (isShow ? 2 : 0)

    packageGroup.rotation.z = visibility.current * 0.2
    icecreamGroup.rotation.z = visibility.current * 0.2 * -1

    packageGroup.rotation.y += e.timestamp * 0.0005
    icecreamGroup.rotation.y += e.timestamp * 0.0005

    const max = Math.max(en3.width, en3.height)
    const scale = max * 0.25

    packageGroup.scale.setScalar(scale)
    icecreamGroup.scale.setScalar(scale)
  })

  return (
    <component class={visibilityType as Store<string>}>
      <e-slicer
        class="description"
        letters
        index
      >
        {props.description}
      </e-slicer>
      {props.models.map((model) => {
        return (
          <Particles
            visibility={visibility}
            url={model.url}
            amount={model.amount}
          ></Particles>
        )
      })}
    </component>
  )
}

export const Background: JSX.Component = () => {
  const mesh = new Mesh(
    new PlaneGeometry(),
    new MeshStandardMaterial({ color: 'white' })
  )

  mesh.position.z = en3.camera.far * -0.9

  onConnect(() => {
    en3.add(mesh)

    return () => {
      en3.remove(mesh)
    }
  })

  onWindowResize(() => {
    const { width, height } = getCurrentViewport([0, 0, mesh.position.z])

    mesh.scale.x = width
    mesh.scale.y = height
  }, RESIZE_ORDER.EN3 + 1)

  const bananaColor = new Color()
  const strawberryColor = new Color()

  let color = bananaColor

  const bananaColorValue = createStore('#fac000', {
    passport: {
      name: 'Фон.Банановый',
      manager: {
        type: 'color',
      },
    },
  })

  bananaColorValue.subscribe((e) => {
    bananaColor.set(e.current)

    if (bananaColor === color) {
      mesh.material.color.set(color)
    }
  })

  const strawberryColorValue = createStore('#c5100d', {
    passport: {
      name: 'Фон.Клюбничный',
      manager: {
        type: 'color',
      },
    },
  })

  strawberryColorValue.subscribe((e) => {
    strawberryColor.set(e.current)

    if (strawberryColor === color) {
      mesh.material.color.set(color)
    }
  })

  const damped = createDamped({ min: 0, max: 1, damping: 0.006 })

  damped.subscribe((e) => {
    mesh.material.color.lerp(color, e.current)
  })

  useSlider((context) => {
    context.activeSlide.subscribe((e) => {
      damped.set(0, true)

      if (e.current === 'banana') {
        color = bananaColor
      } else if (e.current === 'strawberry') {
        color = strawberryColor
      }

      damped.set(1)
    })
  })
}

export const SliderButton: JSX.Component<{
  color: string
  slide: SlideName
  activeSlide: Store<SlideName>
}> = (props) => {
  attachStylesheet({
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      width: '4vmin',
      height: '4vmin',

      border: '0.4vmin solid white',
      background: 'none',
      backgroundColor: 'var(--color)',
      borderRadius: '50%',
      cursor: 'pointer',

      transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
    },

    'button.current': {
      transform: 'translateY(-25%)',
    },
  })

  return (
    <button
      style={{ '--color': props.color }}
      class={
        new Derived(props.activeSlide, (e) =>
          e === props.slide ? 'current' : null!
        )
      }
      onClick={() => {
        props.activeSlide.current = props.slide
      }}
    ></button>
  )
}

export interface SliderContext {
  activeSlide: Store<SlideName>
}

export function useSlider(callback: ContextCallback<SliderContext>) {
  return onContext('intro-slider', callback)
}

export const Slider: JSX.Component = () => {
  attachShadow()

  attachStylesheet({
    ':host': {
      width: '100%',
      height: '100%',

      display: 'block',
    },
    h1: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',

      fontSize: '30vmin',
      fontFamily: 'sans-serif',
      fontWeight: '900',
      margin: '0',
      color: 'white',

      display: 'inline-flex',
    },

    'h1 span:first-child': {
      transform: 'rotate(-5deg)',
    },

    'h1 span:nth-child(2)': {
      transform: 'translateY(-2.5%)',
    },

    'h1 span:last-child': {
      transform: 'rotate(5deg)',
    },

    '.buttons': {
      position: 'absolute',
      bottom: '2vmin',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '1vmin',
    },
  })

  const activeSlide = createStore<SlideName>('strawberry')

  const context: SliderContext = {
    activeSlide: activeSlide,
  }

  createContext('intro-slider', context)

  return (
    <component>
      <h1>
        <span>Т</span>
        <span>О</span>
        <span>П</span>
      </h1>
      <div class="buttons">
        <SliderButton
          slide="strawberry"
          activeSlide={activeSlide}
          color="#c5100d"
        ></SliderButton>
        <SliderButton
          slide="banana"
          activeSlide={activeSlide}
          color="#fac000"
        ></SliderButton>
      </div>
      <Background></Background>
      <Slide
        name="strawberry"
        description="Клубника"
        models={[
          {
            url: '/models/strawberry-opt.glb',
            amount: 70,
          },
        ]}
      ></Slide>
      <Slide
        name="banana"
        description="Банан c шоколадом"
        models={[
          {
            url: '/models/banana-opt.glb',
            amount: 50,
          },
          {
            url: '/models/chocolate-opt.glb',
            amount: 20,
          },
        ]}
      ></Slide>
    </component>
  )
}

export const App: JSX.Component = () => {
  en3.setup({
    webGLRendererParameters: {
      powerPreference: 'high-performance',
      antialias: false,
      stencil: false,
      depth: false,
    },
  })

  const toneMapping = new ToneMappingEffect({
    mode: ToneMappingMode.ACES_FILMIC,
    resolution: 720,
  })

  const smaaEffect = new SMAAEffect({
    preset: SMAAPreset.HIGH,
    edgeDetectionMode: EdgeDetectionMode.COLOR,
  })

  smaaEffect.edgeDetectionMaterial.edgeDetectionThreshold = 0.01

  const depthOfFieldEffect = new DepthOfFieldEffect(en3.camera, {
    focusDistance: 0.0,
    focalLength: 0.048,
    bokehScale: 2.0,
    height: 720,
  })

  const cocMaterial = depthOfFieldEffect.cocMaterial

  const scaleValue = createStore(5.1, {
    passport: {
      name: 'Глубина резкости.Размер',
      manager: {
        type: 'range',
        min: 1,
        max: 10,
        step: 0.001,
      },
    },
  })

  scaleValue.subscribe((e) => {
    depthOfFieldEffect.bokehScale = e.current
  })

  const focusValue = createStore(0.12, {
    passport: {
      name: 'Глубина резкости.Позиция',
      manager: {
        type: 'range',
        min: 0,
        max: 1,
        step: 0.001,
      },
    },
  })

  focusValue.subscribe((e) => {
    cocMaterial.uniforms.focusDistance.value = e.current
  })

  const focalLengthValue = createStore(0.76, {
    passport: {
      name: 'Глубина резкости.Длина',
      manager: {
        type: 'range',
        min: 0,
        max: 2,
        step: 0.0001,
      },
    },
  })

  focalLengthValue.subscribe((e) => {
    cocMaterial.uniforms.focalLength.value = e.current
  })

  const composer = new EffectComposer(en3.webglRenderer)
  composer.addPass(new RenderPass(en3.scene, en3.camera))
  composer.addPass(new EffectPass(en3.camera, depthOfFieldEffect, toneMapping))
  composer.addPass(new EffectPass(en3.camera, smaaEffect))

  new TextureLoader().load('/images/env.png', function (texture) {
    texture.mapping = EquirectangularReflectionMapping
    texture.colorSpace = SRGBColorSpace

    en3.scene.environment = texture
  })

  en3.onResize = () => {
    composer.setSize(en3.width, en3.height)
  }

  en3.render = () => {
    composer.render()
  }

  en3.webglRenderer.toneMappingExposure = 9

  return (
    <component>
      <Slider></Slider>
    </component>
  )
}
