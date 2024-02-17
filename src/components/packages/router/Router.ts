import { URLPattern } from 'urlpattern-polyfill'
import { Notifier } from '@packages/notifier'
import { isBrowser, debounce } from '@packages/utils'
import { Route, RouteModule } from './Route'
import { Link } from './Link'

// @ts-ignore
globalThis.URLPattern = URLPattern

export interface RouterPreprocessorEntry {
  pathname: string
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
  entry: RouterAfterNavigationEntry
) => void

export type RouterHistoryAction = 'push' | 'replace' | 'none'

export interface RouterParameters {
  rootElement?: HTMLElement
  base?: string
}

export class Router {
  public static active: Router

  #rootElement: HTMLElement = null!
  #base: string
  #routes: Array<Route> = []
  #lastRoute: Route | null = null
  #links: Array<Link> = []
  #candidatePathname: string | undefined
  #currentPathname: string = null!

  #navigationEvent = new Notifier<RouterAfterNavigationCallback>()

  public preprocessor?: RouterPreprocessor
  public postprocessor?: RouterPostprocessor

  constructor(parameters?: RouterParameters) {
    this.#base = parameters?.base || ''

    Router.active = this

    if (isBrowser) {
      this.#rootElement = parameters?.rootElement || document.body
      addEventListener('popstate', this.#popStateListener)
    }
  }

  public get currentPathname() {
    return this.#currentPathname
  }

  public get candidatePathname() {
    return this.#candidatePathname
  }

  public get routes() {
    return this.#routes
  }

  public navigationEvent(callback: RouterAfterNavigationCallback) {
    return this.#navigationEvent.subscribe(callback)
  }

  public defineRoute(pattern: string, module: RouteModule) {
    const route = new Route(pattern, module)
    this.#routes.push(route)
    this.#start()
  }

  public async navigate(
    pathname: string,
    action: RouterHistoryAction = 'push'
  ) {
    if (
      this.#candidatePathname === pathname ||
      this.#currentPathname === pathname
    ) {
      return
    }

    Router.active = this

    this.#candidatePathname = pathname

    const activeRoutes = this.#routes.filter((r) => r.isActive)

    const newRoutes = this.#routes.filter(
      (r) => !activeRoutes.includes(r) && r.testPathname(pathname)
    )

    const oldRoutes = activeRoutes.filter((r) => !r.testPathname(pathname))
    const keepRoutes = activeRoutes.filter((r) => r.testPathname(pathname))

    let isOkToSwitch = true

    if (this.preprocessor) {
      try {
        await new Promise<void>((resolve, reject) => {
          this.preprocessor?.({ pathname, resolve, reject })
        })
      } catch (e: any) {
        if (e) {
          console.error(e)
        } else {
          console.log('Route change canceled')
        }
        isOkToSwitch = false
      }
    }

    if (isOkToSwitch && this.#candidatePathname === pathname) {
      this.#lastRoute = keepRoutes[keepRoutes.length - 1]

      oldRoutes.forEach((r) => {
        r.close()
      })

      this.#currentPathname = pathname

      for await (const route of newRoutes) {
        await route.render(
          this.#lastRoute?.outlet || this.#rootElement,
          pathname
        )
        this.#lastRoute = route
      }

      const fullPathname = this.#base + pathname + location.search

      if (action === 'push') {
        history.pushState(fullPathname, '', fullPathname)
      } else if (action === 'replace') {
        history.replaceState(fullPathname, '', fullPathname)
      }

      this.#updateLinks()

      this.postprocessor?.({ pathname })
      this.#navigationEvent.notify({ pathname })
    }
  }

  #start = debounce(() => {
    const slashesLength = (pathname: string) => {
      return pathname.split('/').length
    }

    this.#routes = this.#routes.sort((a, b) => {
      return slashesLength(a.pattern) - slashesLength(b.pattern)
    })

    this.navigate(location.pathname.replace(this.#base, ''))
  }, 0)

  #updateLinks() {
    const activeRoutes = this.#routes.filter((r) => r.isActive)

    const anchorElements = Array.from(
      new Set(
        [
          ...this.#rootElement.querySelectorAll('a'),
          ...activeRoutes.map((r) => r.getAnchorElements()).flat(),
        ].filter((a) => a.getAttribute('href')?.startsWith('/'))
      )
    )

    this.#links.forEach((link) => {
      link.destroy()
    })

    this.#links = anchorElements.map((element) => {
      const link = new Link(this, element)

      return link
    })
  }

  #popStateListener = (event: PopStateEvent) => {
    if (event.state) {
      this.navigate(event.state, 'none')
    }
  }
}
