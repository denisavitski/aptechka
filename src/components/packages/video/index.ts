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
  #pointerEnter = false

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

    this.consumerElement.addEventListener(
      'webkitendfullscreen',
      this.#fullscreenEndListener,
    )

    document.addEventListener(
      'fullscreenchange',
      this.#fullscreenChangeListener,
    )

    this.addEventListener('pointerenter', this.#pointerEnterListener)
    this.addEventListener('pointerleave', this.#pointerLeaveListener)
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

    this.removeEventListener('pointerenter', this.#pointerEnterListener)
    this.removeEventListener('pointerleave', this.#pointerLeaveListener)
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
    if (this.#isFullScreen) {
      return
    }

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
      this.#lockOrientation()

      this.consumerElement
        .requestFullscreen({ navigationUI: 'show' })
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
      this.hasAttribute('exit-fullscreen-when-paused') &&
      this.consumerElement.readyState === 4
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

    if (!this.#isFullScreen && this.hasAttribute('pause-on-exit-fullscreen')) {
      this.consumerElement.pause()
    }
  }

  #lockOrientation() {
    const isPortrait = window.innerHeight > window.innerWidth

    if (screen.orientation && 'lock' in screen.orientation) {
      if (isPortrait) {
        ;(screen.orientation as any).lock('portrait').catch((error: any) => {
          console.log('Orientation lock failed: ', error)
        })
      } else {
        ;(screen.orientation as any).lock('landscape').catch((error: any) => {
          console.log('Orientation lock failed: ', error)
        })
      }
    }
  }

  #pointerEnterListener = () => {
    this.#pointerEnter = true
    this.classList.remove('pointer-leave')
    this.classList.add('pointer-entered')

    if (this.hasAttribute('pointer-enter-replay')) {
      let media = this.getAttribute('pointer-enter-replay')
      media = !media || media === 'true' ? '(min-width: 0px)' : media

      if (matchMedia(media).matches) {
        this.consumerElement.pause()
        this.consumerElement.currentTime = 0

        requestAnimationFrame(() => {
          if (this.#pointerEnter) {
            this.consumerElement.play().then(() => {
              if (this.#pointerEnter) {
                this.classList.add('pointer-enter')
              }
            })
          }
        })
      }
    }
  }

  #pointerLeaveListener = () => {
    this.#pointerEnter = false
    this.classList.remove('pointer-enter')
    this.classList.add('pointer-leave')
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
