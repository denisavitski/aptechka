import { device } from '@packages/device'
import { SourceElement } from '@packages/source'
import { ticker } from '@packages/ticker'
import { dispatchEvent, isBrowser } from '@packages/utils'

export interface VideoEvents {
  videoReadyStateChange: CustomEvent<{
    readyState: number
    progress: number
  }>
}

export class VideoElement extends SourceElement<HTMLVideoElement> {
  #progress = 0
  #needToPlay = false
  #clickElement: HTMLElement = this
  #isFullScreen = false

  protected override connectedCallback() {
    super.connectedCallback()

    const clickControlsSelector = this.getAttribute('click-controls')

    if (clickControlsSelector) {
      if (clickControlsSelector === 'parent') {
        this.#clickElement = this.parentElement!
      } else {
        this.#clickElement =
          document.querySelector(clickControlsSelector) || this
      }
    }

    this.addEventListener('sourceCapture', () => {
      this.#needToPlay = false

      if (this.hasAttribute('capture-autoplay')) {
        if (this.sourceManager.current) {
          this.consumerElement.play()
        } else {
          this.#needToPlay = true
        }
      }

      ticker.subscribe(this.#checkReady)
    })

    this.addEventListener('sourceRelease', () => {
      if (this.hasAttribute('capture-autoplay')) {
        this.consumerElement.pause()
      }

      if (this.hasAttribute('release-pause')) {
        this.consumerElement.pause()
      }

      if (this.hasAttribute('release-stop')) {
        this.consumerElement.pause()
        this.consumerElement.currentTime = 0
      }

      if (this.hasAttribute('replay')) {
        this.consumerElement.currentTime = 0
      }

      if (this.hasAttribute('reload-source')) {
        this.classList.remove(
          'state-0',
          'state-1',
          'state-2',
          'state-3',
          'state-4',
        )
      }
    })

    this.#clickElement.addEventListener('click', this.#clickListener)

    this.consumerElement.addEventListener('play', this.#playListener)
    this.consumerElement.addEventListener('pause', this.#pauseListener)
    this.consumerElement.addEventListener(
      'webkitendfullscreen',
      this.#fullscreenEndListener,
    )

    document.addEventListener(
      'fullscreenchange',
      this.#fullscreenChangeListener,
    )
  }

  protected override disconnectedCallback() {
    super.disconnectedCallback()

    ticker.unsubscribe(this.#checkReady)

    this.#progress = 0

    this.#clickElement.removeEventListener('click', this.#clickListener)

    this.consumerElement.removeEventListener('play', this.#playListener)
    this.consumerElement.removeEventListener('pause', this.#pauseListener)
    this.consumerElement.removeEventListener(
      'webkitendfullscreen',
      this.#fullscreenEndListener,
    )

    document.removeEventListener(
      'fullscreenchange',
      this.#fullscreenChangeListener,
    )
  }

  protected override createConsumer() {
    const video = document.createElement('video')

    if (this.hasAttribute('playsinline')) {
      video.setAttribute('playsinline', '')
      video.setAttribute('webkit-playsinline', '')
    }

    if (!this.hasAttribute('controls')) {
      video.removeAttribute('controls')
    } else {
      video.setAttribute('controls', '')
    }

    return video
  }

  protected override consumeSource(url: string | null) {
    this.consumerElement.src = url || ''

    if (url) {
      if (this.hasAttribute('volume')) {
        this.consumerElement.volume = parseFloat(
          this.getAttribute('volume') || '1',
        )
      }
    }
  }

  #checkReady = () => {
    this.classList.add(`state-${this.consumerElement.readyState}`)

    const newProgress = this.consumerElement.readyState / 4

    if (newProgress !== this.#progress) {
      dispatchEvent(this, 'videoReadyStateChange', {
        detail: {
          readyState: this.consumerElement.readyState,
          progress: this.#progress,
        },
      })
    }

    if (newProgress > this.#progress) {
      this.#progress = newProgress
    }

    if (this.consumerElement.readyState === 4) {
      ticker.unsubscribe(this.#checkReady)

      if (this.#needToPlay && this.sourceManager.current) {
        this.consumerElement.play()
      }
    }
  }

  #clickListener = () => {
    if (this.hasAttribute('click-controls')) {
      if (this.consumerElement.paused) {
        this.consumerElement.play()
      } else if (!this.hasAttribute('controls')) {
        this.consumerElement.pause()
      }
    }
  }

  #playListener = () => {
    const fullscreenAttr = this.getAttribute('fullscreen')
    const hasPlaysinline = this.hasAttribute('playsinline')

    let shouldEnterFullscreen = false

    if (fullscreenAttr === 'mobile') {
      shouldEnterFullscreen =
        device.isMobile && !(device.isApple && hasPlaysinline)
    } else if (fullscreenAttr !== null) {
      shouldEnterFullscreen = !(device.isApple && hasPlaysinline)
    }

    if (shouldEnterFullscreen) {
      this.consumerElement
        .requestFullscreen()
        .then(() => {
          this.#isFullScreen = true
        })
        .catch((err) => {
          console.log('Fullscreen request failed:', err)
        })
    }
  }

  #pauseListener = () => {
    if (
      this.#isFullScreen &&
      this.hasAttribute('fullscreen') &&
      this.hasAttribute('exit-fullscreen-when-paused')
    ) {
      this.#isFullScreen = false
      document.exitFullscreen().catch((err) => {
        console.log('Exit fullscreen failed:', err)
      })
    }
  }

  #fullscreenEndListener = () => {
    this.#isFullScreen = false
  }

  #fullscreenChangeListener = () => {
    this.#isFullScreen = !!document.fullscreenElement
  }
}

if (isBrowser && !customElements.get('e-video')) {
  customElements.define('e-video', VideoElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-video': VideoElement
  }

  interface HTMLElementEventMap extends VideoEvents {}
}
