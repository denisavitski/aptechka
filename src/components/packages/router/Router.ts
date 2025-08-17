import { History } from '@packages/history'
import {
  LocalLinks,
  LocalLinksLinkOptions,
  LocalLinksOptions,
} from '@packages/local-links'
import { PageAnnouncerElement } from '@packages/page-announcer'
import { PageScroll } from '@packages/page-scroll'
import { normalizeBase, normalizeURL } from '@packages/utils'
import { URLPattern } from 'urlpattern-polyfill'
import { Route, RouteModule } from './Route'

// @ts-ignore
globalThis.URLPattern = URLPattern

export interface RouterPreprocessorEntry {
  url: URL
  resolve: () => void
  reject: () => void
}

export type RouterPreprocessor = (entry: RouterPreprocessorEntry) => void

export interface RouterPostprocessorEntry {
  url: URL
}

export type RouterPostprocessor = (entry: RouterPostprocessorEntry) => void

export type RouterURLModifier = (url: URL) => URL

export interface RouterNavigateOptions extends LocalLinksLinkOptions {}

export interface RouterOptions
  extends Pick<LocalLinksOptions, 'base' | 'trailingSlash' | 'includeAnchor'> {
  rootElement?: HTMLElement
  scrollSelector?: string
  beforeNavigation?: () => void | Promise<void>
  afterNavigation?: () => void | Promise<void>
  urlModifier?: RouterURLModifier
  preprocessor?: RouterPreprocessor
  postprocessor?: RouterPostprocessor
  viewTransition?: boolean
}

export class Router {
  #options: Omit<RouterOptions, 'rootElement'> &
    Pick<Required<RouterOptions>, 'rootElement' | 'base'> = null!

  #scroll: PageScroll = null!
  #links: LocalLinks = null!
  #history: History = null!

  #announcerElement: PageAnnouncerElement = null!
  #updateId = 0

  #routes: Array<Route> = []
  #lastRoute: Route | null = null

  constructor(options?: RouterOptions) {
    this.#options = {
      ...options,
      rootElement: options?.rootElement || document.body,
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

    this.#history = new History({
      onPop: (url) => {
        this.navigate(url)
      },
    })
  }

  public history() {
    return this.#history
  }

  public get scroll() {
    return scroll
  }

  public get routes() {
    return this.#routes
  }

  public run() {
    this.#sortRoutesByPathDepth()
    this.navigate(new URL(location.href), { revalidate: true })
  }

  public defineRoute(pattern: string, module: RouteModule) {
    const route = new Route(pattern, module)
    this.#routes.push(route)
  }

  public async navigate(url: string | URL, options?: RouterNavigateOptions) {
    const isBack = this.#history.isBack
    const updateId = ++this.#updateId

    let fullUrl = normalizeURL(url, {
      base: this.#options.base,
      trailingSlash: this.#options.trailingSlash,
    })

    if (this.#options.urlModifier) {
      fullUrl = this.#options.urlModifier(fullUrl)
    }

    if (!(await this.#runPreprocessor(fullUrl))) {
      return
    }

    if (this.#updateId !== updateId) {
      return
    }

    await this.#options.beforeNavigation?.()

    if (this.#updateId !== updateId) {
      return
    }

    const { activeRoutes, newRoutes, oldRoutes, keepRoutes } =
      this.#categorizeRoutes(fullUrl)

    this.#lastRoute = keepRoutes[keepRoutes.length - 1] ?? null

    if (!isBack) {
      this.#history.push(fullUrl)

      if (options?.keepScrollPosition ?? true) {
        this.#scroll.element.scrollTo({ top: 0, behavior: 'instant' })
      }
    }

    this.#announcerElement.create(document, fullUrl.pathname)

    if (this.#options.viewTransition && document.startViewTransition) {
      const v = document.startViewTransition(() => {
        return this.#renderNewRoutes(oldRoutes, newRoutes, fullUrl)
      })
      await v.finished
    } else {
      await this.#renderNewRoutes(oldRoutes, newRoutes, fullUrl)
    }

    this.#scroll.update()
    this.#links.update()
    this.#announcerElement.done()

    await this.#options.afterNavigation?.()
  }

  async #runPreprocessor(url: URL) {
    if (!this.#options.preprocessor) {
      return true
    }

    try {
      await new Promise<void>((resolve, reject) => {
        this.#options.preprocessor?.({ url: url, resolve, reject })
      })

      return true
    } catch (error) {
      console.error(error ?? 'Route change canceled')
      return false
    }
  }

  #categorizeRoutes(url: URL) {
    let leaf = url.pathname.replace(this.#options.base, '')

    if (!leaf.startsWith('/')) {
      leaf = `/${leaf}`
    }

    const activeRoutes = this.#routes.filter((route) => route.isActive)

    return {
      activeRoutes,
      newRoutes: this.#routes.filter(
        (route) => !activeRoutes.includes(route) && route.testPathname(leaf),
      ),
      oldRoutes: activeRoutes.filter((route) => !route.testPathname(leaf)),
      keepRoutes: activeRoutes.filter((route) => route.testPathname(leaf)),
    }
  }

  #closeOldRoutes(routes: Route[]) {
    routes.forEach((route) => route.close())
  }

  async #renderNewRoutes(
    oldRoutes: Array<Route>,
    routes: Array<Route>,
    url: URL,
  ) {
    this.#closeOldRoutes(oldRoutes)

    for (const route of routes) {
      const target = this.#lastRoute?.nest ?? this.#options.rootElement
      await route.render(target, url)
      this.#lastRoute = route
    }
  }

  #sortRoutesByPathDepth() {
    this.#routes.sort((a, b) => {
      const depthA = a.pattern.split('/').length
      const depthB = b.pattern.split('/').length
      return depthA - depthB
    })
  }
}
