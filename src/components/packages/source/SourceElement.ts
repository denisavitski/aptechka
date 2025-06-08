import { ElementLinkedStore } from '@packages/element-linked-store'
import { isBrowser, kebabToCamel } from '@packages/utils'
import { dispatchEvent } from '@packages/utils'
import { loading } from '@packages/loading'
import { type Source } from './SourceClass'
import { type SourceSetOptions } from './SourceSet'
import { SourceManager } from './SourceManager'
import { formatMediaDuration } from '@packages/utils/metadata'

let id = 0

export interface SourceEvents {
  sourceCapture: CustomEvent
  sourceRelease: CustomEvent
  sourceLoaded: CustomEvent
  sourceError: CustomEvent
  sourcePlay: CustomEvent
  sourcePause: CustomEvent
  sourceMetadataLoaded: CustomEvent
}

export interface SourceElementOptions {
  sourceSetOptions?: SourceSetOptions
}

export abstract class SourceElement<T extends HTMLElement> extends HTMLElement {
  #sourceManager: SourceManager = null!
  #consumerElement: T = null!
  #isFirstLoadHappened = false
  #lazyLoaded = false
  #isLazy = false
  #id: string = ''
  #idWithUrl = ''

  #status = new ElementLinkedStore(this, {
    loading: false,
    loaded: false,
    error: false,
    clear: false,
    playing: false,
    metadata: false,
  })

  #intersectionObserver: IntersectionObserver = null!

  #clearTimeoutId: ReturnType<typeof setTimeout> | undefined

  #currentURL: string | null = null

  #sourceSetOptions: SourceSetOptions | undefined

  constructor(options?: SourceElementOptions) {
    super()

    this.#sourceSetOptions = options?.sourceSetOptions

    if (isBrowser && window.IntersectionObserver) {
      this.#intersectionObserver = new IntersectionObserver(
        this.#intersectionListener
      )
    }

    this.#status.subscribe((e) => {
      const globalClasses = this.getAttribute('data-global-play-class')?.split(
        ','
      )

      if (globalClasses?.length) {
        if (e.current.playing) {
          globalClasses.forEach((className) => {
            document.documentElement.classList.add(className.trim())
          })
        } else {
          globalClasses.forEach((className) => {
            document.documentElement.classList.remove(className.trim())
          })
        }
      }
    })
  }

  public get consumerElement() {
    return this.#consumerElement
  }

  public get sourceManager() {
    return this.#sourceManager
  }

  public get status() {
    return this.#status
  }

  public get isLazy() {
    return this.#isLazy
  }

  public get currentURL() {
    return this.#currentURL
  }

  public get isFirstLoadHappened() {
    return this.#isFirstLoadHappened
  }

  public triggerLazyLoad() {
    if (
      !this.#lazyLoaded &&
      this.#sourceManager.current &&
      this.#sourceManager.current !== this.#sourceManager.previous
    ) {
      this.#lazyLoaded = true
      this.#loadSource(this.#sourceManager.current)
    }
  }

  protected abstract createConsumer(): T
  protected abstract consumeSource(url: string | null): void

  protected connectedCallback() {
    this.#id = `source-consumer-${++id}`

    const srcset = this.getAttribute('srcset') || ''

    const notifyElement = this.hasAttribute('notify')
      ? this.closest<HTMLElement>(this.getAttribute('notify')!)
      : null

    if (notifyElement) {
      this.#status.addElement(notifyElement)
    }

    this.querySelector('.source-consumer')?.remove()

    this.#consumerElement = this.createConsumer()

    this.#consumerElement.style.cssText = `
        display: block;
        width: 100%;
        height: 100%;
      `

    this.#consumerElement.classList.add('source-consumer')

    this.#consumerElement.addEventListener('play', this.#playListener)
    this.#consumerElement.addEventListener('pause', this.#pauseListener)
    this.#consumerElement.addEventListener(
      'loadedmetadata',
      this.#loadedmetadataListener
    )
    this.#loadedmetadataListener()

    Array.from(this.attributes).forEach((attr) => {
      if (attr.name !== 'srcset') {
        const value = attr.nodeValue || ''
        const camelCased = kebabToCamel(attr.name)

        if (camelCased in this.#consumerElement) {
          ;(this.#consumerElement as any)[camelCased] = value ? value : true
        }
      }
    })

    this.appendChild(this.#consumerElement)

    this.#sourceManager = new SourceManager({
      srcset: srcset,
      sourceSetOptions: this.#sourceSetOptions,
    })

    this.#isLazy = this.hasAttribute('lazy')

    this.#sourceManager.subscribe((d) => {
      if (!this.#isLazy || (this.#isLazy && this.#lazyLoaded)) {
        this.#loadSource(d.current)
      }
    })

    this.#sourceManager.connect()

    this.#intersectionObserver.observe(this)
  }

  protected disconnectedCallback() {
    clearTimeout(this.#clearTimeoutId)

    this.#intersectionObserver.disconnect()

    this.#sourceManager?.close()

    if (this.#consumerElement) {
      this.consumeSource(null)

      this.#consumerElement.removeEventListener('play', this.#playListener)
      this.#consumerElement.removeEventListener('pause', this.#pauseListener)
      this.#consumerElement.removeEventListener(
        'loadedmetadata',
        this.#loadedmetadataListener
      )

      this.#consumerElement.onloadeddata = null
      this.#consumerElement.onload = null
      this.#consumerElement.onerror = null
      this.#consumerElement.onerror = null
      this.#consumerElement.remove()
    }

    this.#isFirstLoadHappened = false
    this.#lazyLoaded = false

    this.#status.reset()
  }

  #loadSource(source: Source | undefined) {
    clearTimeout(this.#clearTimeoutId)

    this.#consumerElement.onloadeddata = null
    this.#consumerElement.onload = null
    this.#consumerElement.onerror = null

    this.#status.set('loaded', false)
    this.#status.set('error', false)
    this.#status.set('loading', false)
    this.#status.set('clear', false)
    this.#status.set('playing', false)
    this.#status.set('metadata', false)

    if (source) {
      this.#idWithUrl = `${this.#id}-${source.url}`
      const isKeepSourceParameters = this.hasAttribute('keep-source-parameters')

      this.#status.set('loading', true)

      this.#currentURL = isKeepSourceParameters
        ? source.url
        : source.name + source.extension

      this.consumeSource(this.#currentURL)

      if (!this.#isLazy && !this.#isFirstLoadHappened) {
        loading.add(this.#idWithUrl)
      }

      this.#consumerElement.onloadeddata = () => {
        this.#loadListener()
      }

      this.#consumerElement.onload = () => {
        this.#loadListener()
      }

      this.#consumerElement.onerror = () => {
        this.#errorListener(this.#currentURL!)
      }
    } else {
      this.#currentURL = null
      this.consumeSource(null)
    }
  }

  #intersectionListener = (entries: Array<IntersectionObserverEntry>) => {
    const entry = entries[0]

    if (this.#isLazy) {
      if (
        (!this.#lazyLoaded || this.hasAttribute('reload-source')) &&
        entry.isIntersecting
      ) {
        this.triggerLazyLoad()
      }
    }

    if (entry.isIntersecting) {
      dispatchEvent(this, 'sourceCapture', { custom: true })
    } else {
      if (this.hasAttribute('reload-source')) {
        this.#loadSource(undefined)
        this.#lazyLoaded = false
      }

      dispatchEvent(this, 'sourceRelease', { custom: true })
    }
  }

  #loadListener = () => {
    this.#status.set('loaded', true)
    this.#status.set('error', false)
    this.#status.set('loading', false)

    if (!this.#isLazy && !this.#isFirstLoadHappened) {
      loading.complete(this.#idWithUrl)
    }

    dispatchEvent(this, 'sourceLoaded', { custom: true })

    const clearDuration =
      getComputedStyle(this).getPropertyValue('--clear-duration')

    if (clearDuration) {
      this.#clearTimeoutId = setTimeout(() => {
        this.#status.set('clear', true)
      }, parseFloat(clearDuration) * 1000)
    } else {
      this.#status.set('clear', true)
    }

    this.#isFirstLoadHappened = true
  }

  #errorListener = (url: string) => {
    this.#status.set('loaded', false)
    this.#status.set('error', true)
    this.#status.set('loading', false)

    if (!this.#isLazy && !this.#isFirstLoadHappened) {
      loading.error(this.#idWithUrl)
    }

    dispatchEvent(this, 'sourceError', { custom: true })

    this.#isFirstLoadHappened = true
  }

  #playListener = () => {
    this.#status.set('playing', true)

    dispatchEvent(this, 'sourcePlay', { custom: true })
  }

  #pauseListener = () => {
    this.#status.set('playing', false)

    dispatchEvent(this, 'sourcePause', { custom: true })
  }

  #loadedmetadataListener = () => {
    const consumerElement = this.#consumerElement as any as
      | HTMLVideoElement
      | HTMLAudioElement

    if (
      (consumerElement.tagName === 'VIDEO' ||
        consumerElement.tagName === 'AUDIO') &&
      consumerElement.readyState >= 1
    ) {
      this.#status.set('metadata', true)

      dispatchEvent(this, 'sourceMetadataLoaded', { custom: true })

      this.querySelectorAll('[data-source-duration]').forEach((el) => {
        el.textContent = formatMediaDuration(consumerElement.duration)
      })
    }
  }
}

declare global {
  interface HTMLElementEventMap extends SourceEvents {}
}
