import { Cache } from '@packages/cache'
import {
  LocalLinks,
  LocalLinksLinkOptions,
  LocalLinksOptions,
} from '@packages/local-links'
import { PageAnnouncerElement } from '@packages/page-announcer'
import { PageScroll } from '@packages/page-scroll'
import { historyManager } from '@packages/shared/historyManager'
import {
  dispatchEvent,
  morph,
  normalizeBase,
  normalizeRelativeURLs,
  normalizeURL,
  scrollToElement,
} from '@packages/utils'

export type SPAURLModifier = (url: URL) => URL

export interface SPAOptions
  extends Pick<LocalLinksOptions, 'base' | 'trailingSlash' | 'includeAnchor'> {
  scrollSelector?: string
  beforeDiff?: (newDocument: Document) => void | Promise<void>
  afterDiff?: () => void | Promise<void>
  viewTransition?: boolean
  urlModifier?: SPAURLModifier
}

export interface SPANavigateOptions extends LocalLinksLinkOptions {}

export interface SPAEvents {
  spaBeforeFetch: CustomEvent
  spaAfterFetch: CustomEvent
  spaBeforeUpdate: CustomEvent
  spaAfterUpdate: CustomEvent
}

export class SPA {
  public static instance: SPA = null!

  #cache = new Cache()
  #domParser = new DOMParser()
  #options: SPAOptions = null!

  #scroll: PageScroll = null!
  #links: LocalLinks = null!

  #announcerElement: PageAnnouncerElement = null!
  #updateId = 0

  #isBack = false

  constructor(options?: SPAOptions) {
    if (!SPA.instance) {
      SPA.instance = this

      this.#options = {
        ...options,
        base: normalizeBase(options?.base),
      }

      this.#announcerElement = new PageAnnouncerElement()

      this.#scroll = new PageScroll(this.#options.scrollSelector)
      this.#scroll.update()

      this.#links = new LocalLinks({
        base: this.#options.base,
        trailingSlash: this.#options.trailingSlash,
        includeAnchor: options?.includeAnchor,
        onClick: (url, options) => {
          try {
            this.navigate(url, options)
          } catch (e) {
            window.location.assign(url)
          }
        },
      })
      this.#links.update()

      historyManager.addPopStateHandler((event) => {
        if (event.state?.data?.popover || event.previousState?.data?.popover) {
          return
        }

        this.#isBack = true
        this.navigate(location.href.replace(location.origin, ''), {
          scrollValue: (event.state?.data?.scrollTop as number) || 0,
        })
      })
    }
  }

  public get scroll() {
    return this.#scroll
  }

  public async navigate(url: URL | string, options?: SPANavigateOptions) {
    let isBack = this.#isBack
    this.#isBack = false
    const updateId = ++this.#updateId

    let fullUrl = normalizeURL(url, {
      base: this.#options.base,
      trailingSlash: this.#options.trailingSlash,
    })

    if (this.#options.urlModifier) {
      fullUrl = this.#options.urlModifier(fullUrl)
    }

    dispatchEvent(document, 'spaBeforeFetch', {
      custom: true,
    })

    let contents: string | void = this.#cache.get(fullUrl.toString())

    if (!contents || options?.revalidate) {
      contents = await fetch(`${fullUrl}`, {
        headers: {
          'X-SPA': 'true',
        },
      })
        .then((res) => res.text())
        .catch(() => {
          window.location.assign(fullUrl)
        })
    }

    dispatchEvent(document, 'spaAfterFetch', {
      custom: true,
    })

    if (!contents) {
      return
    }

    if (options?.cache) {
      this.#cache.set(fullUrl.toString(), contents)
    }

    if (this.#updateId !== updateId) {
      return
    }

    if (!isBack) {
      historyManager.updateCurrentStateData({
        scrollTop: this.#scroll.y,
      })
      historyManager.pushState(fullUrl)
    } else {
      historyManager.updatePreviousStateData({
        scrollTop: this.#scroll.y,
      })
    }

    const html = this.#domParser.parseFromString(contents, 'text/html')
    normalizeRelativeURLs(html, fullUrl)

    await this.#options.beforeDiff?.(html)

    if (this.#updateId !== updateId) {
      return
    }

    dispatchEvent(document, 'spaBeforeUpdate', {
      custom: true,
    })

    let title = html.querySelector('title')?.textContent

    if (title) {
      document.title = title
    } else {
      const h1 = document.querySelector('h1')
      title = h1?.innerText ?? h1?.textContent ?? fullUrl.pathname
    }

    this.#announcerElement.create(html, title)

    const updateDone = () => {
      this.#scroll.update()
      this.#links.update()
      this.#announcerElement.done()

      if (!options?.keepScrollPosition) {
        scrollToElement(options?.scrollValue || 0, {
          scrollElement: this.#scroll.element,
          behavior: 'instant',
          ...options?.scrollOptions,
        })
      }
    }

    if (this.#options.viewTransition && document.startViewTransition) {
      const v = document.startViewTransition(() => {
        return morph(document, html)
      })

      await v.updateCallbackDone

      updateDone()

      await v.finished
    } else {
      await morph(document, html)

      updateDone()
    }

    await this.#options.afterDiff?.()

    dispatchEvent(document, 'spaAfterUpdate', {
      custom: true,
    })
  }
}

declare global {
  interface DocumentEventMap extends SPAEvents {}
}
