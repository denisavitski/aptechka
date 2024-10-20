import { SourceElement } from '@packages/source'
import { dispatchEvent, generateId } from '@packages/utils'

export class YouTubeElement extends SourceElement<HTMLDivElement> {
  static __apiReady = false

  static __onYouTubeIframeAPIReady() {
    this.__apiReady = true
  }

  #player: any
  #containerId: string

  #needToPlay = false
  #playerReady = false

  constructor() {
    super()

    this.#containerId = 'yt-' + generateId(10)

    if (!YouTubeElement.__apiReady) {
      window.onYouTubeIframeAPIReady = () => {
        YouTubeElement.__apiReady = true
        dispatchEvent(window, 'youTubeIframeAPIReady')
      }
    }

    this.addEventListener('sourceCapture', () => {
      if (this.hasAttribute('capture-autoplay')) {
        if (this.#playerReady) {
          this.#player.playVideo()
        } else {
          this.#needToPlay = true
        }
      }
    })

    this.addEventListener('sourceRelease', () => {
      if (this.#player && this.hasAttribute('capture-autoplay')) {
        this.#player.pauseVideo()

        if (this.hasAttribute('replay')) {
          this.#player.seekTo(0)
        }
      }
    })
  }

  protected override createConsumer() {
    const wrapper = document.createElement('div')
    wrapper.id = this.#containerId
    return wrapper
  }

  protected override consumeSource(id: string | null) {
    if (id) {
      if (!document.getElementById('youtube-script')) {
        const tag = document.createElement('script')
        tag.id === 'youtube-script'
        tag.src = 'https://www.youtube.com/iframe_api'
        const firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
      }

      if (!this.#player) {
        if (YouTubeElement.__apiReady) {
          this.#createPlayer()
        } else {
          addEventListener('youTubeIframeAPIReady', this.#createPlayer)
        }
      } else {
        this.#updateVideo()
      }
    } else if (this.#player) {
      this.#player.stopVideo()
    }
  }

  protected override disconnectedCallback(): void {
    super.disconnectedCallback()

    if (this.#player) {
      this.#player.destroy()
    }

    removeEventListener('youTubeIframeAPIReady', this.#createPlayer)
  }

  #createPlayer = () => {
    this.#needToPlay =
      this.#needToPlay ||
      (this.hasAttribute('autoplay') && !this.hasAttribute('capture-autoplay'))

    this.#player = new window.YT.Player(this.#containerId, {
      playerVars: {
        mute: this.hasAttribute('muted') ? 1 : 0,
        controls: this.hasAttribute('controls') ? 1 : 0,
      },
      events: {
        onReady: this.#playerReadyListener,
        onError: this.#playerError,
        onStateChange: this.#stateChangeListener,
      },
    })
  }

  #playerReadyListener = () => {
    this.#playerReady = true
    this.#updateVideo()
  }

  #playerError = (e: any) => {
    console.error('YouTube: Ошибка при загрузке видео:', this.currentURL, e)
    this.consumerElement.onerror?.(new Event('error'))
  }

  #stateChangeListener = () => {}

  #updateVideo() {
    if (this.currentURL) {
      if (this.currentURL.startsWith('http')) {
        this.#player.loadVideoByUrl(this.currentURL)
      } else {
        this.#player.loadVideoById(this.currentURL)
      }
    }

    if (this.#needToPlay) {
      this.#player.playVideo()
    } else {
      this.#player.stopVideo()
    }

    this.#needToPlay = false

    this.consumerElement.onload?.(new Event('load'))
  }
}

if (!customElements.get('e-youtube')) {
  customElements.define('e-youtube', YouTubeElement)
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void
    YT: any
  }

  interface WindowEventMap {
    youTubeIframeAPIReady: CustomEvent
  }

  interface HTMLElementTagNameMap {
    'e-youtube': YouTubeElement
  }
}
