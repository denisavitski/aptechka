import {
  ChangeHistoryAction,
  ElementOrSelector,
  changeHistory,
  dispatchEvent,
  isBrowser,
  normalizeBase,
  requestIdleCallback,
  scrollToElement,
  splitPath,
  wait,
} from '@packages/utils'

import './MorphAnnouncer'
import { MorphLink } from './MorphLink'

import { MorphAnnouncer } from './MorphAnnouncer'

import { MorphRoute } from './MorphRoute'

export interface MorphOptions {
  base: string
  waitForHeadToLoad: boolean
  cachePages: boolean
  trailingSlash: boolean
  scrollSelector: string
  morphInsideScrollContainer: boolean
}

export interface MorphNavigationEntry {
  pathname: string
}

export interface MorphTransitionEntry extends MorphNavigationEntry {}

export interface MorphChildrenActionEntry {
  morphElement: HTMLElement
  pathname: string
}

export interface MorphPreprocessorEntry extends MorphNavigationEntry {
  resolve: () => void
  reject: () => void
}

export type MorphPreprocessor = (entry: MorphPreprocessorEntry) => void

export type MorphNavigationCallback = (entry: MorphNavigationEntry) => void

export type MorphPathnameModifier = (pathname: string) => string

export interface MorphNavigateOptions {
  historyAction?: ChangeHistoryAction
  centerScroll?: boolean
  offsetScroll?: number | ElementOrSelector<HTMLElement>
  revalidate?: boolean
  keepSearchParameters?: boolean
}

export interface MorphScrollDetail {
  left: number
  top: number
}

export interface MorphEvents {
  morphStart: CustomEvent<MorphTransitionEntry>
  morphComplete: CustomEvent<MorphTransitionEntry>
  morphNewChildrenAdded: CustomEvent<MorphChildrenActionEntry>
  morphOldChildrenRemoved: CustomEvent<MorphChildrenActionEntry>
  morphScroll: CustomEvent<MorphScrollDetail>
}

export interface MorphGetRouteOptions {
  searchParameters?: string
  revalidate?: boolean
}

interface ScrollToElementOptions
  extends Pick<MorphNavigateOptions, 'centerScroll' | 'offsetScroll'> {
  behavior?: ScrollBehavior
}

export class Morph {
  public static instance: Morph = null!

  public preprocessor?: MorphPreprocessor
  public pathnameModifier?: MorphPathnameModifier

  #options: MorphOptions = null!
  #morphElements: Array<HTMLElement> = null!
  #links: Array<MorphLink> = []
  #domParser: DOMParser = new DOMParser()
  #candidatePathname: string | undefined
  #currentPathname: string = null!
  #previousPathname: string | undefined = undefined
  #promises: Array<Promise<void>> = []
  #isPopstateNavigation = false
  #currentScrollElement: HTMLElement = null!
  #routes = new Map<string, MorphRoute>()
  #announcer: MorphAnnouncer = null!

  constructor(parameters?: Partial<MorphOptions>) {
    if (isBrowser && !Morph.instance) {
      Morph.instance = this

      this.#options = {
        base: normalizeBase(parameters?.base),
        waitForHeadToLoad:
          parameters?.waitForHeadToLoad === false ? false : true,
        cachePages: parameters?.cachePages === false ? false : true,
        trailingSlash: parameters?.trailingSlash || false,
        scrollSelector: parameters?.scrollSelector || 'body',
        morphInsideScrollContainer:
          parameters?.morphInsideScrollContainer || false,
      }

      this.#morphElements = this.#getMorphElements(document.body)

      const normalizedPath = this.normalizePath(
        location.pathname + location.hash
      )

      this.#currentPathname = normalizedPath.pathname

      this.#routes.set(
        this.#currentPathname,
        new MorphRoute(this, this.#currentPathname, document)
      )

      document.documentElement.setAttribute(
        'data-current-pathname',
        this.#currentPathname
      )

      document.documentElement.setAttribute(
        'data-current-leaf',
        normalizedPath.leaf
      )

      this.findLinks()

      addEventListener('popstate', this.#popStateListener)

      changeHistory({
        action: 'replace',
        pathname: this.#currentPathname,
        searchParameters: normalizedPath.parameters || location.search,
        hash: normalizedPath.hash,
      })

      this.#announcer = new MorphAnnouncer()

      this.#updateCurrentScrollElement(document)
    }
  }

  public get currentPathname() {
    return this.#currentPathname
  }

  public get previousPathname() {
    return this.#previousPathname
  }

  public get links() {
    return this.#links
  }

  public get scrollElement() {
    return this.#currentScrollElement
  }

  public get isPopstateNavigation() {
    return this.#isPopstateNavigation
  }

  public normalizePath(path: string) {
    return splitPath(path, {
      base: this.#options.base,
      trailingSlash: this.#options.trailingSlash,
    })
  }

  public async prefetch(path: string, revalidate?: boolean) {
    const parts = this.normalizePath(path)

    this.#getRoute(parts.pathname, {
      searchParameters: parts.parameters,
      revalidate,
    })
  }

  public async navigate(
    path: string,
    {
      historyAction = 'push',
      centerScroll,
      offsetScroll,
      revalidate,
      keepSearchParameters,
    }: MorphNavigateOptions = {}
  ) {
    if (this.#promises.length) {
      return
    }

    const parts = this.normalizePath(this.pathnameModifier?.(path) || path)

    let { pathname, hash, parameters, leaf } = parts

    if (
      this.#candidatePathname === pathname ||
      this.#currentPathname === pathname
    ) {
      if (!this.#isPopstateNavigation) {
        this.#tryScrollToElement(hash || 0, {
          centerScroll,
          offsetScroll,
          behavior: 'smooth',
        })
      }

      return
    }

    this.#candidatePathname = pathname

    this.#links.forEach((link) => {
      link.checkCurrent(pathname)
    })

    try {
      let preprocessedSuccesfully = true

      if (this.preprocessor) {
        try {
          await new Promise<void>((resolve, reject) => {
            this.preprocessor?.({
              pathname,
              resolve,
              reject,
            })
          })
        } catch (e: any) {
          if (e) {
            console.error(e)
          } else {
            console.log('Route change canceled')
          }
          preprocessedSuccesfully = false
        }
      }

      if (!preprocessedSuccesfully || this.#candidatePathname !== pathname) {
        this.#links.forEach((link) => {
          link.checkCurrent(this.#currentPathname)
        })

        return
      }

      const currentRoute = await this.#getRoute(this.#currentPathname)
      const fetchedRoute = await this.#getRoute(pathname, {
        searchParameters: parameters,
        revalidate,
      })

      if (this.#candidatePathname !== pathname) {
        this.#links.forEach((link) => {
          link.checkCurrent(this.#currentPathname)
        })

        return
      }

      currentRoute.saveScrollState()
      currentRoute.saveDocumentState()

      if (!this.#isPopstateNavigation) {
        fetchedRoute.clearScrollState()
        fetchedRoute.clearDocumentState()
      }

      fetchedRoute.cloneDocument()

      this.#announcer.textContent = fetchedRoute.title

      document.body.appendChild(this.#announcer)

      const transitionDetail: MorphTransitionEntry = {
        pathname,
      }

      dispatchEvent(document, 'morphStart', {
        detail: transitionDetail,
      })

      const currentHeadChildren = Array.from(document.head.children)
      const newHeadChildren = Array.from(fetchedRoute.document.head.children)

      const identicalHeadChildren = this.#intersectElements(
        currentHeadChildren,
        newHeadChildren
      )

      const removeHeadChildren = this.#excludeElements(
        currentHeadChildren,
        identicalHeadChildren
      )

      const addHeadChildren = this.#excludeElements(
        newHeadChildren,
        identicalHeadChildren
      )

      addHeadChildren.forEach((child, index) => {
        if (child.tagName === 'SCRIPT' && child.getAttribute('src')) {
          const newScriptTag = document.createElement('script')
          newScriptTag.type = 'module'
          newScriptTag.src = child.getAttribute('src')!
          addHeadChildren[index] = newScriptTag
        }
      })

      addHeadChildren.forEach((child) => {
        document.head.appendChild(child)
      })

      const elementsWithLoad = addHeadChildren.filter((child) => {
        if (child.hasAttribute('data-no-waiting')) {
          return false
        } else if (this.#isElementEmitsLoadEvent(child)) {
          return true
        }
      }) as Array<HTMLLinkElement>

      if (this.#options.waitForHeadToLoad && elementsWithLoad.length) {
        await new Promise<void>(async (res) => {
          let counter = 0

          for await (const element of elementsWithLoad) {
            element.onload = () => {
              counter++

              if (counter === elementsWithLoad.length) {
                res()
              }
            }
          }
        })
      }

      await wait(10)

      const oldElementsWithLoadEvent: Array<Element> = []

      removeHeadChildren.forEach((child) => {
        if (child.hasAttribute('data-permanent')) {
          return
        }

        if (this.#isElementEmitsLoadEvent(child)) {
          oldElementsWithLoadEvent.push(child)
        } else {
          child.remove()
        }
      })

      const newMorphElements = this.#getMorphElements(
        fetchedRoute.document.body as HTMLElement
      )

      if (!this.#options.morphInsideScrollContainer) {
        this.#updateCurrentScrollElement(fetchedRoute.document)
      }

      document.documentElement.setAttribute('data-current-pathname', pathname)
      document.documentElement.setAttribute('data-current-leaf', leaf)

      changeHistory({
        action: historyAction,
        pathname,
        searchParameters:
          parameters || (keepSearchParameters ? location.search : ''),
        hash,
      })

      this.#announcer.remove()

      this.#previousPathname = this.#currentPathname
      this.#currentPathname = pathname

      this.#morphElements.forEach((morphElement, i) => {
        const newMorphElement = newMorphElements[i]!

        const duration =
          getComputedStyle(morphElement).getPropertyValue('--morph-duration')

        const newMorphElementChildNodes = [...newMorphElement.childNodes]

        if (duration) {
          const currentMorphElementChildNodes = [...morphElement.childNodes]

          currentMorphElementChildNodes.forEach((element) => {
            if (element instanceof HTMLElement) {
              this.destroyOldLinks(element)
              element.classList.add('old')
            }
          })

          newMorphElementChildNodes.forEach((element) => {
            if (element instanceof HTMLElement) {
              this.findNewLinks(element)
              element.classList.add('new')
            }
          })

          morphElement.prepend(...newMorphElementChildNodes)

          requestIdleCallback(() => {
            newMorphElementChildNodes.forEach((element) => {
              if (element instanceof HTMLElement) {
                element.classList.add('in')
              }
            })
          })

          const detail: MorphChildrenActionEntry = {
            morphElement,
            pathname,
          }

          dispatchEvent(document, 'morphNewChildrenAdded', {
            detail,
          })

          const promise = new Promise<void>((res) => {
            setTimeout(() => {
              currentMorphElementChildNodes.forEach((el) => el.remove())

              newMorphElementChildNodes.forEach((element) => {
                if (element instanceof HTMLElement) {
                  element.classList.remove('in', 'new')
                }
              })

              dispatchEvent(document, 'morphOldChildrenRemoved', {
                detail,
              })

              res()
            }, (parseFloat(duration) || 0) * 1000 + 10)
          })

          this.#promises.push(promise)
        } else {
          this.destroyOldLinks(morphElement)
          morphElement.innerHTML = ''
          morphElement.append(...newMorphElementChildNodes)
          this.findNewLinks(morphElement)
        }
      })

      if (hash) {
        fetchedRoute.clearScrollState()
        this.#tryScrollToElement(hash, { centerScroll, offsetScroll })
      } else if (this.#isPopstateNavigation) {
        fetchedRoute.restoreScrollPosition()
      } else {
        fetchedRoute.renewScrollPosition()
      }

      await Promise.all(this.#promises)

      oldElementsWithLoadEvent.forEach((child) => child.remove())

      this.#promises = []

      this.#morphElements.forEach((el) => {
        const scriptElements = el.querySelectorAll('script')

        scriptElements.forEach((element) => {
          const newScriptTag = document.createElement('script')
          newScriptTag.type = 'module'
          newScriptTag.src = element.getAttribute('src')!
          element.replaceWith(newScriptTag)
        })
      })

      dispatchEvent(document, 'morphComplete', {
        detail: transitionDetail,
      })

      window.dispatchEvent(new Event('resize'))
    } catch (e) {
      console.error(e)
    }

    this.#candidatePathname = undefined
  }

  public addLink(element: HTMLAnchorElement) {
    this.#links.push(new MorphLink(element, this))
  }

  public addLinks(elements: Array<HTMLAnchorElement>) {
    elements.forEach((element) => {
      this.addLink(element)
    })
  }

  public removeLink(element: HTMLAnchorElement) {
    this.#links = this.#links.filter((link) => {
      if (link.element === element) {
        link.destroy()
        return false
      }

      return true
    })
  }

  public destroyOldLinks(morphElement: HTMLElement) {
    this.#links = this.#links.filter((link) => {
      if (morphElement.contains(link.element)) {
        link.destroy()
        return false
      }

      return true
    })
  }

  public findNewLinks(morphElement: HTMLElement) {
    const linkElements = [...morphElement.querySelectorAll('a')].filter(
      this.#checkLink
    )

    this.#links.push(
      ...linkElements.map((element) => new MorphLink(element, this))
    )
  }

  public findLinks() {
    const linkElements = [
      ...document.documentElement.querySelectorAll('a'),
    ].filter(this.#checkLink)

    this.#links.forEach((link) => link.destroy())

    this.#links = linkElements.map((element) => new MorphLink(element, this))
  }

  #checkLink = (element: HTMLElement) => {
    return (
      element.getAttribute('href')?.startsWith('/') &&
      !element.hasAttribute('download') &&
      !element.hasAttribute('data-morph-skip') &&
      !element.closest('[data-morph-skip]') &&
      element.getAttribute('target') !== '_blank'
    )
  }

  async #getRoute(path: string, options?: MorphGetRouteOptions) {
    let route = this.#routes.get(path)

    if (!route || options?.revalidate) {
      route = await this.#createRoute(path, options?.searchParameters)
    }

    return route
  }

  async #createRoute(path: string, searchParameters?: string) {
    const fetchResult = await fetch(
      `${path}${searchParameters ? '?' + searchParameters : ''}`
    )

    const text = await fetchResult.text()
    const document = this.#domParser.parseFromString(text, 'text/html')

    const route = new MorphRoute(this, path, document)

    this.#routes.set(path, route)

    return route
  }

  #getMorphElements(el: HTMLElement) {
    const morphElements = [...el.querySelectorAll<HTMLElement>('[data-morph]')]

    return morphElements.length ? morphElements : [el]
  }

  #intersectElements(
    elements: Array<Element>,
    elementsToIntersect: Array<Element>
  ) {
    return elements.filter((element) =>
      elementsToIntersect.find(
        (elementToIntersect) =>
          elementToIntersect.outerHTML === element.outerHTML
      )
    )
  }

  #excludeElements(
    elements: Array<Element>,
    elementsToExclude: Array<Element>
  ) {
    return elements.filter(
      (element) =>
        !elementsToExclude.find(
          (elementToExclude) => elementToExclude.outerHTML === element.outerHTML
        )
    )
  }

  #isElementEmitsLoadEvent(element: Element) {
    return (
      element.tagName === 'SCRIPT' ||
      element.tagName === 'STYLE' ||
      (element.tagName === 'LINK' &&
        element.getAttribute('rel') === 'stylesheet')
    )
  }

  #updateCurrentScrollElement(document: Document) {
    this.#currentScrollElement?.removeEventListener(
      'scroll',
      this.#scrollListener
    )

    this.#currentScrollElement =
      document.querySelector(this.#options.scrollSelector) ||
      document.documentElement

    this.#currentScrollElement?.addEventListener('scroll', this.#scrollListener)

    this.#scrollListener()
  }

  #tryScrollToElement(id: string | number, options?: ScrollToElementOptions) {
    const value = typeof id === 'string' ? document.getElementById(id) : id

    if (typeof value === 'number' || value) {
      scrollToElement(value, {
        scrollElement: this.#currentScrollElement,
        behavior: options?.behavior || 'instant',
        center: options?.centerScroll,
        offset: options?.offsetScroll,
      })
    }
  }

  #popStateListener = async (event: PopStateEvent) => {
    if (event.state?.path) {
      event.preventDefault()

      this.#isPopstateNavigation = true
      await this.navigate(event.state.path, { historyAction: 'none' })
      this.#isPopstateNavigation = false
    }
  }

  #scrollListener = () => {
    const top = this.#currentScrollElement.scrollTop
    const left = this.#currentScrollElement.scrollLeft

    document.documentElement.classList.toggle('top-scrolled', top > 0)
    document.documentElement.classList.toggle('left-scrolled', left > 0)

    dispatchEvent(document, 'morphScroll', {
      detail: {
        left,
        top,
      },
    })
  }
}

declare global {
  interface DocumentEventMap extends MorphEvents {}
}
