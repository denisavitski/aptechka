import { MeshBasicMaterial } from 'three'
import { En3Image, en3 } from '..'
import '@packages/scroll'

console.log('Playground')

en3.setup({})

const mesh = new En3Image({
  srcset: '/env.png',
  material: new MeshBasicMaterial(),
})

en3.view.add(mesh, '.content')
