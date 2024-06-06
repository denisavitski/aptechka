import {
  BufferGeometry,
  Material,
  Mesh,
  PlaneGeometry,
  SRGBColorSpace,
  Texture,
} from 'three'
import { coverTexture } from '../utils/coverTexture'
import {
  En3SourceManager,
  En3SourceManagerLoader,
  En3SourceManagerParameters,
} from '../attachments/En3SourceManager'
import { En3SourceConsumer } from './En3SourceConsumer'
import { windowResizer } from '@packages/window-resizer'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { en3 } from '../core/en3'

export type En3ImageLikeMaterial<TTexture extends Texture> = Material & {
  map: TTexture | null
}

export type En3ImageLikeFit = 'cover' | 'contain'

export interface En3ImageLikeParameters<
  TTexture extends Texture,
  TMaterial extends En3ImageLikeMaterial<TTexture>
> extends En3SourceManagerParameters<TTexture> {
  width?: number
  height?: number
  round?: number
  segments?: number
  material?: TMaterial
  fit?: En3ImageLikeFit
  loader: En3SourceManagerLoader<TTexture>
}

export class En3ImageLike<
    TTexture extends Texture,
    TMaterial extends En3ImageLikeMaterial<TTexture>
  >
  extends Mesh<BufferGeometry, TMaterial>
  implements En3SourceConsumer<TTexture>
{
  #sourceManager: En3SourceManager<TTexture>
  #fit: En3ImageLikeFit | undefined

  constructor(parameters: En3ImageLikeParameters<TTexture, TMaterial>) {
    super(
      parameters.round
        ? new RoundedBoxGeometry(
            parameters.width,
            parameters.height,
            1,
            parameters.segments,
            parameters.round
          )
        : new PlaneGeometry(
            parameters.width,
            parameters.height,
            parameters.segments,
            parameters.segments
          ),
      parameters.material
    )

    this.#sourceManager = new En3SourceManager<TTexture>({
      consumer: this,
      ...parameters,
    })

    this.#fit = parameters.fit

    this.addEventListener('added', () => {
      windowResizer.subscribe(this.#resizeListener)
    })

    this.addEventListener('removed', () => {
      windowResizer.unsubscribe(this.#resizeListener)
    })

    this.#sourceManager.processData = (d) => {
      if (en3.cacheAssets) {
        return d.clone()
      }

      return d
    }

    this.#sourceManager.data.subscribe((detail) => {
      if (!detail.current && detail.previous) {
        detail.previous.dispose()
      } else if (detail.current) {
        if (this.material) {
          if (this.#fit) {
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
    if (this.#sourceManager.data.current) {
      if (this.#fit === 'cover') {
        this.onCoverResize(this.#sourceManager.data.current)
      }
    }
  }
}
