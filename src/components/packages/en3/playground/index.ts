import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import { en3 } from '..'
import { Store } from '@packages/store'

console.log('Playground')

en3.setup()

const mesh = new Mesh(new BoxGeometry(), new MeshBasicMaterial())

mesh.scale.setScalar(100)

en3.add(mesh)

mesh.position.x = new Store(0).current
