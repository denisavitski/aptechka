import { CustomElement } from '@packages/custom-element'
import { loading } from '@packages/loading'
import type { Source } from './SourceClass'
import { SourceManager } from './SourceManager'
import { ClassLinkedStatus } from '@packages/class-linked-status'
import { isBrowser, kebabToCamel } from '@packages/utils'

let id = 0

export abstract class SourceElement<
  T extends HTMLElement
> extends CustomElement {
  #sourceManager: SourceManager = null!
  #consumerElement: T = null!
  #isFirstLoadHappened = false
  #intersectionHappened = false
  #isLazy = false
  #id: string = ''

  #status = new ClassLinkedStatus(this, {
    loading: false,
    loaded: false,
    error: false,
  })

  #intersectionObserver: IntersectionObserver = null!

  constructor() {
    super()

    if (isBrowser) {
      this.#id = `source-consumer-${++id}`
      this.#intersectionObserver = new IntersectionObserver(
        this.#intersectionListener
      )
    }
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

  protected abstract createConsumer(): T
  protected abstract consumeSource(url: string | null): void

  protected connectedCallback() {
    const srcset = this.getAttribute('srcset')

    if (!srcset) return

    this.#consumerElement = this.createConsumer()

    this.#consumerElement.style.cssText = `
        display: block;
        width: 100%;
        height: 100%;
      `

    this.#consumerElement.classList.add('source-consumer')

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
    })

    this.#isLazy = this.hasAttribute('lazy')

    this.#sourceManager.subscribe((d) => {
      if (!this.#isLazy || (this.#isLazy && this.#intersectionHappened)) {
        this.#loadSource(d.current)
      }
    })

    this.#intersectionObserver.observe(this)

    this.#sourceManager.connect()
  }

  protected disconnectedCallback() {
    this.#intersectionObserver.disconnect()

    this.#sourceManager.close()

    this.#consumerElement.onloadeddata = null
    this.#consumerElement.onload = null
    this.#consumerElement.onerror = null

    this.#consumerElement.remove()

    this.#status.reset()
  }

  #loadSource(source: Source | undefined) {
    this.#consumerElement.onloadeddata = null
    this.#consumerElement.onload = null
    this.#consumerElement.onerror = null

    this.#status.set('loaded', false)
    this.#status.set('error', false)
    this.#status.set('loading', false)

    if (source) {
      const isKeepSourceParameters = this.hasAttribute('keep-source-parameters')

      this.#status.set('loading', true)

      const url = isKeepSourceParameters
        ? source.url
        : source.name + source.extension

      this.consumeSource(url)

      if (!this.#isLazy && !this.#isFirstLoadHappened) {
        loading.setTotal(this.#id, 1)
      }

      this.#consumerElement.onloadeddata = () => {
        this.#loadListener()
      }

      this.#consumerElement.onload = () => {
        this.#loadListener()
      }

      this.#consumerElement.onerror = () => {
        this.#errorListener(url)
      }
    } else {
      this.consumeSource(null)
    }
  }

  #intersectionListener = (entries: Array<IntersectionObserverEntry>) => {
    const entry = entries[0]

    if (this.#isLazy) {
      if (
        (!this.#intersectionHappened || this.hasAttribute('reload-source')) &&
        entry.isIntersecting
      ) {
        if (
          this.#sourceManager.current &&
          this.#sourceManager.current !== this.#sourceManager.previous
        ) {
          this.#loadSource(this.#sourceManager.current)
        }

        this.#intersectionHappened = true
      }
    }

    if (entry.isIntersecting) {
      this.dispatchEvent(new CustomEvent('sourceCapture'))
    } else {
      if (this.hasAttribute('reload-source')) {
        this.#loadSource(undefined)
      }

      this.dispatchEvent(new CustomEvent('sourceRelease'))
    }
  }

  #loadListener = () => {
    this.#status.set('loaded', true)
    this.#status.set('error', false)
    this.#status.set('loading', false)

    if (!this.#isLazy && !this.#isFirstLoadHappened) {
      loading.setLoaded(this.#id, 1)
    }

    this.#isFirstLoadHappened = true
  }

  #errorListener = (url: string) => {
    this.#status.set('loaded', false)
    this.#status.set('error', true)
    this.#status.set('loading', false)

    if (!this.#isLazy && !this.#isFirstLoadHappened) {
      loading.setError(this.#id, url)
    }

    this.#isFirstLoadHappened = true
  }
}

declare global {
  interface HTMLElementEventMap {
    sourceCapture: CustomEvent
    sourceRelase: CustomEvent
  }
}
