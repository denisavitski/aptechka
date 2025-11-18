import { ElementLinkedStore } from '@packages/element-linked-store'
import { loading } from '@packages/loading'
import { dispatchEvent, isBrowser, kebabToCamel } from '@packages/utils'
import { formatMediaDuration } from '@packages/utils/metadata'
import { type Source } from './SourceClass'
import { SourceManager } from './SourceManager'
import { type SourceSetOptions } from './SourceSet'

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
  #consumerHolderElement: HTMLElement = this
  #loadTriggerElements: Array<HTMLElement> = []
  #isFirstLoadHappened = false
  #isLazy = false
  #lazyLoaded = false
  #isManualLoad = false
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
        this.#intersectionListener,
      )
    }

    this.#status.subscribe((e) => {
      const globalClasses = this.getAttribute('data-global-play-class')?.split(
        ',',
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

  public get consumerHolderElement() {
    return this.#consumerHolderElement
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

    this.#consumerHolderElement =
      this.querySelector('[data-consumer-holder]') || this

    this.querySelectorAll('.source-consumer').forEach((el) => el?.remove())

    this.#loadTriggerElements = [
      ...this.querySelectorAll<HTMLElement>('[data-load-trigger]'),
    ]
    this.#loadTriggerElements.forEach((el) => {
      el.addEventListener('click', this.#loadTriggerListener)
    })

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
      this.#loadedmetadataListener,
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

    for (const key in this.dataset) {
      const value = this.dataset[key]
      const camelCased = kebabToCamel(key)

      if (camelCased in this.#consumerElement) {
        ;(this.#consumerElement as any)[camelCased] = value
          ? value === 'false'
            ? false
            : value
          : true
      }
    }

    this.#consumerHolderElement.appendChild(this.#consumerElement)

    this.#sourceManager = new SourceManager({
      srcset: srcset,
      sourceSetOptions: this.#sourceSetOptions,
    })

    this.#isLazy = this.hasAttribute('lazy')
    this.#isManualLoad = this.hasAttribute('manual-load')

    this.#sourceManager.subscribe((d) => {
      if (
        (!this.#isLazy && !this.#isManualLoad) ||
        (this.#isLazy && this.#lazyLoaded)
      ) {
        this.#loadSource(d.current)
      }
    })

    this.#sourceManager.connect()

    this.#intersectionObserver.observe(this)
  }

  protected disconnectedCallback() {
    clearTimeout(this.#clearTimeoutId)

    this.#loadTriggerElements.forEach((el) => {
      el.removeEventListener('click', this.#loadTriggerListener)
    })

    this.#intersectionObserver.disconnect()

    this.#sourceManager?.close()

    if (this.#consumerElement) {
      this.consumeSource(null)

      this.#consumerElement.removeEventListener('play', this.#playListener)
      this.#consumerElement.removeEventListener('pause', this.#pauseListener)
      this.#consumerElement.removeEventListener(
        'loadedmetadata',
        this.#loadedmetadataListener,
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

    this.#status.setKey('loaded', false)
    this.#status.setKey('error', false)
    this.#status.setKey('loading', false)
    this.#status.setKey('clear', false)
    this.#status.setKey('playing', false)
    this.#status.setKey('metadata', false)

    if (source) {
      this.#idWithUrl = `${this.#id}-${source.url}`
      const isKeepSourceParameters = this.hasAttribute('keep-source-parameters')

      this.#status.setKey('loading', true)

      this.#currentURL = isKeepSourceParameters
        ? source.url
        : source.name + source.extension

      this.consumeSource(this.#currentURL)

      if (!this.#isLazy && !this.#isFirstLoadHappened && !this.#isManualLoad) {
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

  #loadTriggerListener = () => {
    this.triggerLazyLoad()
  }

  #intersectionListener = (entries: Array<IntersectionObserverEntry>) => {
    const entry = entries[0]

    if (this.#isLazy && !this.#isManualLoad) {
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
    this.#status.setKey('loaded', true)
    this.#status.setKey('error', false)
    this.#status.setKey('loading', false)

    if (!this.#isLazy && !this.#isFirstLoadHappened) {
      loading.complete(this.#idWithUrl)
    }

    dispatchEvent(this, 'sourceLoaded', { custom: true })

    const clearDuration =
      getComputedStyle(this).getPropertyValue('--clear-duration')

    if (clearDuration) {
      this.#clearTimeoutId = setTimeout(
        () => {
          this.#status.setKey('clear', true)
        },
        parseFloat(clearDuration) * 1000,
      )
    } else {
      this.#status.setKey('clear', true)
    }

    this.#isFirstLoadHappened = true
  }

  #errorListener = (url: string) => {
    this.#status.setKey('loaded', false)
    this.#status.setKey('error', true)
    this.#status.setKey('loading', false)

    if (!this.#isLazy && !this.#isFirstLoadHappened) {
      loading.error(this.#idWithUrl)
    }

    dispatchEvent(this, 'sourceError', { custom: true })

    this.#isFirstLoadHappened = true
  }

  #playListener = () => {
    this.#status.setKey('playing', true)

    dispatchEvent(this, 'sourcePlay', { custom: true })
  }

  #pauseListener = () => {
    this.#status.setKey('playing', false)

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
      this.#status.setKey('metadata', true)

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
