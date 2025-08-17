import { render } from '@packages/jsx/render'
import { isESClass } from '@packages/utils'

export type RouteModule = () => Promise<{ default?: RouteComponent }>
export type RouteComponent = CustomElementConstructor | JSX.Component
export type HeadNode = HTMLStyleElement | HTMLScriptElement | HTMLLinkElement

export interface RouteParameters {
  urlPatternResult: URLPatternResult
}

export class Route {
  readonly #pattern: string
  readonly #module: RouteModule
  readonly #urlPattern: URLPattern

  #elementConstructor: RouteComponent | null = null
  #elementInstance: HTMLElement | null = null
  #isActive = false
  #nestTarget: Element | ShadowRoot | null = null

  readonly #mutationObserver: MutationObserver
  #permanentHeadNodes: Node[] = []
  #temporalHeadNodes: Node[] = []

  constructor(pattern: string, module: RouteModule) {
    this.#pattern = pattern
    this.#module = module
    this.#urlPattern = new URLPattern({ pathname: this.#pattern })

    this.#mutationObserver = new MutationObserver(
      this.#handleHeadMutations.bind(this),
    )
  }

  public get pattern() {
    return this.#pattern
  }

  public get isActive() {
    return this.#isActive
  }

  public get element() {
    return this.#elementInstance
  }

  public get nest() {
    return this.#nestTarget
  }

  public testPathname(pathname: string) {
    return this.#urlPattern.test({ pathname })
  }

  public async render(container: Element | ShadowRoot, url: URL) {
    this.#mutationObserver.observe(document.head, {
      childList: true,
      subtree: true,
    })

    if (!this.#elementConstructor) {
      await this.#initializeRouteModule()
    } else {
      this.#appendPermanentHeadNodes()
    }

    await this.#waitForHeadNodesLoad()

    if (this.#elementConstructor) {
      await this.#renderRouteComponent(container, url)
    }

    this.#mutationObserver.disconnect()
  }

  public close() {
    this.#cleanup()
  }

  async #initializeRouteModule() {
    const content = await this.#module()
    this.#temporalHeadNodes = [...this.#permanentHeadNodes]

    if (typeof content.default === 'function') {
      this.#elementConstructor = content.default
    }
  }

  #appendPermanentHeadNodes() {
    this.#permanentHeadNodes.forEach((node) => {
      document.head.appendChild(node.cloneNode(true))
    })
  }

  async #renderRouteComponent(container: Element | ShadowRoot, url: URL) {
    const urlPatternResult = this.#urlPattern.exec({ pathname: url.pathname })
    const routeParams: RouteParameters = { urlPatternResult: urlPatternResult! }

    if (isESClass(this.#elementConstructor!)) {
      this.#elementInstance = new (this
        .#elementConstructor as CustomElementConstructor)(routeParams)
      container.appendChild(this.#elementInstance)
    } else {
      this.#elementInstance = render(
        container,
        this.#elementConstructor as JSX.Component,
        routeParams,
      )
    }

    this.#findNestTarget()
    this.#isActive = true
  }

  #findNestTarget() {
    if (!this.#elementInstance) return

    this.#nestTarget =
      this.#elementInstance.querySelector('[data-nest]') ||
      this.#elementInstance.shadowRoot?.querySelector('[data-nest]') ||
      this.#elementInstance.shadowRoot ||
      this.#elementInstance
  }

  #cleanup() {
    this.#mutationObserver.disconnect()
    this.#elementInstance?.remove()
    this.#isActive = false

    this.#removeTemporalHeadNodes()
  }

  #removeTemporalHeadNodes() {
    this.#temporalHeadNodes.forEach((node) => {
      if (node.parentNode === document.head) {
        document.head.removeChild(node)
      }
    })
    this.#temporalHeadNodes = []
  }

  #handleHeadMutations(mutations: MutationRecord[]) {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!this.#elementConstructor) {
          this.#permanentHeadNodes.push(node)
        } else {
          this.#temporalHeadNodes.push(node)
        }
      })
    })
  }

  async #waitForHeadNodesLoad() {
    const loadableNodes = this.#permanentHeadNodes.filter(this.#isLoadableNode)

    await Promise.all(
      loadableNodes.map(
        (node) =>
          new Promise<void>((resolve) => {
            if (this.#isLoadableNode(node)) {
              node.onload = () => resolve()
            } else {
              resolve()
            }
          }),
      ),
    )
  }

  #isLoadableNode(node: Node): node is HeadNode {
    return (
      node instanceof HTMLElement &&
      (node.tagName === 'STYLE' ||
        node.tagName === 'SCRIPT' ||
        node.tagName === 'LINK')
    )
  }
}
