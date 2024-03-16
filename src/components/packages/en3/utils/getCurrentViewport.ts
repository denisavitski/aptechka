import { OrthographicCamera, PerspectiveCamera, Vector3 } from 'three'
import { en3 } from '../core/en3'

const tempTarget = new Vector3()
const position = new Vector3()

// https://github.com/pmndrs/react-three-fiber/blob/e1acae8e1aea6ac8b255d42ffd19d0bfdd6cd529/packages/fiber/src/core/store.ts#L173
export function getCurrentViewport(
  target: THREE.Vector3 | [number, number, number]
) {
  const { width, height } = en3
  const aspect = width / height

  if (target instanceof Vector3) {
    tempTarget.copy(target)
  } else {
    tempTarget.set(...target)
  }

  const distance = en3.camera.getWorldPosition(position).distanceTo(tempTarget)

  if (en3.camera instanceof OrthographicCamera) {
    return {
      width: width / en3.camera.zoom,
      height: height / en3.camera.zoom,
      factor: 1,
      distance,
      aspect,
    }
  } else {
    const fov = (en3.camera.fov * Math.PI) / 180
    const h = 2 * Math.tan(fov / 2) * distance
    const w = h * (width / height)
    return { width: w, height: h, factor: width / w, distance, aspect }
  }
}
