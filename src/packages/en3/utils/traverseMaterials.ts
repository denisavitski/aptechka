import { Mesh, Material, Object3D } from 'three'

export function traverseMaterials(object: Object3D, callback: (material: Material) => void) {
  object.traverse((node: Object3D) => {
    if (node instanceof Mesh && node.material) {
      const materials = Array.isArray(node.material) ? node.material : [node.material]
      materials.forEach(callback)
    }
  })
}
