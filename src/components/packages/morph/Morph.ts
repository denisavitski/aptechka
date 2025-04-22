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

import { MorphRoute, MorphRouteScrollState } from './MorphRoute'

export interface MorphOptions {
  base: string
  waitForHeadToLoad: boolean
  trailingSlash: boolean
  scrollSelector: string | undefined
  morphInsideScrollContainer: boolean
}

export interface MorphNavigationEntry {
  path: string
  submorph?: Array<string>
}

export interface MorphChildrenActionEntry {
  morphElement: HTMLElement
  path: string
}

export interface MorphPreprocessorEntry extends MorphNavigationEntry {
  resolve: () => void
  reject: () => void
}

export type MorphPreprocessor = (entry: MorphPreprocessorEntry) => void
export type MorphPathnameModifier = (pathname: string) => string

export interface MorphNavigateOptions {
  historyAction?: ChangeHistoryAction
  centerScroll?: boolean
  offsetScroll?: number | ElementOrSelector<HTMLElement>
  revalidate?: boolean
  keepSearchParameters?: boolean
  submorph?: Array<string>
  clearState?: boolean
}

export interface MorphScrollDetail {
  left: number
  top: number
}

export interface MorphEvents {
  morphNavigation: CustomEvent<MorphNavigationEntry>
  morphStart: CustomEvent<MorphNavigationEntry>
  morphComplete: CustomEvent<MorphNavigationEntry>
  morphNewChildrenAdded: CustomEvent<MorphChildrenActionEntry>
  morphOldChildrenRemoved: CustomEvent<MorphChildrenActionEntry>
  morphScroll: CustomEvent<MorphScrollDetail>
  morphBeforeNavigationScroll: CustomEvent<MorphRouteScrollState>
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
  #candidatePath: string | undefined
  #currentPath: string = null!
  #previousPathname: string | undefined = undefined
  #promises: Array<Promise<void>> = []
  #isPopstateNavigation = false
  #currentScrollElement: HTMLElement | Window = null!
  #isWindowScroll = false
  #routes = new Map<string, MorphRoute>()
  #announcer: MorphAnnouncer = null!
  #currentScrollX = 0
  #currentScrollY = 0

  constructor(parameters?: Partial<MorphOptions>) {
    if (isBrowser && !Morph.instance) {
      Morph.instance = this

      this.#options = {
        base: normalizeBase(parameters?.base),
        waitForHeadToLoad:
          parameters?.waitForHeadToLoad === false ? false : true,
        trailingSlash: parameters?.trailingSlash || false,
        scrollSelector: parameters?.scrollSelector,
        morphInsideScrollContainer:
          parameters?.morphInsideScrollContainer || false,
      }

      this.#morphElements = this.#getMorphElements(document.body)

      const normalizedPath = this.normalizePath(
        location.pathname + location.hash + location.search
      )

      this.#currentPath = normalizedPath.path

      const initialRoute = new MorphRoute(this, this.#currentPath)
      initialRoute.setInitialDocument(document)

      this.#routes.set(this.#currentPath, initialRoute)

      document.documentElement.setAttribute(
        'data-current-pathname',
        this.#currentPath
      )

      document.documentElement.setAttribute(
        'data-current-leaf',
        normalizedPath.leaf
      )

      this.findLinks()

      history.scrollRestoration = 'manual'

      addEventListener('popstate', this.#popStateListener)

      changeHistory({
        action: 'replace',
        pathname: normalizedPath.pathname,
        searchParameters: normalizedPath.parameters,
        hash: normalizedPath.hash,
      })

      this.#announcer = new MorphAnnouncer()

      this.#updateCurrentScrollElement(document)
    }
  }

  public get currentPath() {
    return this.#currentPath
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

  public get scrollValue() {
    let top = 0
    let left = 0

    if (this.#isWindowScroll) {
      top = window.scrollY
      left = window.scrollX
    } else {
      top = (this.#currentScrollElement as HTMLElement).scrollTop
      left = (this.#currentScrollElement as HTMLElement).scrollLeft
    }

    return { top, left }
  }

  public saveState(state: any) {
    const route = this.#routes.get(this.#currentPath)

    if (route) {
      route.saveState(state)
    }
  }

  public getState() {
    const route = this.#routes.get(this.#currentPath)
    return route?.clearState()
  }

  public normalizePath(path: string) {
    return splitPath(path, {
      base: this.#options.base,
      trailingSlash: this.#options.trailingSlash,
    })
  }

  public async prefetch(path: string, revalidate?: boolean) {
    if (this.#promises.length) {
      return
    }

    const route = this.#getRoute(path)
    route?.fetch(revalidate)
  }

  public async navigate(
    path: string,
    {
      historyAction = 'push',
      centerScroll,
      offsetScroll,
      revalidate,
      keepSearchParameters,
      submorph,
      clearState,
    }: MorphNavigateOptions = {}
  ) {
    if (this.#promises.length) {
      return
    }

    const normalizedPath = this.normalizePath(
      this.pathnameModifier?.(path) || path
    )

    if (
      this.#candidatePath === normalizedPath.path ||
      this.#currentPath === normalizedPath.path
    ) {
      if (!this.#isPopstateNavigation) {
        this.#tryScrollToElement(normalizedPath.hash || 0, {
          centerScroll,
          offsetScroll,
          behavior: 'smooth',
        })
      }

      return
    }

    this.#candidatePath = normalizedPath.path

    this.#links.forEach((link) => {
      link.checkCurrent(normalizedPath.path)
    })

    try {
      let preprocessedSuccesfully = true

      if (this.preprocessor) {
        try {
          await new Promise<void>((resolve, reject) => {
            this.preprocessor?.({
              path,
              resolve,
              reject,
              submorph,
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

      if (
        !preprocessedSuccesfully ||
        this.#candidatePath !== normalizedPath.path
      ) {
        this.#links.forEach((link) => {
          link.checkCurrent(this.#currentPath)
        })

        return
      }

      const transitionDetail: MorphNavigationEntry = {
        path: normalizedPath.path,
        submorph,
      }

      dispatchEvent(document, 'morphNavigation', {
        detail: transitionDetail,
      })

      const currentRoute = this.#getRoute(this.#currentPath)
      const nextRoute = this.#getRoute(path)

      this.#routes.forEach((el) => {
        if (el.path !== normalizedPath.path) {
          el.abort()
        }
      })

      await nextRoute?.fetch(revalidate)

      if (this.#candidatePath !== normalizedPath.path) {
        this.#links.forEach((link) => {
          link.checkCurrent(this.#currentPath)
        })

        return
      }

      currentRoute.clearState()
      currentRoute.saveScrollState()
      currentRoute.saveDocumentState()

      if (!this.#isPopstateNavigation) {
        nextRoute.clearScrollState()
        nextRoute.clearDocumentState()
      }

      if (clearState) {
        nextRoute.clearState()
      }

      nextRoute.cloneDocument()

      this.#announcer.textContent = nextRoute.title

      document.body.appendChild(this.#announcer)

      dispatchEvent(document, 'morphStart', {
        detail: transitionDetail,
      })

      const currentHeadChildren = Array.from(document.head.children)
      const newHeadChildren = Array.from(nextRoute.document.head.children)

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
        nextRoute.document.body as HTMLElement
      )

      if (!this.#options.morphInsideScrollContainer) {
        this.#updateCurrentScrollElement(nextRoute.document)
      }

      document.documentElement.setAttribute(
        'data-current-pathname',
        normalizedPath.pathname
      )
      document.documentElement.setAttribute(
        'data-current-leaf',
        normalizedPath.leaf
      )

      changeHistory({
        action: historyAction,
        pathname: normalizedPath.pathname,
        searchParameters:
          normalizedPath.parameters ||
          (keepSearchParameters ? location.search : ''),
        hash: normalizedPath.hash,
      })

      this.#announcer.remove()

      this.#previousPathname = this.#currentPath
      this.#currentPath = normalizedPath.path

      this.#morphElements.forEach((morphElement, i) => {
        const newMorphElement = newMorphElements[i]!

        const duration =
          getComputedStyle(morphElement).getPropertyValue('--morph-duration')

        let newMorphElementChildNodes: Array<ChildNode> = []
        let currentMorphElementChildNodes: Array<ChildNode> = []

        if (submorph) {
          submorph.forEach((selector) => {
            const curSubMorphElement = morphElement.querySelector(selector)
            const newSubMorphElement = newMorphElement.querySelector(selector)

            if (curSubMorphElement && newSubMorphElement) {
              currentMorphElementChildNodes.push(curSubMorphElement)
              newMorphElementChildNodes.push(newSubMorphElement)
            }
          })
        } else {
          newMorphElementChildNodes.push(...newMorphElement.childNodes)
          currentMorphElementChildNodes.push(...morphElement.childNodes)
        }

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

        if (!submorph) {
          morphElement.prepend(...newMorphElementChildNodes)
        } else {
          newMorphElementChildNodes.forEach((el, i) => {
            currentMorphElementChildNodes[i].parentElement?.insertBefore(
              el,
              currentMorphElementChildNodes[i]
            )
          })
        }

        requestIdleCallback(() => {
          newMorphElementChildNodes.forEach((element) => {
            if (element instanceof HTMLElement) {
              element.parentElement?.style.setProperty(
                '--new-content-height',
                element.offsetHeight + 'px'
              )
              element.classList.add('in')
            }
          })
        })

        const detail: MorphChildrenActionEntry = {
          morphElement,
          path: normalizedPath.path,
        }

        dispatchEvent(document, 'morphNewChildrenAdded', {
          detail,
        })

        const promise = new Promise<void>((res) => {
          setTimeout(() => {
            currentMorphElementChildNodes.forEach((el) => el.remove())

            newMorphElementChildNodes.forEach((element) => {
              if (element instanceof HTMLElement) {
                element.parentElement?.style.removeProperty(
                  '--new-content-height'
                )
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
      })

      if (this.isPopstateNavigation) {
        document.documentElement.style.setProperty(
          '--new-document-scroll-position',
          (this.scrollValue.top - nextRoute.scrollState.y) * 1 + 'px'
        )
      } else {
        document.documentElement.style.setProperty(
          '--new-document-scroll-position',
          this.scrollValue.top + 'px'
        )
      }

      dispatchEvent(document, 'morphBeforeNavigationScroll', {
        detail: nextRoute.scrollState,
      })

      if (normalizedPath.hash) {
        nextRoute.clearScrollState()
        this.#tryScrollToElement(normalizedPath.hash, {
          centerScroll,
          offsetScroll,
        })
      } else if (this.#isPopstateNavigation) {
        nextRoute.restoreScrollPosition()
      } else {
        nextRoute.renewScrollPosition()
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

      document.documentElement.style.removeProperty(
        '--new-document-scroll-position'
      )

      window.dispatchEvent(new Event('resize'))
    } catch (e) {
      console.error(e)
    }

    this.#candidatePath = undefined
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

  #getRoute(path: string) {
    let route = this.#routes.get(path)

    if (!route) {
      route = new MorphRoute(this, path)
      this.#routes.set(path, route)
    }

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

    this.#currentScrollY = 0
    this.#currentScrollX = 0

    this.#currentScrollElement = this.#options.scrollSelector
      ? document.querySelector<HTMLElement>(this.#options.scrollSelector) ||
        window
      : window

    this.#isWindowScroll = this.#currentScrollElement === window

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
    const { left, top } = this.scrollValue

    const directionY = top - this.#currentScrollY
    const directionX = left - this.#currentScrollX

    this.#currentScrollY = top
    this.#currentScrollX = left

    document.documentElement.classList.toggle('scroll-y', top > 0)
    document.documentElement.classList.toggle('scroll-x', left > 0)

    document.documentElement.classList.toggle(
      'scroll-y-forward',
      directionY > 0
    )
    document.documentElement.classList.toggle(
      'scroll-y-backward',
      directionY < 0
    )

    document.documentElement.classList.toggle(
      'scroll-x-forward',
      directionX > 0
    )
    document.documentElement.classList.toggle(
      'scroll-x-backward',
      directionX < 0
    )

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
