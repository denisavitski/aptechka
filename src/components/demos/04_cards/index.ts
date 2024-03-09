import { Damped } from '@packages/animation'
import {
  Component,
  attachShadow,
  attachStyle,
  onDisconnect,
} from '@packages/component'
import { En3RaycasterEvent, dispose, en3 } from '@packages/en3'
import { en3TextureLoader } from '@packages/en3/loaders/en3TextureLoader'
import { DerivedArray, Store } from '@packages/store'
import {
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  SRGBColorSpace,
  Texture,
} from 'three'

function createHandStore() {
  const store = new Store<Array<string>>([])
  const hoveredCard = new Store<number | null>(null)

  function add() {
    store.current = [...store.current, 'asd']
  }

  function removeLast() {
    store.current = store.current.slice(0, -1)
  }

  return {
    store,
    add,
    removeLast,
    hoveredCard,
  }
}

const handStore = createHandStore()

export interface CardParameters {
  cover: Texture
}

const createCard = (parameters: CardParameters) => {
  const geometry = new PlaneGeometry()
  const material = new MeshBasicMaterial({
    map: parameters.cover,
  })
  const mesh = new Mesh(geometry, material)

  return mesh
}

const handSlot = Component<{ card: Mesh; index: number }>(
  'hand-slot',
  (props) => {
    attachStyle({
      'e-hand-slot': {
        position: 'absolute',
        bottom: '0%',
        left: '50%',
        display: 'block',
        width: '20vmin',
        height: '30vmin',
      },
    })

    const group = new Group()
    group.add(props.card)

    const damping = 0.04

    const box = en3.add(group, props.element)!.userData.box

    box.setPositionStep('hover', '+', {})
    box.setPositionStep('drag', '+', {})

    en3.raycaster.add(group, {
      propagation: false,
    })

    onDisconnect(() => {
      dispose(group)
      en3.remove(group)
      en3.raycaster.remove(group)
    })

    handStore.store.subscribe(() => {
      const offset = Math.PI * 0.3

      const totalProgress = (handStore.store.current.length - 1) / 10
      const progress = props.index / 10

      const angle =
        -(Math.PI - offset) +
        (Math.PI / 2 - offset) * (1 - totalProgress) +
        (Math.PI - offset * 2) * progress

      const cos = Math.cos(angle)
      const sin = Math.sin(angle) * -1
      const rot = (angle + Math.PI / 2) * -1

      box.setPositionStep(
        'initial',
        '+',
        {
          x: cos * 300,
          y: sin * 300 - 300,
          z: props.index * 2,
        },
        damping
      )

      box.setRotationStep(
        'initial',
        '+',
        {
          z: rot,
        },
        damping
      )
    })

    handStore.hoveredCard.subscribe((e) => {
      if (props.index === e.current) {
        box.setPositionStep(
          'hover',
          '+',
          {
            y: 100,
            z: 100,
          },
          damping
        )

        box.setRotationStep(
          'hover',
          '+',
          {
            z: box.getRotationStep('initial').z * -1,
          },
          damping
        )
      } else {
        box.setPositionStep(
          'hover',
          '+',
          {
            y: 0,
          },
          damping
        )

        box.setRotationStep(
          'hover',
          '+',
          {
            z: 0,
          },
          damping
        )
      }
    })

    group.addEventListener('en3PointerEnter', (e) => {
      handStore.hoveredCard.current = props.index
    })

    group.addEventListener('en3PointerDown', (e) => {
      const event = e as unknown as En3RaycasterEvent
      const grabEvent = event.originalEvent

      const move = (moveEvent: PointerEvent) => {
        const dx = moveEvent.x - grabEvent.x
        const dy = moveEvent.y - grabEvent.y

        box.setPositionStep('drag', '+', {
          x: startPosition.x + dx,
          y: startPosition.y + dy * -1,
        })
      }

      const drop = () => {
        removeEventListener('pointermove', move)
        removeEventListener('pointerup', drop)
        removeEventListener('touchend', drop)
      }

      addEventListener('pointermove', move)
      addEventListener('pointerup', drop)
      addEventListener('touchend', drop)

      const startPosition = box.getPositionStep('drag')
    })
  }
)

const app = Component('app', (props) => {
  attachShadow()

  attachStyle({
    ':host': {
      width: '100%',
      height: '100%',
      display: 'block',
    },
  })

  en3.setup({
    webGLRendererParameters: {
      antialias: true,
    },
  })

  addEventListener('keydown', (e) => {
    if (e.key === '1') {
      handStore.add()
    } else if (e.key === '2') {
      handStore.removeLast()
    }
  })

  const coverTexture = en3TextureLoader.load('/images/1.jpg')
  coverTexture.colorSpace = SRGBColorSpace

  return {
    children: [
      new DerivedArray(handStore.store, (v, index) => {
        return handSlot({
          card: createCard({ cover: coverTexture }),
          index,
        })
      }),
    ],
  }
})

document.body.appendChild(app())
