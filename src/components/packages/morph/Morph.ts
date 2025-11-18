import {
  createScriptElement,
  dispatchEvent,
  ElementOrSelector,
  excludeElements,
  intersectElements,
  isBrowser,
  normalizeBase,
  splitPath,
  wait,
} from '@packages/utils'

import './MorphAnnouncer'
import { MorphLink } from './MorphLink'

import { MorphAnnouncer } from './MorphAnnouncer'

import {
  ScrollNavigator,
  ScrollNavigatorOptions,
} from '@packages/scroll-kit/ScrollNavigator'
import {
  historyManager,
  HistoryManagerChangeAction,
  HistoryManagerPopStateEvent,
} from '@packages/shared/historyManager'
import { MorphParamsDependent } from './MorphParamsDependent'
import { MorphRoute, MorphRouteScrollState } from './MorphRoute'

export interface MorphOptions {
  base: string
  waitForHeadToLoad: boolean
  trailingSlash: boolean
  scrollSelector: string | undefined
  morphInsideScrollContainer: boolean
}

export interface MorphNavigationEntry {
  url: ReturnType<typeof splitPath>
  submorph?: Array<string>
  detail: any
}

export interface MorphNavigationDocumentFetchedEntry
  extends MorphNavigationEntry {
  document: Document
}

export interface MorphChildrenActionEntry
  extends MorphNavigationDocumentFetchedEntry {
  morphElement: HTMLElement
}

export interface MorphURLParametersChangeEntry {
  newURL: ReturnType<typeof splitPath>
  previousURL: ReturnType<typeof splitPath>
  detail: any
}

export interface MorphSamePathEntry {
  detail: any
}

export interface MorphPreprocessorEntry extends MorphNavigationEntry {
  resolve: () => void
  reject: () => void
}

export type MorphPreprocessor = (entry: MorphPreprocessorEntry) => void
export type MorphPathnameModifier = (pathname: string) => string

export interface MorphNavigateOptions {
  historyAction?: HistoryManagerChangeAction
  centerScroll?: boolean
  offsetScroll?: number | ElementOrSelector<HTMLElement>
  scrollBehaviour?: ScrollBehavior
  scrollDuration?: number
  scrollEasing?: ScrollNavigatorOptions['easing']
  scrollTo?: string
  revalidate?: boolean
  keepSearchParameters?: boolean
  submorph?: Array<string>
  submorphAppend?: boolean
  clearState?: boolean
  keepScrollPosition?: boolean
  mergeParams?: boolean
  removeParams?: string
  detail?: any
}

export interface MorphScrollDetail {
  left: number
  top: number
}

export interface MorphEvents {
  morphNavigation: CustomEvent<MorphNavigationEntry>
  morphStart: CustomEvent<MorphNavigationDocumentFetchedEntry>
  morphComplete: CustomEvent<MorphNavigationDocumentFetchedEntry>
  morphNewChildrenAdded: CustomEvent<MorphChildrenActionEntry>
  morphOldChildrenRemoved: CustomEvent<MorphChildrenActionEntry>
  morphScroll: CustomEvent<MorphScrollDetail>
  morphBeforeNavigationScroll: CustomEvent<MorphRouteScrollState>
  morphURLParametersChange: CustomEvent<MorphURLParametersChangeEntry>
  morphSamePath: CustomEvent<MorphSamePathEntry>
}

export interface MorphGetRouteOptions {
  searchParameters?: string
  revalidate?: boolean
}

export class Morph {
  public static instance: Morph = null!

  public preprocessor?: MorphPreprocessor
  public pathnameModifier?: MorphPathnameModifier

  #options: MorphOptions = null!
  #morphElements: Array<HTMLElement> = null!
  #links: Array<MorphLink> = []
  #candidateURL: ReturnType<typeof splitPath> | undefined
  #currentURL: ReturnType<typeof splitPath> = null!
  #previousURL: ReturnType<typeof splitPath> | undefined = undefined
  #promises: Array<Promise<void>> = []
  #isPopstateNavigation = false
  #currentScrollElement: HTMLElement | Window = null!
  #isWindowScroll = false
  #routes = new Map<string, MorphRoute>()
  #paramDependent: Array<MorphParamsDependent> = []
  #announcer: MorphAnnouncer = null!
  #currentScrollX = 0
  #currentScrollY = 0
  #lastSubmorph: Array<string> | undefined
  #lastRevalidate: boolean | undefined
  #lastKeepScrollPosition: boolean | undefined

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

      const normalizedURL = this.normalizePath(
        location.pathname + location.search + location.hash,
      )

      this.#currentURL = normalizedURL

      const initialRoute = new MorphRoute(this, this.#currentURL.pathname)
      initialRoute.setInitialDocument(document)

      this.#routes.set(this.#currentURL.pathname, initialRoute)

      document.documentElement.setAttribute(
        'data-current-pathname',
        this.#currentURL.pathname,
      )

      document.documentElement.setAttribute(
        'data-current-leaf',
        normalizedURL.leaf,
      )

      this.findLinks()
      this.findParamsDependent()

      historyManager.addPopStateHandler(this.#popStateListener)

      historyManager.__change({
        action: 'replace',
        pathname: normalizedURL.pathname,
        searchParameters: normalizedURL.parameters,
        hash: normalizedURL.hash,
      })

      this.#announcer = new MorphAnnouncer()

      this.#updateCurrentScrollElement(document)
    }
  }

  public get currentURL() {
    return this.#currentURL
  }

  public get previousURL() {
    return this.#previousURL
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

  public get isNavigating() {
    return !!this.#promises.length
  }

  public saveState(state: any) {
    const route = this.#routes.get(this.#currentURL.path)

    if (route) {
      route.saveState(state)
    }
  }

  public getState() {
    const route = this.#routes.get(this.#currentURL.path)
    return route?.clearState()
  }

  public normalizePath(
    path: string,
    options?: Pick<MorphNavigateOptions, 'mergeParams' | 'removeParams'>,
  ) {
    return splitPath(path, {
      base: this.#options.base,
      trailingSlash: this.#options.trailingSlash,
      mergeParams: options?.mergeParams ? location.search : '',
      removeParams: options?.removeParams,
    })
  }

  public async prefetch(path: string, revalidate?: boolean) {
    if (this.#promises.length) {
      return
    }

    path = this.pathnameModifier?.(path) || path

    const route = this.#getRoute(path)
    route?.fetch(path, this.#currentURL.path, revalidate)
  }

  public excludeHeadChild(child: Node) {
    return false
  }

  public needRavalidation(path: string) {
    const normalizedURL = this.normalizePath(path)
    const route = this.#getRoute(normalizedURL.path)
    route?.needRavalidation()
  }

  public async navigate(
    path: string,
    {
      historyAction = 'push',
      centerScroll,
      offsetScroll,
      scrollDuration,
      scrollEasing,
      scrollBehaviour,
      revalidate,
      keepSearchParameters,
      submorph,
      submorphAppend,
      clearState,
      keepScrollPosition,
      mergeParams,
      removeParams,
      detail,
      scrollTo,
    }: MorphNavigateOptions = {},
  ) {
    if (this.#promises.length) {
      return
    }

    this.#lastSubmorph = submorph
    this.#lastRevalidate = revalidate
    this.#lastKeepScrollPosition = keepScrollPosition

    const modifiedPath = this.pathnameModifier?.(path) || path

    const normalizedURL = this.normalizePath(modifiedPath, {
      mergeParams,
      removeParams,
    })

    if (
      !revalidate &&
      (this.#candidateURL?.pathname === normalizedURL.pathname ||
        this.#currentURL.pathname === normalizedURL.pathname)
    ) {
      if (!keepScrollPosition) {
        this.#tryScrollToElement(scrollTo || normalizedURL.hash || 0, {
          center: centerScroll,
          offset: offsetScroll,
          duration: scrollDuration,
          easing: scrollEasing,
          behavior: 'smooth',
        })
      }

      dispatchEvent(document, 'morphSamePath', {
        detail: {
          detail,
        },
      })

      if (this.#currentURL?.parameters !== normalizedURL.parameters) {
        this.#previousURL = this.#currentURL
        this.#currentURL = normalizedURL

        historyManager.__change({
          action:
            this.#currentURL?.hash !== normalizedURL.hash
              ? 'replace'
              : historyAction,
          pathname: normalizedURL.pathname,
          searchParameters: normalizedURL.parameters,
          hash: normalizedURL.hash,
        })

        dispatchEvent(document, 'morphURLParametersChange', {
          detail: {
            newURL: this.#currentURL,
            previousURL: this.#previousURL,
            detail,
          },
        })
      }

      this.#links.forEach((link) => {
        link.checkCurrent(normalizedURL.path)
      })

      return
    } else {
      this.#links.forEach((link) => {
        link.checkCurrent(normalizedURL.path)
      })
    }

    this.#candidateURL = normalizedURL

    try {
      let preprocessedSuccesfully = true

      if (this.preprocessor) {
        try {
          await new Promise<void>((resolve, reject) => {
            this.preprocessor?.({
              url: normalizedURL,
              resolve,
              reject,
              submorph,
              detail,
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
        this.#candidateURL.pathname !== normalizedURL.pathname
      ) {
        this.#links.forEach((link) => {
          link.checkCurrent(this.#currentURL.path)
        })

        return
      }

      const navigationEntry: MorphNavigationEntry = {
        url: normalizedURL,
        submorph,
        detail,
      }

      if (!submorph) {
        this.#morphElements.forEach((el) => {
          el.firstElementChild?.classList.add('out')
          el.firstElementChild?.setAttribute('data-morph-out', '')
        })
      } else {
        if (!submorphAppend) {
          submorph.forEach((sel) => {
            document.querySelectorAll(sel).forEach((el) => {
              el.classList.add('out')
              el.setAttribute('data-morph-out', '')
            })
          })
        }
      }

      dispatchEvent(document, 'morphNavigation', {
        detail: navigationEntry,
      })

      const currentRoute = this.#getRoute(this.#currentURL.pathname)
      const nextRoute = this.#getRoute(normalizedURL.pathname)

      this.#routes.forEach((el) => {
        if (el.pathname !== normalizedURL.pathname) {
          el.abort()
        }
      })

      await nextRoute?.fetch(modifiedPath, this.#currentURL.path, revalidate)

      if (this.#candidateURL.pathname !== normalizedURL.pathname) {
        this.#links.forEach((link) => {
          link.checkCurrent(this.#currentURL.path)
        })

        return
      }

      currentRoute.clearState()
      currentRoute.saveScrollState()
      currentRoute.saveDocumentState()

      if (!this.#isPopstateNavigation || revalidate) {
        nextRoute.clearScrollState()
        nextRoute.clearDocumentState()
      }

      if (clearState) {
        nextRoute.clearState()
      }

      nextRoute.cloneDocument()

      this.#announcer.textContent = nextRoute.title

      document.body.appendChild(this.#announcer)

      const documentFetchedEntry: MorphNavigationDocumentFetchedEntry = {
        ...navigationEntry,
        document: nextRoute.document,
      }

      if (!submorphAppend) {
        documentFetchedEntry.document
          .querySelectorAll('[data-morph-out]')
          .forEach((el) => {
            el.classList.remove('out')
          })
      }

      dispatchEvent(document, 'morphStart', {
        detail: documentFetchedEntry,
      })

      const currentHeadChildren = Array.from(document.head.children)
      const newHeadChildren = Array.from(nextRoute.document.head.children)

      const identicalHeadChildren = intersectElements(
        currentHeadChildren,
        newHeadChildren,
      )

      const removeHeadChildren = excludeElements(
        currentHeadChildren,
        identicalHeadChildren,
      )

      const addHeadChildren = excludeElements(
        newHeadChildren,
        identicalHeadChildren,
      ).filter((child) => !this.excludeHeadChild(child))

      addHeadChildren.forEach((child, index) => {
        if (child.tagName === 'SCRIPT') {
          addHeadChildren[index] = createScriptElement(
            child as HTMLScriptElement,
          )
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

      if (!submorphAppend) {
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
      }

      const newMorphElements = this.#getMorphElements(
        nextRoute.document.body as HTMLElement,
      )

      if (!this.#options.morphInsideScrollContainer && !submorph) {
        this.#updateCurrentScrollElement(nextRoute.document)
      }

      document.documentElement.setAttribute(
        'data-current-pathname',
        normalizedURL.pathname,
      )
      document.documentElement.setAttribute(
        'data-current-leaf',
        normalizedURL.leaf,
      )

      historyManager.__change({
        action: historyAction,
        pathname: normalizedURL.pathname,
        searchParameters:
          normalizedURL.parameters ||
          (keepSearchParameters ? location.search : ''),
        hash: normalizedURL.hash,
      })

      this.#announcer.remove()

      this.#previousURL = this.#currentURL
      this.#currentURL = normalizedURL

      const morphedElements: Array<Element> = []

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

          currentMorphElementChildNodes.forEach((el) => {
            if (el.parentElement) {
              morphedElements.push(el.parentElement)
            }
          })
        } else {
          newMorphElementChildNodes.push(...newMorphElement.childNodes)
          currentMorphElementChildNodes.push(...morphElement.childNodes)
          morphedElements.push(morphElement)
        }

        const transfer: Array<{
          element: HTMLElement
          selector: string
        }> = []

        if (!submorphAppend) {
          currentMorphElementChildNodes.forEach((element) => {
            if (element instanceof HTMLElement) {
              this.destroyOldLinks(element)
              element.classList.add('old')

              const transferElements = element.querySelectorAll<HTMLElement>(
                '[data-morph-transfer]',
              )

              transferElements.forEach((el) => {
                const selector = el.getAttribute('data-morph-transfer')!

                transfer.push({
                  element: el as HTMLElement,
                  selector,
                })
              })
            }
          })
        }

        newMorphElementChildNodes.forEach((element) => {
          if (element instanceof HTMLElement) {
            transfer.forEach((item) => {
              const nestlement = element.querySelector(item.selector)

              if (nestlement) {
                nestlement.replaceWith(
                  nextRoute.document.importNode(item.element, true),
                )
              }
            })

            this.findNewLinks(element)
            element.classList.add('new')
          }
        })

        if (!submorph) {
          morphElement.prepend(...newMorphElementChildNodes)
        } else {
          if (!submorphAppend) {
            newMorphElementChildNodes.forEach((el, i) => {
              currentMorphElementChildNodes[i].parentElement?.insertBefore(
                el,
                currentMorphElementChildNodes[i],
              )
            })
          } else {
            newMorphElementChildNodes.forEach((el, i) => {
              if (currentMorphElementChildNodes[i] instanceof HTMLElement) {
                currentMorphElementChildNodes[i].append(...el.childNodes)
              }
            })
          }
        }

        setTimeout(() => {
          if (!submorphAppend) {
            currentMorphElementChildNodes.forEach((element) => {
              if (element instanceof HTMLElement) {
                element.classList.add('old-idle')
              }
            })
          }

          newMorphElementChildNodes.forEach((element) => {
            if (element instanceof HTMLElement) {
              element.parentElement?.style.setProperty(
                '--new-content-height',
                element.offsetHeight + 'px',
              )
              element.classList.add('new-idle')
            }
          })
        }, 0)

        const detail: MorphChildrenActionEntry = {
          ...documentFetchedEntry,
          morphElement,
        }

        dispatchEvent(document, 'morphNewChildrenAdded', {
          detail,
        })

        const promise = new Promise<void>((res) => {
          setTimeout(
            () => {
              if (!submorphAppend) {
                currentMorphElementChildNodes.forEach((el) => {
                  el.remove()
                })
              }

              newMorphElementChildNodes.forEach((element) => {
                if (element instanceof HTMLElement) {
                  element.parentElement?.style.removeProperty(
                    '--new-content-height',
                  )
                  element.classList.remove('new-idle', 'new')
                }
              })

              if (!submorphAppend) {
                dispatchEvent(document, 'morphOldChildrenRemoved', {
                  detail,
                })
              }

              res()
            },
            (parseFloat(duration) || 0) * 1000 + 10,
          )
        })

        this.#promises.push(promise)
      })

      if (this.isPopstateNavigation) {
        document.documentElement.style.setProperty(
          '--new-document-scroll-position',
          (this.scrollValue.top - nextRoute.scrollState.y) * 1 + 'px',
        )
      } else {
        document.documentElement.style.setProperty(
          '--new-document-scroll-position',
          this.scrollValue.top + 'px',
        )
      }

      dispatchEvent(document, 'morphBeforeNavigationScroll', {
        detail: nextRoute.scrollState,
      })

      if (scrollTo) {
        nextRoute.clearScrollState()

        this.#tryScrollToElement(scrollTo, {
          center: centerScroll,
          offset: offsetScroll,
          duration: scrollDuration,
          easing: scrollEasing,
          behavior: scrollBehaviour,
        })
      } else if (normalizedURL.hash) {
        nextRoute.clearScrollState()

        this.#tryScrollToElement(normalizedURL.hash, {
          center: centerScroll,
          offset: offsetScroll,
          duration: scrollDuration,
          easing: scrollEasing,
          behavior: scrollBehaviour,
        })
      } else if (this.#isPopstateNavigation) {
        nextRoute.restoreScrollPosition()
      } else if (!keepScrollPosition) {
        nextRoute.renewScrollPosition()
      }

      await Promise.all(this.#promises)

      if (!submorphAppend) {
        oldElementsWithLoadEvent.forEach((child) => child.remove())
      }

      this.#promises = []

      morphedElements.forEach((el) => {
        const scriptElements = el.querySelectorAll('script')

        scriptElements.forEach((element) => {
          element.replaceWith(createScriptElement(element))
        })
      })

      this.#links.forEach((link) => {
        link.checkCurrent(this.#currentURL.path)
      })

      this.findParamsDependent()

      dispatchEvent(document, 'morphComplete', {
        detail: documentFetchedEntry,
      })

      document.documentElement.style.removeProperty(
        '--new-document-scroll-position',
      )

      window.dispatchEvent(new Event('resize'))
    } catch (e) {
      console.error(e)
    }

    this.#candidateURL = undefined
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
      this.#checkLink,
    )

    this.#links.push(
      ...linkElements.map((element) => new MorphLink(element, this)),
    )
  }

  public findLinks() {
    const linkElements = [
      ...document.documentElement.querySelectorAll('a'),
    ].filter(this.#checkLink)

    this.#links.forEach((link) => link.destroy())

    this.#links = linkElements.map((element) => new MorphLink(element, this))
  }

  public findParamsDependent() {
    const elements = [
      ...document.documentElement.querySelectorAll<HTMLElement>(
        '[data-morph-params-dependent]',
      ),
    ]

    this.#paramDependent.forEach((link) => link.destroy())

    this.#paramDependent = elements.map(
      (element) => new MorphParamsDependent(element),
    )
  }

  #checkLink = (element: HTMLElement) => {
    return (
      (element.getAttribute('href')?.startsWith('/') ||
        element.getAttribute('href')?.startsWith('?')) &&
      !element.hasAttribute('download') &&
      !element.hasAttribute('data-morph-skip') &&
      !element.closest('[data-morph-skip]') &&
      element.getAttribute('target') !== '_blank'
    )
  }

  #getRoute(path: string) {
    const normalizedURL = this.normalizePath(path)

    let route = this.#routes.get(normalizedURL.pathname)

    if (!route) {
      route = new MorphRoute(this, normalizedURL.pathname)
      this.#routes.set(normalizedURL.pathname, route)
    }

    return route
  }

  #getMorphElements(el: HTMLElement) {
    const morphElements = [...el.querySelectorAll<HTMLElement>('[data-morph]')]

    return morphElements.length ? morphElements : [el]
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
      this.#scrollListener,
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

  #tryScrollToElement(
    id: string | number,
    options?: Omit<ScrollNavigatorOptions, 'scrollElement'>,
  ) {
    const value =
      typeof id === 'string' ? document.querySelector<HTMLElement>(id) : id

    if (typeof value === 'number' || value) {
      ScrollNavigator.scrollToElement(value, {
        scrollElement: this.#currentScrollElement,
        ...options,
      })
    }
  }

  #popStateListener = async (event: HistoryManagerPopStateEvent) => {
    if (event.state?.data?.popover || event.previousState?.data?.popover) {
      return
    }

    this.#isPopstateNavigation = true

    await this.navigate(location.href.replace(location.origin, ''), {
      historyAction: 'none',
      submorph: !this.#lastRevalidate ? this.#lastSubmorph : undefined,
      revalidate: this.#lastRevalidate,
      keepScrollPosition: this.#lastKeepScrollPosition,
    })

    this.#isPopstateNavigation = false
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
      directionY > 0,
    )
    document.documentElement.classList.toggle(
      'scroll-y-backward',
      directionY < 0,
    )

    document.documentElement.classList.toggle(
      'scroll-x-forward',
      directionX > 0,
    )
    document.documentElement.classList.toggle(
      'scroll-x-backward',
      directionX < 0,
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
