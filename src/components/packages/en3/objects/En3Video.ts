import { Loader, VideoTexture } from 'three'
import { En3ImageLike, En3ImageLikeMaterial, En3ImageLikeParameters } from './En3ImageLike'
import { coverTexture } from '../utils/coverTexture'

class En3VideoLoader<
  P extends Parameters<Loader<VideoTexture>['load']> = Parameters<Loader<VideoTexture>['load']>
> {
  public load(...parameters: P) {
    const url = parameters[0]
    const onLoad = parameters[1]
    const onError = parameters[3]

    const videoElement = document.createElement('video')
    videoElement.src = url

    videoElement.onloadeddata = () => {
      onLoad(new VideoTexture(videoElement))

      videoElement.onerror = null
      videoElement.onloadeddata = null
    }

    videoElement.onerror = () => {
      onError?.(url)

      videoElement.onerror = null
      videoElement.onloadeddata = null
    }
  }
}

export interface En3VideoParameters<TMaterial extends En3ImageLikeMaterial<VideoTexture>>
  extends Omit<En3ImageLikeParameters<VideoTexture, TMaterial>, 'loader'> {
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
}

export class En3Video<TMaterial extends En3ImageLikeMaterial<VideoTexture>> extends En3ImageLike<
  VideoTexture,
  TMaterial
> {
  #isAutoplay: boolean
  #isMuted: boolean
  #isLoop: boolean

  constructor(parameters: En3VideoParameters<TMaterial>) {
    super({
      ...parameters,
      loader: new En3VideoLoader(),
    })

    this.#isAutoplay = parameters.autoplay || false
    this.#isMuted = parameters.muted || false
    this.#isLoop = parameters.loop || false

    this.sourceManager.data.subscribe((v) => {
      if (v.current) {
        const video = v.current.image as HTMLVideoElement

        if (this.#isMuted) {
          video.muted = true
        }

        if (this.#isLoop) {
          video.loop = true
        }

        if (this.#isAutoplay) {
          video.play()
        }
      }
    })
  }

  protected override onCoverResize(texture: VideoTexture) {
    const video = texture.image as HTMLVideoElement

    coverTexture(
      texture,
      {
        x: this.scale.x,
        y: this.scale.y,
      },
      video.videoWidth / video.videoHeight
    )
  }
}
