import { loading } from '@packages/loading'
import {
  ChangeHistoryAction,
  changeHistory,
  dispatchEvent,
  isBrowser,
  normalizeBase,
  splitPath,
} from '@packages/utils'

import { MorphLink } from './MorphLink'
import { MorphAnnouncer } from './MorphAnnouncer'

import './MorphAnnouncer'

export interface MorphParameters {
  base?: string
  waitForHeadToLoad?: boolean
  cachePages?: boolean
  trailingSlash?: boolean
}

export interface MorphNavigationEntry {
  pathname: string
  isCached: boolean
  state?: any
}

export interface MorphTransitionEntry extends MorphNavigationEntry {
  newDocument: Document
}

export interface MorphChildrenActionEntry {
  morphElement: HTMLElement
  pathname: string
  isCached: boolean
  state?: any
}

export interface MorphPreprocessorEntry extends MorphNavigationEntry {
  resolve: () => void
  reject: () => void
}

export type MorphPreprocessor = (entry: MorphPreprocessorEntry) => void

export type MorphNavigationCallback = (entry: MorphNavigationEntry) => void

export type MorphPostprocessor = MorphNavigationCallback

export interface MorphScrollState {
  x: number
  y: number
  selector: string
}

export interface MorphNavigateOptions {
  historyAction?: ChangeHistoryAction
  state?: any
  saveScrollState?: MorphScrollState
  saveDocumentState?: boolean
  restoreScrollState?: boolean
  restoreDocumentState?: boolean
}

export interface MorphEvents {
  morphStart: CustomEvent<MorphTransitionEntry>
  morphComplete: CustomEvent<MorphTransitionEntry>
  morphNewChildrenAdded: CustomEvent<MorphChildrenActionEntry>
  morphOldChildrenRemoved: CustomEvent<MorphChildrenActionEntry>
}

export class Morph {
  #base: string = null!
  #waitForHeadToLoad: boolean = null!
  #cachePages: boolean = null!
  #trailingSlash = false
  #morphElements: Array<HTMLElement> = null!
  #links: Array<MorphLink> = []
  #domParser: DOMParser = new DOMParser()
  #cache: Map<string, Document> = new Map()
  #candidatePathname: string | undefined
  #currentPathname: string = null!
  #previousPathname: string | undefined = undefined
  #currentState: any
  #promises: Array<Promise<void>> = []
  #savedScrollState: MorphScrollState | undefined
  #savedDocumentState: Document | undefined
  #isPopstateNavigation = false

  public preprocessor?: MorphPreprocessor
  public postprocessor?: MorphPostprocessor

  #announcer: MorphAnnouncer = null!

  constructor(parameters?: MorphParameters) {
    if (isBrowser) {
      this.#base = normalizeBase(parameters?.base)

      this.#waitForHeadToLoad =
        parameters?.waitForHeadToLoad === false ? false : true

      this.#cachePages = parameters?.cachePages === false ? false : true

      this.#trailingSlash = parameters?.trailingSlash || false

      this.#morphElements = this.#getMorphElements(document.body)

      const normalizedPath = this.normalizePath(
        location.pathname + location.hash
      )

      this.#currentPathname = normalizedPath.pathname

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

      this.#morphElements
        .map((e) => [...e.children])
        .flat()
        .forEach((e) => {
          if (e instanceof HTMLElement) {
            e.classList.add('current')
          }
        })

      this.#announcer = new MorphAnnouncer()
    }
  }

  public get currentPathname() {
    return this.#currentPathname
  }

  public get previousPathname() {
    return this.#previousPathname
  }

  public get currentState() {
    return this.#currentState
  }

  public get links() {
    return this.#links
  }

  public normalizePath(path: string) {
    return splitPath(path, {
      base: this.#base,
      trailingSlash: this.#trailingSlash,
    })
  }

  public async prefetch(path: string) {
    const parts = this.normalizePath(path)
    return this.#fetchDocument(parts.pathname)
  }

  public async navigate(
    path: string,
    {
      historyAction = 'push',
      state,
      saveScrollState,
      saveDocumentState,
      restoreDocumentState,
      restoreScrollState,
    }: MorphNavigateOptions = {}
  ) {
    if (this.#promises.length) {
      return
    }

    if (!this.#isPopstateNavigation) {
      if (!restoreDocumentState) {
        this.#savedDocumentState = undefined
      }

      if (!restoreScrollState) {
        this.#savedScrollState = undefined
      }
    }

    const parts = this.normalizePath(path)
    let { pathname, hash, parameters, leaf } = parts

    if (
      this.#candidatePathname === pathname ||
      this.#currentPathname === pathname
    ) {
      return
    }

    this.#currentState = state
    this.#candidatePathname = pathname

    const isCached = this.#cache.has(pathname)

    try {
      loading.add('__morph')

      let isOkToSwitch = true

      if (this.preprocessor) {
        try {
          await new Promise<void>((resolve, reject) => {
            this.preprocessor?.({ pathname, resolve, reject, isCached, state })
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

      if (!isOkToSwitch || this.#candidatePathname !== pathname) {
        return
      }

      const newDocument =
        this.#savedDocumentState ||
        this.#cache.get(pathname) ||
        (await this.#fetchDocument(pathname))

      const clonedNewDocument = newDocument.cloneNode(true) as Document

      if (this.#candidatePathname !== pathname) {
        return
      }

      this.#savedDocumentState = saveDocumentState
        ? (document.cloneNode(true) as Document)
        : undefined

      if (clonedNewDocument.title) {
        this.#announcer.textContent = clonedNewDocument.title
      } else {
        const h1 = clonedNewDocument.querySelector('h1')
        const title = h1?.innerText || h1?.textContent || pathname
        this.#announcer.textContent = title
      }

      document.body.appendChild(this.#announcer)

      const transitionDetail: MorphTransitionEntry = {
        pathname,
        isCached,
        state,
        newDocument: clonedNewDocument,
      }

      dispatchEvent(document, 'morphStart', {
        detail: transitionDetail,
      })

      const currentHeadChildren = Array.from(document.head.children)

      const newHeadChildren = Array.from(
        (clonedNewDocument.head as HTMLElement).children
      )

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

      const elementsWithLoad = addHeadChildren.filter(
        (child) =>
          !child.hasAttribute('data-no-waiting') &&
          (child.tagName === 'STYLE' ||
            child.tagName === 'SCRIPT' ||
            child.tagName === 'LINK') &&
          child.getAttribute('rel') !== 'canonical'
      ) as Array<HTMLLinkElement>

      if (this.#waitForHeadToLoad && elementsWithLoad.length) {
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

      const oldStyleScriptChildren: Array<Element> = []

      removeHeadChildren.forEach((child) => {
        if (child.hasAttribute('data-permanent')) {
          return
        }

        if (
          child.tagName === 'SCRIPT' ||
          child.tagName === 'STYLE' ||
          child.getAttribute('rel') === 'stylesheet'
        ) {
          oldStyleScriptChildren.push(child)
        } else {
          child.remove()
        }
      })

      this.#previousPathname = this.#currentPathname
      this.#currentPathname = pathname

      changeHistory({
        action: historyAction,
        pathname,
        searchParameters: parameters,
        hash,
      })

      const newMorphElements = this.#getMorphElements(
        clonedNewDocument.body as HTMLElement
      )

      this.#morphElements.forEach((morphElement, i) => {
        const newMorphElement = newMorphElements[i++]!

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
              element.classList.remove('current')
              element.classList.add('new')
            }
          })

          morphElement.prepend(...newMorphElementChildNodes)

          if (this.#savedScrollState) {
            const element = document.querySelector(
              this.#savedScrollState.selector
            )

            if (element) {
              element.scroll({
                top: this.#savedScrollState.y,
                left: this.#savedScrollState.x,
                behavior: 'auto',
              })
            }
          }

          setTimeout(() => {
            newMorphElementChildNodes.forEach((element) => {
              if (element instanceof HTMLElement) {
                element.classList.add('in')
              }
            })
          }, 10)

          const detail: MorphChildrenActionEntry = {
            morphElement,
            pathname,
            isCached,
            state,
          }

          dispatchEvent(document, 'morphNewChildrenAdded', {
            detail,
          })

          const promise = new Promise<void>((res) => {
            setTimeout(() => {
              currentMorphElementChildNodes.forEach((el) => el.remove())

              newMorphElementChildNodes.forEach((element) => {
                if (element instanceof HTMLElement) {
                  element.classList.remove('new', 'in')
                  element.classList.add('current')
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

      await Promise.all(this.#promises)

      oldStyleScriptChildren.forEach((child) => child.remove())

      this.#promises = []

      this.#savedScrollState = saveScrollState

      this.findLinks()

      document.documentElement.setAttribute('data-current-pathname', pathname)

      document.documentElement.setAttribute('data-current-leaf', leaf)

      this.#announcer.remove()

      this.postprocessor?.({ pathname, isCached, state })

      dispatchEvent(document, 'morphComplete', {
        detail: transitionDetail,
      })

      loading.complete('__morph')
    } catch (e) {
      console.error(e)
    }

    this.#candidatePathname = undefined
  }

  async #fetchDocument(pathname: string) {
    const cahcnedDocument = this.#cache.get(pathname)

    if (cahcnedDocument) {
      return cahcnedDocument
    }

    const fetchResult = await fetch(pathname)
    const text = await fetchResult.text()
    const document = this.#domParser.parseFromString(text, 'text/html')

    if (this.#cachePages) {
      this.#cache.set(pathname, document)
    }

    return document
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

  #popStateListener = (event: PopStateEvent) => {
    if (event.state?.path) {
      this.#isPopstateNavigation = true
      this.navigate(event.state.path, { historyAction: 'none' })
      this.#isPopstateNavigation = false
    }
  }
}

declare global {
  interface DocumentEventMap extends MorphEvents {}
}
