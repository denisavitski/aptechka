import { historyManager } from '@packages/shared/historyManager'
import { isLocalUrl, NODE_TYPE_ELEMENT, normalizeURL } from '@packages/utils'

export interface LocalLinksOptions {
  base?: string
  trailingSlash?: boolean
  onClick?: (url: URL, options: LocalLinksLinkOptions) => void
  includeAnchor?:
    | ((element: HTMLAnchorElement, event: Event) => boolean)
    | undefined
}

export interface LocalLinksLinkOptions {
  keepScrollPosition?: boolean
  scrollLeft?: number
  scrollTop?: number
  cache?: boolean
  revalidate?: boolean
}

export class LocalLinks {
  #options: Partial<LocalLinksOptions>

  constructor(options: Partial<LocalLinksOptions>) {
    this.#options = options

    window.addEventListener('click', this.#clickListener)
  }

  public destroy() {
    window.removeEventListener('click', this.#clickListener)
  }

  public update() {
    document.querySelectorAll('a').forEach((link) => {
      const href = link.getAttribute('href')

      if (href) {
        const linkURL = normalizeURL(href, {
          base: this.#options.base,
          trailingSlash: this.#options.trailingSlash,
        })

        if (linkURL.pathname === location.pathname) {
          link.classList.add('current')
        } else {
          link.classList.remove('current')
        }
      } else {
        link.classList.remove('current')
      }
    })
  }

  #isElement(target: EventTarget | null): target is Element {
    return (target as Node)?.nodeType === NODE_TYPE_ELEMENT
  }

  #processClickEvent(e: Event) {
    const target = e.composedPath()[0]

    if (!this.#isElement(target)) {
      return
    }

    const anchorElement = target.closest('a')

    if (!anchorElement) {
      return
    }

    if (
      typeof this.#options.includeAnchor === 'function' &&
      !this.#options.includeAnchor(anchorElement, e)
    ) {
      return
    }

    if (anchorElement.closest('[data-router-ignore]')) {
      return
    }

    const { href } = anchorElement

    if (!isLocalUrl(href)) {
      return
    }

    const options: LocalLinksLinkOptions = {
      keepScrollPosition: 'keepScrollPosition' in anchorElement.dataset,
      cache: 'cache' in anchorElement.dataset,
      revalidate: 'revalidate' in anchorElement.dataset,
      scrollLeft: parseFloat(anchorElement.dataset.scrollLeft || '0'),
      scrollTop: parseFloat(anchorElement.dataset.scrollTop || '0'),
    }

    e.preventDefault()

    if (anchorElement.hasAttribute('data-back') && historyManager.size > 1) {
      history.back()
      return
    }

    return {
      url: normalizeURL(new URL(href), {
        base: this.#options.base,
        trailingSlash: this.#options.trailingSlash,
      }),
      options,
    }
  }

  #clickListener = (event: Event) => {
    const result = this.#processClickEvent(event)

    if (!result) {
      return
    }

    const { url, options = {} } = result

    if (!url) {
      return
    }

    this.#options.onClick?.(url, options)
  }
}
