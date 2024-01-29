import { Material, Mesh, PlaneGeometry, SRGBColorSpace, Texture } from 'three'
import { coverTexture } from '../utils/coverTexture'
import {
  En3SourceManager,
  En3SourceManagerLoader,
  En3SourceManagerParameters,
} from '../attachments/En3SourceManager'
import { En3SourceConsumer } from './En3SourceConsumer'
import { resizer } from '$packages/resizer'

export type En3ImageLikeMaterial<TTexture extends Texture> = Material & { map: TTexture | null }

export interface En3ImageLikeParameters<
  TTexture extends Texture,
  TMaterial extends En3ImageLikeMaterial<TTexture>
> extends En3SourceManagerParameters<TTexture> {
  width?: number
  height?: number
  widthSegments?: number
  heightSegments?: number
  material?: TMaterial
  cover?: boolean
  loader: En3SourceManagerLoader<TTexture>
}

export class En3ImageLike<
    TTexture extends Texture,
    TMaterial extends En3ImageLikeMaterial<TTexture>
  >
  extends Mesh<PlaneGeometry, TMaterial>
  implements En3SourceConsumer<TTexture>
{
  #sourceManager: En3SourceManager<TTexture>
  #isCover: boolean

  constructor(parameters: En3ImageLikeParameters<TTexture, TMaterial>) {
    super(
      new PlaneGeometry(
        parameters.width,
        parameters.height,
        parameters.widthSegments,
        parameters.heightSegments
      ),
      parameters.material
    )

    this.#sourceManager = new En3SourceManager<TTexture>({
      consumer: this,
      ...parameters,
    })

    this.#isCover = parameters.cover || false

    this.addEventListener('added', () => {
      resizer.subscribe(this.#resizeListener)
    })

    this.addEventListener('removed', () => {
      resizer.unsubscribe(this.#resizeListener)
    })

    this.#sourceManager.data.subscribe((detail) => {
      if (!detail.current && detail.previous) {
        detail.previous.dispose()
      } else if (detail.current) {
        if (this.material) {
          if (this.#isCover) {
            detail.current.matrixAutoUpdate = false
          }

          detail.current.colorSpace = SRGBColorSpace
          detail.current.center.set(0.5, 0.5)
          this.material.map = detail.current
          this.material.needsUpdate = true
          this.#resizeListener()
        }
      }
    })
  }

  public get sourceManager() {
    return this.#sourceManager
  }

  public updateTexture() {
    this.#resizeListener()
  }

  protected onCoverResize(texture: TTexture) {
    coverTexture(texture, {
      x: this.scale.x,
      y: this.scale.y,
    })
  }

  #resizeListener = () => {
    if (this.#sourceManager.data.current && this.#isCover) {
      this.onCoverResize(this.#sourceManager.data.current)
    }
  }
}
