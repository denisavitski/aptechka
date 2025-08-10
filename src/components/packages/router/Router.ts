import { Notifier } from '@packages/notifier'
import {
  changeHistory,
  ChangeHistoryAction,
  normalizeBase,
  splitPath,
  type SplitPathResult,
} from '@packages/utils'
import { URLPattern } from 'urlpattern-polyfill'
import { Link } from './Link'
import { Route, RouteModule } from './Route'

// @ts-ignore
globalThis.URLPattern = URLPattern

export interface RouterPreprocessorEntry {
  path: SplitPathResult
  resolve: () => void
  reject: () => void
}

export type RouterPreprocessor = (entry: RouterPreprocessorEntry) => void

export interface RouterPostprocessorEntry {
  pathname: string
}

export type RouterPostprocessor = (entry: RouterPostprocessorEntry) => void

export interface RouterAfterNavigationEntry {
  pathname: string
}

export type RouterAfterNavigationCallback = (
  entry: RouterAfterNavigationEntry,
) => void

export interface RouterNavigateOptions {
  historyAction?: ChangeHistoryAction
  revalidate?: boolean
}

export interface RouterParameters {
  rootElement?: HTMLElement
  base?: string
}

export class Router {
  #rootElement: HTMLElement
  #base: string
  #routes: Route[] = []
  #lastRoute: Route | null = null
  #links: Link[] = []
  #candidateURL: SplitPathResult | null = null
  #previousURL: SplitPathResult | null = null
  #currentURL: SplitPathResult = null!
  #navigationEvent = new Notifier<RouterAfterNavigationCallback>()

  public preprocessor?: RouterPreprocessor
  public postprocessor?: RouterPostprocessor

  constructor(parameters?: RouterParameters) {
    this.#base = parameters?.base ? normalizeBase(parameters.base) : '/'
    this.#rootElement = parameters?.rootElement ?? document.body
    this.#currentURL = this.normalizePath(
      location.pathname + location.search + location.hash,
    )

    this.#setupEventListeners()
  }

  public get candidateURL() {
    return this.#candidateURL
  }

  public get currentURL() {
    return this.#currentURL
  }

  public get routes() {
    return this.#routes
  }

  public get links() {
    return this.#links
  }

  public run() {
    this.#sortRoutesByPathDepth()
    this.navigate(this.#currentURL.path, { revalidate: true })
  }

  public destroy() {
    removeEventListener('popstate', this.#popStateListener)
    this.#cleanupExistingLinks()
    this.#routes.forEach((route) => route.close())
    this.#navigationEvent.close()
  }

  public navigationEvent(callback: RouterAfterNavigationCallback): () => void {
    return this.#navigationEvent.subscribe(callback)
  }

  public defineRoute(pattern: string, module: RouteModule) {
    const route = new Route(pattern, module)
    this.#routes.push(route)
  }

  public async navigate(path: string, options?: RouterNavigateOptions) {
    const normalizedURL = this.normalizePath(path)

    if (
      !options?.revalidate &&
      (this.#candidateURL?.pathname === normalizedURL.pathname ||
        this.#currentURL.pathname === normalizedURL.pathname)
    ) {
      if (this.#currentURL?.parameters !== normalizedURL.parameters) {
        this.#previousURL = this.#currentURL
        this.#currentURL = normalizedURL

        changeHistory({
          action:
            this.#currentURL?.hash !== normalizedURL.hash
              ? 'replace'
              : options?.historyAction || 'push',
          pathname: normalizedURL.pathname,
          searchParameters: normalizedURL.parameters,
          hash: normalizedURL.hash,
        })
      }

      this.#links.forEach((link) => {
        link.checkCurrent(normalizedURL)
      })

      return
    }

    this.#candidateURL = normalizedURL

    if (!(await this.#runPreprocessor(this.#candidateURL))) {
      return
    }

    if (normalizedURL.path !== this.#candidateURL.path) {
      return
    }

    await this.#processRouteChange(this.#candidateURL, options)
  }

  public normalizePath(path: string) {
    return splitPath(path, { base: this.#base })
  }

  #setupEventListeners() {
    addEventListener('popstate', this.#popStateListener)
  }

  async #runPreprocessor(parts: SplitPathResult) {
    if (!this.preprocessor) return true

    try {
      await new Promise<void>((resolve, reject) => {
        this.preprocessor?.({ path: parts, resolve, reject })
      })
      return true
    } catch (error) {
      console.error(error ?? 'Route change canceled')
      return false
    }
  }

  async #processRouteChange(
    url: SplitPathResult,
    options: RouterNavigateOptions = {},
  ): Promise<void> {
    const { activeRoutes, newRoutes, oldRoutes, keepRoutes } =
      this.#categorizeRoutes(url.leaf)

    this.#lastRoute = keepRoutes[keepRoutes.length - 1] ?? null

    this.#closeOldRoutes(oldRoutes)

    this.#currentURL = url

    changeHistory({
      action: options.historyAction || 'push',
      pathname: url.pathname,
      searchParameters: url.parameters,
      hash: url.hash,
    })

    await this.#renderNewRoutes(newRoutes, url.leaf)

    this.#updateLinks()
    this.#notifyNavigationComplete(url.pathname)
  }

  #categorizeRoutes(leaf: string) {
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

  async #renderNewRoutes(routes: Route[], leaf: string): Promise<void> {
    for (const route of routes) {
      const target = this.#lastRoute?.nest ?? this.#rootElement
      await route.render(target, leaf)
      this.#lastRoute = route
    }
  }

  #notifyNavigationComplete(pathname: string) {
    this.postprocessor?.({ pathname })
    this.#navigationEvent.notify({ pathname })
  }

  #sortRoutesByPathDepth() {
    this.#routes.sort((a, b) => {
      const depthA = a.pattern.split('/').length
      const depthB = b.pattern.split('/').length
      return depthA - depthB
    })
  }

  #updateLinks() {
    this.#cleanupExistingLinks()
    this.#createNewLinks()
  }

  #cleanupExistingLinks() {
    this.#links.forEach((link) => link.destroy())
    this.#links = []
  }

  #createNewLinks() {
    const activeRoutes = this.#routes.filter((route) => route.isActive)
    const anchors = this.#collectAnchorElements(activeRoutes)

    this.#links = anchors.map((element) => new Link(this, element))
  }

  #collectAnchorElements(activeRoutes: Route[]) {
    const rootAnchors = Array.from(
      this.#rootElement.querySelectorAll<HTMLAnchorElement>('a'),
    )
    const routeAnchors = activeRoutes.flatMap((route) =>
      route.getAnchorElements(),
    )

    return Array.from(
      new Set(
        [...rootAnchors, ...routeAnchors].filter((a) =>
          a.getAttribute('href')?.startsWith('/'),
        ),
      ),
    )
  }

  #popStateListener = (event: PopStateEvent) => {
    if (event.state?.path) {
      this.navigate(event.state.path, {
        historyAction: 'none',
      })
    }
  }
}
