import { Dot2D } from '@packages/utils'
import { Texture } from 'three'

function getTextureImageAspect(image: Texture['image']): number {
  if (
    image != null &&
    typeof image === 'object' &&
    'width' in image &&
    'height' in image
  ) {
    const { width, height } = image as { width: number; height: number }

    return width / height
  }

  return 1
}

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
  const _aspect = aspect ?? getTextureImageAspect(texture.image)

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
