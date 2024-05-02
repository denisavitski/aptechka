import { CustomElement } from '@packages/custom-element'
import { intersector } from '@packages/intersector'
import { loading } from '@packages/loading'
import type { Source } from './SourceClass'
import { SourceManager } from './SourceManager'

let id = 0

export interface SourceConsumer extends HTMLElement {
  src: string | null
}

export abstract class SourceElement<
  T extends SourceConsumer
> extends CustomElement {
  #sourceManager: SourceManager = null!
  #consumerElement: T = null!
  #isFirstLoadHappened = false
  #intersectionHappened = false
  #isLazy = false
  #id: string

  constructor() {
    super()

    this.#id = `source-consumer-${++id}`
  }

  public get consumerElement() {
    return this.#consumerElement
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

        if (attr.name in this.#consumerElement) {
          ;(this.#consumerElement as any)[attr.name] = value ? value : true
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

    intersector.subscribe(this, this.#intersectionListener)

    this.#sourceManager.connect()
  }

  protected disconnectedCallback() {
    intersector.unsubscribe(this.#intersectionListener)

    this.#sourceManager.close()

    this.#consumerElement.onloadeddata = null
    this.#consumerElement.onload = null
    this.#consumerElement.onerror = null

    this.#consumerElement.remove()
  }

  #loadSource(source: Source | undefined) {
    this.#consumerElement.onloadeddata = null
    this.#consumerElement.onload = null
    this.#consumerElement.onerror = null

    if (source) {
      const isKeepSourceParameters = this.hasAttribute('keep-source-parameters')

      this.classList.remove('loaded')
      this.classList.add('loading')

      const url = isKeepSourceParameters
        ? source.url
        : source.name + source.extension

      this.consumeSource(url)

      const loadListener = () => {
        this.classList.remove('error')
        this.classList.remove('loading')
        this.classList.add('loaded')

        if (!this.#isLazy && !this.#isFirstLoadHappened) {
          loading.setLoaded(this.#id, 1)
        }

        this.#isFirstLoadHappened = true
      }

      const errorListener = () => {
        this.classList.remove('loading')
        this.classList.add('error')

        if (!this.#isLazy && !this.#isFirstLoadHappened) {
          loading.setError(this.#id, url)
        }

        this.#isFirstLoadHappened = true
      }

      if (!this.#isLazy && !this.#isFirstLoadHappened) {
        loading.setTotal(this.#id, 1)
      }

      this.#consumerElement.onloadeddata = () => {
        loadListener()
      }
      this.#consumerElement.onload = () => {
        loadListener()
      }
      this.#consumerElement.onerror = errorListener
    } else {
      this.consumeSource(null)
    }
  }

  #intersectionListener = (entry: IntersectionObserverEntry) => {
    if (this.#isLazy) {
      if (!this.#intersectionHappened && entry.isIntersecting) {
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
      this.dispatchEvent(new CustomEvent('sourceRelease'))
    }
  }
}

declare global {
  interface HTMLElementEventMap {
    sourceCapture: CustomEvent
    sourceRelase: CustomEvent
  }
}
