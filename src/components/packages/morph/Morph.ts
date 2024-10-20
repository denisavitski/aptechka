import { Notifier } from '@packages/notifier'

import {
  ChangeHistoryAction,
  changeHistory,
  dispatchEvent,
  isBrowser,
  normalizeBase,
  splitPath,
} from '@packages/utils'

import { Link } from './Link'
import { loading } from '@packages/loading'

export interface MorphParameters {
  base?: string
  waitForHeadToLoad?: boolean
  cachePages?: boolean
}

export interface MorphNavigationEntry {
  pathname: string
  isCached: boolean
  state?: any
}

export interface MorphElementSwitchEntry {
  element: HTMLElement
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

export interface MorphNavigateOptions {
  historyAction?: ChangeHistoryAction
  state?: any
}

export interface MorphEvents {
  morphBeforeNavigation: CustomEvent<MorphNavigationEntry>
  morphAfterNavigation: CustomEvent<MorphNavigationEntry>
  morphBeforeElementOut: CustomEvent<MorphElementSwitchEntry>
  morphAfterElementOut: CustomEvent<MorphElementSwitchEntry>
}

export class Morph {
  #base: string = null!
  #waitForHeadToLoad: boolean = null!
  #cachePages: boolean = null!
  #morphElements: Array<HTMLElement> = null!
  #links: Array<Link> = []
  #domParser: DOMParser = new DOMParser()
  #cache: Map<string, Document> = new Map()
  #candidatePathname: string | undefined
  #currentPathname: string = null!
  #previousPathname: string | undefined = undefined
  #currentState: any
  #timeoutIds: Array<ReturnType<typeof setTimeout>> = []

  public preprocessor?: MorphPreprocessor
  public postprocessor?: MorphPostprocessor

  constructor(parameters?: MorphParameters) {
    if (isBrowser) {
      this.#base = normalizeBase(parameters?.base)

      this.#waitForHeadToLoad =
        parameters?.waitForHeadToLoad === false ? false : true
      this.#cachePages = parameters?.cachePages === false ? false : true

      this.#morphElements = this.#getMorphElements(document.body)

      const normalizedPath = this.normalizePath(location.pathname)

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

      changeHistory(
        'replace',
        this.#currentPathname,
        normalizedPath.parameters,
        normalizedPath.hash
      )

      this.#morphElements
        .map((e) => [...e.children])
        .flat()
        .forEach((e) => {
          if (e instanceof HTMLElement) {
            e.classList.add('current')
          }
        })
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
    return splitPath(path, this.#base)
  }

  public async prefetch(path: string) {
    const parts = this.normalizePath(path)
    return this.#fetchDocument(parts.pathname)
  }

  public async navigate(
    path: string,
    { historyAction = 'push', state }: MorphNavigateOptions = {}
  ) {
    if (this.#timeoutIds.length) {
      return
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

      dispatchEvent(document, 'morphBeforeNavigation', {
        detail: {
          pathname,
          isCached,
          state,
        },
      })

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
        this.#cache.get(pathname) || (await this.#fetchDocument(pathname))

      if (this.#candidatePathname !== pathname) {
        return
      }

      const currentHeadChildren = Array.from(document.head.children)

      const newHeadChildren = Array.from(
        (newDocument.head.cloneNode(true) as HTMLElement).children
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

      removeHeadChildren.forEach((child) => {
        if (!child.hasAttribute('data-permanent')) {
          child.remove()
        }
      })

      this.#previousPathname = this.#currentPathname
      this.#currentPathname = pathname

      changeHistory(historyAction, pathname, parameters, hash)

      const newMorphElements = this.#getMorphElements(
        newDocument.body.cloneNode(true) as HTMLElement
      )

      this.#timeoutIds.forEach((id) => clearTimeout(id))
      this.#timeoutIds = []

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

          morphElement.append(...newMorphElementChildNodes)

          setTimeout(() => {
            newMorphElementChildNodes.forEach((element) => {
              if (element instanceof HTMLElement) {
                element.classList.add('in')
              }
            })
          }, 10)

          const detail = {
            element: morphElement,
            pathname,
            isCached,
            state,
          }

          dispatchEvent(document, 'morphBeforeElementOut', {
            detail,
          })

          const timeoutId = setTimeout(() => {
            currentMorphElementChildNodes.forEach((el) => el.remove())

            newMorphElementChildNodes.forEach((element) => {
              if (element instanceof HTMLElement) {
                element.classList.remove('new', 'in')
                element.classList.add('current')
              }
            })

            dispatchEvent(document, 'morphAfterElementOut', {
              detail,
            })

            this.#timeoutIds = this.#timeoutIds.filter((t) => t !== timeoutId)
          }, (parseFloat(duration) || 0) * 1000 + 10)

          this.#timeoutIds.push(timeoutId)
        } else {
          morphElement.innerHTML = ''
          morphElement.append(...newMorphElementChildNodes)
        }
      })

      this.findLinks()

      document.documentElement.setAttribute('data-current-pathname', pathname)

      document.documentElement.setAttribute('data-current-leaf', leaf)

      this.postprocessor?.({ pathname, isCached, state })

      dispatchEvent(document, 'morphAfterNavigation', {
        detail: {
          pathname,
          isCached,
          state,
        },
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
    this.#links.push(new Link(element, this))
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

    this.#links = linkElements.map((element) => new Link(element, this))
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
    if (event.state) {
      this.navigate(event.state, { historyAction: 'none' })
    }
  }
}

declare global {
  interface DocumentEventMap extends MorphEvents {}
}
