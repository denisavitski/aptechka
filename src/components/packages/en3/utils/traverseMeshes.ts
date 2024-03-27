import { Mesh, Object3D } from 'three'

export function traverseMeshes(object: Object3D, callback: (mesh: Mesh) => void) {
  object.traverse((node: Object3D) => {
    if (node instanceof Mesh) {
      callback(node)
    }
  })
}
