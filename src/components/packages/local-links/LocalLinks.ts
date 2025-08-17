import { isLocalUrl, NODE_TYPE_ELEMENT, normalizeURL } from '@packages/utils'

export interface LocalLinksOptions {
  base?: string
  trailingSlash?: boolean
  onClick?: (url: URL, options: LocalLinksLinkOptions) => void
  includeAnchor?: ((element: HTMLAnchorElement) => boolean) | undefined
}

export interface LocalLinksLinkOptions {
  keepScrollPosition?: boolean
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
      const linkURL = normalizeURL(link.getAttribute('href')!, {
        base: this.#options.base,
        trailingSlash: this.#options.trailingSlash,
      })

      if (linkURL.pathname === location.pathname) {
        link.classList.add('current')
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
      !this.#options.includeAnchor(anchorElement)
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
    event.preventDefault()

    const { url, options = {} } = this.#processClickEvent(event) ?? {}

    if (!url) {
      return
    }

    event.preventDefault()

    this.#options.onClick?.(url, options)
  }
}
