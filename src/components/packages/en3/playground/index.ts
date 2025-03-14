import * as THREE from 'three'
import { en3 } from '../en3'

const box = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshBasicMaterial({ color: 'red' })
)

en3.view.add(box)
