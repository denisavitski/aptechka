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

export interface MorphNavigateOptions {
  historyAction?: ChangeHistoryAction
  centerScroll?: boolean
  offsetScroll?: number | ElementOrSelector<HTMLElement>
  revalidate?: boolean
}

export interface MorphEvents {
  morphStart: CustomEvent<MorphTransitionEntry>
  morphComplete: CustomEvent<MorphTransitionEntry>
  morphNewChildrenAdded: CustomEvent<MorphChildrenActionEntry>
  morphOldChildrenRemoved: CustomEvent<MorphChildrenActionEntry>
}

interface ScrollToElementOptions
  extends Pick<MorphNavigateOptions, 'centerScroll' | 'offsetScroll'> {
  behavior?: ScrollBehavior
}

export class Morph {
  public preprocessor?: MorphPreprocessor

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
    if (isBrowser) {
      this.#options = {
        base: normalizeBase(parameters?.base),
        waitForHeadToLoad:
          parameters?.waitForHeadToLoad === false ? false : true,
        cachePages: parameters?.cachePages === false ? false : true,
        trailingSlash: parameters?.trailingSlash || false,
        scrollSelector: parameters?.scrollSelector || 'body',
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
        searchParameters: normalizedPath.parameters,
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

  public normalizePath(path: string) {
    return splitPath(path, {
      base: this.#options.base,
      trailingSlash: this.#options.trailingSlash,
    })
  }

  public async prefetch(path: string) {
    const parts = this.normalizePath(path)
    this.#createRoute(parts.pathname)
  }

  public async navigate(
    path: string,
    {
      historyAction = 'push',
      centerScroll,
      offsetScroll,
      revalidate,
    }: MorphNavigateOptions = {}
  ) {
    if (this.#promises.length) {
      return
    }

    const parts = this.normalizePath(path)

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

    this.#links.forEach((link) => {
      link.checkCurrent(pathname)
    })

    this.#candidatePathname = pathname

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
      const fetchedRoute = await this.#getRoute(pathname, revalidate)

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

      this.#updateCurrentScrollElement(fetchedRoute.document)

      document.documentElement.setAttribute('data-current-pathname', pathname)
      document.documentElement.setAttribute('data-current-leaf', leaf)

      changeHistory({
        action: historyAction,
        pathname,
        searchParameters: parameters,
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
              element.classList.add('old')
            }
          })

          newMorphElementChildNodes.forEach((element) => {
            if (element instanceof HTMLElement) {
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
          morphElement.innerHTML = ''
          morphElement.append(...newMorphElementChildNodes)
        }
      })

      if (hash) {
        fetchedRoute.clearScrollState()

        this.#tryScrollToElement(hash, { centerScroll, offsetScroll })
      } else if (this.#isPopstateNavigation) {
        fetchedRoute.restoreScrollPosition()
      }

      await Promise.all(this.#promises)

      oldElementsWithLoadEvent.forEach((child) => child.remove())

      this.#promises = []

      this.findLinks()

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

  public findLinks() {
    const linkElements = [
      ...document.documentElement.querySelectorAll('a'),
    ].filter(
      (a) =>
        a.getAttribute('href')?.startsWith('/') &&
        !a.hasAttribute('download') &&
        !a.hasAttribute('data-morph-skip') &&
        !a.closest('[data-morph-skip]')
    )

    this.#links.forEach((link) => link.destroy())

    this.#links = linkElements.map((element) => new MorphLink(element, this))
  }

  async #getRoute(pathname: string, revalidate = false) {
    let route = this.#routes.get(pathname)

    if (!route || revalidate) {
      route = await this.#createRoute(pathname)
    }

    return route
  }

  async #createRoute(pathname: string) {
    const fetchResult = await fetch(pathname)
    const text = await fetchResult.text()
    const document = this.#domParser.parseFromString(text, 'text/html')

    const route = new MorphRoute(this, pathname, document)

    this.#routes.set(pathname, route)

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
    this.#currentScrollElement =
      document.querySelector(this.#options.scrollSelector) ||
      document.documentElement
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
      this.#isPopstateNavigation = true
      await this.navigate(event.state.path, { historyAction: 'none' })
      this.#isPopstateNavigation = false
    }
  }
}

declare global {
  interface DocumentEventMap extends MorphEvents {}
}
