import { Dot2D } from '@packages/client/utils'
import { Texture } from 'three'

/**
 * texture.matrixAutoUpdate must be false
 */
export function coverTexture(
  texture: Texture,
  planeSize: Dot2D,
  aspect?: number
) {
  const width = planeSize.x
  const height = planeSize.y
  const _aspect = aspect || texture.image.width / texture.image.height

  let sx = 0
  let sy = 0
  let tx = texture.offset.x
  let ty = texture.offset.y
  let r = texture.rotation
  let cx = texture.center.x
  let cy = texture.center.y

  if (width / height > _aspect) {
    sx = 1
    sy = (height / width) * _aspect
  } else {
    sy = 1
    sx = width / height / _aspect
  }

  texture.matrix.setUvTransform(tx, ty, sx, sy, r, cx, cy)
}
