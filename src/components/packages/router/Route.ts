// TODO: обновить все до уровня morph

import { isBrowser, isESClass } from '@packages/utils'

export type RouteModule = () => Promise<any>

export type RouteURLParams<T extends string = string> = Partial<{
  [key in T]: string
}>

export type RouteParameters<
  PathnameParams extends string = string,
  SearchParams extends string = string
> = {
  pathnameParams: RouteURLParams<PathnameParams>
  searchParams: RouteURLParams<SearchParams>
}

export class Route {
  #pattern: string
  #module: RouteModule
  #urlPattern: URLPattern
  #elementConstructor: CustomElementConstructor | null
  #element: HTMLElement | null
  #isActive: boolean
  #nest: HTMLElement | ShadowRoot | null
  #mutationObserver: MutationObserver = null!
  #permanentHeadNodes: Array<Node> = []
  #temporalHeadNodes: Array<Node> = []

  constructor(pattern: string, module: RouteModule) {
    this.#pattern = pattern
    this.#module = module
    this.#urlPattern = new URLPattern({ pathname: this.#pattern })
    this.#elementConstructor = null
    this.#element = null
    this.#isActive = false
    this.#nest = null

    if (isBrowser) {
      this.#mutationObserver = new MutationObserver((mutations) => {
        const mutation = mutations[0]

        mutation.addedNodes.forEach((addedNode) => {
          if (!this.#elementConstructor) {
            this.#permanentHeadNodes.push(addedNode)
          } else {
            this.#temporalHeadNodes.push(addedNode)
          }
        })
      })
    }
  }

  public get pattern() {
    return this.#pattern
  }

  public get urlPattern() {
    return this.#urlPattern
  }

  public get isActive() {
    return this.#isActive
  }

  public get element() {
    return this.#element
  }

  public get nest() {
    return this.#nest
  }

  public testPathname(pathname: string) {
    return this.urlPattern.test({ pathname: pathname })
  }

  public async render(
    containerElement: HTMLElement | ShadowRoot,
    pathname: string
  ) {
    this.#mutationObserver.observe(document.head, {
      childList: true,
      subtree: true,
    })

    if (!this.#elementConstructor) {
      const content = await this.#module()

      this.#temporalHeadNodes = [...this.#permanentHeadNodes]

      if (typeof content.default === 'function') {
        this.#elementConstructor = content.default

        if (isESClass(content.default)) {
          const name = 'e-' + this.#elementConstructor?.name.toLowerCase()

          if (!customElements.get(name)) {
            customElements.define(name, content.default)
          }
        }
      }
    } else {
      this.#permanentHeadNodes.forEach((node) => {
        document.head.appendChild(node)
      })
    }

    await this.#waitHeadNodesLoad()

    if (this.#elementConstructor) {
      const v = this.#urlPattern.exec({ pathname })
      const pathnameParams = v?.pathname.groups || {}
      const searchParams = Object.fromEntries(
        new URLSearchParams(location.search)
      )

      const routeParameters: RouteParameters<any, any> = {
        pathnameParams,
        searchParams,
      }

      this.#element = new (this
        .#elementConstructor as CustomElementConstructor)(routeParameters)

      containerElement.appendChild(this.#element!)

      this.#nest =
        this.#element!.querySelector<HTMLElement>('[data-nest]') ||
        this.#element!.shadowRoot?.querySelector<HTMLElement>('[data-nest]') ||
        this.#element!.shadowRoot ||
        this.#element!

      this.#isActive = true
    }

    this.#mutationObserver.disconnect()
  }

  public close() {
    this.#mutationObserver.disconnect()
    this.#element?.remove()
    this.#isActive = false

    this.#temporalHeadNodes.forEach((node) => document.head.removeChild(node))
    this.#temporalHeadNodes = []
  }

  public getAnchorElements() {
    let links: Array<HTMLAnchorElement> = []

    if (this.#element) {
      links = [...this.#element.querySelectorAll<HTMLAnchorElement>('a')]
    }

    if (this.#element?.shadowRoot) {
      links = [
        ...links,
        ...this.#element.shadowRoot.querySelectorAll<HTMLAnchorElement>('a'),
      ]
    }

    return links
  }

  async #waitHeadNodesLoad() {
    const nodes = this.#permanentHeadNodes.filter((node) => {
      if (node instanceof HTMLElement) {
        return (
          node.tagName === 'STYLE' ||
          node.tagName === 'SCRIPT' ||
          node.tagName === 'LINK'
        )
      }

      return false
    }) as Array<HTMLStyleElement | HTMLScriptElement | HTMLLinkElement>

    for await (const node of nodes) {
      await new Promise<void>((res) => {
        node.onload = () => {
          res()
        }
      })
    }
  }
}
