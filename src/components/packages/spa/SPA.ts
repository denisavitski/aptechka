import { Cache } from '@packages/cache'
import {
  LocalLinks,
  LocalLinksLinkOptions,
  LocalLinksOptions,
} from '@packages/local-links'
import { PageAnnouncerElement } from '@packages/page-announcer'
import { PageScroll } from '@packages/page-scroll'
import { ScrollNavigator } from '@packages/scroll-kit/ScrollNavigator'
import { historyManager } from '@packages/shared/historyManager'
import {
  dispatchEvent,
  morph,
  normalizeBase,
  normalizeRelativeURLs,
  normalizeURL,
} from '@packages/utils'

export type SPAURLModifier = (url: URL) => URL

export interface SPAOptions
  extends Pick<LocalLinksOptions, 'base' | 'trailingSlash' | 'includeAnchor'> {
  scrollSelector?: string
  beforeDiff?: (
    newDocument: Document,
    signal: AbortSignal,
  ) => void | Promise<void>
  afterDiff?: (signal: AbortSignal) => void | Promise<void>
  viewTransition?: boolean
  urlModifier?: SPAURLModifier
}

export interface SPANavigateOptions extends LocalLinksLinkOptions {
  pushStateNoFetch?: boolean
  signal?: AbortSignal
}

export interface SPAEvents {
  spaBeforeFetch: CustomEvent<{ signal: AbortSignal }>
  spaAfterFetch: CustomEvent<{ signal: AbortSignal }>
  spaBeforeUpdate: CustomEvent<{ signal: AbortSignal }>
  spaAfterUpdate: CustomEvent<{ signal: AbortSignal }>
}

export interface SPANavigationHandle extends Promise<void> {
  signal: AbortSignal
  abort: () => void
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
          const navigation = this.navigate(url, options)
          navigation.signal.addEventListener('abort', () => {
            console.log('Navigation aborted')
          })
        },
      })
      this.#links.update()

      historyManager.addPopStateHandler((event) => {
        if (event.state?.data?.popover || event.previousState?.data?.popover) {
          return
        }

        this.#isBack = true
        const navigation = this.navigate(
          location.href.replace(location.origin, ''),
          {
            scrollValue: (event.state?.data?.scrollTop as number) || 0,
            pushStateNoFetch: event.state?.data?.pushStateNoFetch as boolean,
          },
        )

        navigation.signal.addEventListener('abort', () => {
          console.log('Popstate navigation aborted')
        })
      })
    }
  }

  public get scroll() {
    return this.#scroll
  }

  public navigate(
    url: URL | string,
    options?: SPANavigateOptions,
  ): SPANavigationHandle {
    const abortController = new AbortController()
    const signal = options?.signal || abortController.signal

    const navigationPromise = this.#navigateInternal(url, {
      ...options,
      signal,
    }).catch((error: unknown) => {
      if (error instanceof Error && error.name === 'AbortError') {
        throw error
      }
      console.error('Navigation failed:', error)
      throw error
    }) as Promise<void>

    const navigationHandle = Object.assign(navigationPromise, {
      signal,
      abort: () => abortController.abort(),
    })

    return navigationHandle
  }

  async #navigateInternal(
    url: URL | string,
    options?: SPANavigateOptions & { signal: AbortSignal },
  ) {
    let isBack = this.#isBack
    this.#isBack = false
    const updateId = ++this.#updateId
    const { signal } = options || { signal: new AbortController().signal }

    let fullUrl = normalizeURL(url, {
      base: this.#options.base,
      trailingSlash: this.#options.trailingSlash,
    })

    if (this.#options.urlModifier) {
      fullUrl = this.#options.urlModifier(fullUrl)
    }

    if (options?.pushStateNoFetch) {
      if (!isBack) {
        historyManager.pushState(fullUrl, { pushStateNoFetch: true })
      }

      return
    }

    signal.throwIfAborted()

    dispatchEvent(document, 'spaBeforeFetch', {
      custom: true,
      detail: { signal },
    })

    let contents: string | void = this.#cache.get(fullUrl.toString())

    if (!contents || options?.revalidate) {
      try {
        const response = await fetch(`${fullUrl}`, {
          headers: {
            'X-SPA': 'true',
          },
          signal,
        })

        contents = await response.text()
      } catch (error: unknown) {
        if (error instanceof Error && error.name === 'AbortError') {
          throw error
        }
        window.location.assign(fullUrl)
        return
      }
    }

    signal.throwIfAborted()

    dispatchEvent(document, 'spaAfterFetch', {
      custom: true,
      detail: { signal },
    })

    if (!contents) {
      return
    }

    if (options?.cache) {
      this.#cache.set(fullUrl.toString(), contents)
    }

    signal.throwIfAborted()

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

    signal.throwIfAborted()

    const html = this.#domParser.parseFromString(contents, 'text/html')
    normalizeRelativeURLs(html, fullUrl)

    await this.#options.beforeDiff?.(html, signal)

    signal.throwIfAborted()

    if (this.#updateId !== updateId) {
      return
    }

    dispatchEvent(document, 'spaBeforeUpdate', {
      custom: true,
      detail: { signal },
    })

    let title = html.querySelector('title')?.textContent

    if (title) {
      document.title = title
    } else {
      const h1 = document.querySelector('h1')
      title = h1?.innerText ?? h1?.textContent ?? fullUrl.pathname
    }

    signal.throwIfAborted()

    this.#announcerElement.create(html, title)

    const updateDone = () => {
      this.#scroll.update()
      this.#links.update()
      this.#announcerElement.done()

      if (!options?.keepScrollPosition) {
        ScrollNavigator.scrollToElement(options?.scrollValue || 0, {
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

      signal.throwIfAborted()

      updateDone()

      await v.finished
    } else {
      await morph(document, html)

      signal.throwIfAborted()

      updateDone()
    }

    await this.#options.afterDiff?.(signal)

    signal.throwIfAborted()

    dispatchEvent(document, 'spaAfterUpdate', {
      custom: true,
      detail: { signal },
    })
  }
}

declare global {
  interface DocumentEventMap extends SPAEvents {}
}
