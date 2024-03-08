import {
  Component,
  attachShadow,
  attachStyle,
  createDamped,
} from '@packages/component'
import { en3 } from '@packages/en3'
import { Group, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three'

const createCard = () => {
  const geometry = new PlaneGeometry()
  const material = new MeshBasicMaterial({ color: 'red' })
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

    const offset = Math.PI * 0.3

    const progress = props.index / 9

    const angle = -(Math.PI - offset) + (Math.PI - offset * 2) * progress

    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    const rot = angle + Math.PI / 2

    en3.add(group, props.element)!.userData.box

    return {
      style: {
        transform: `
          translate(
            calc(-50% + ${cos} * 30vmin), 
            calc(${sin} * 30vmin + 30vmin)
          ) 
          rotate(${rot}rad)`,
      },
    }
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

  return {
    children: [
      ...new Array(10).fill(0).map((_, index) => {
        return handSlot({
          card: createCard(),
          index,
        })
      }),
    ],
  }
})

document.body.appendChild(app())
