import { Notifier } from '@packages/notifier'

import {
  ChangeHistoryAction,
  changeHistory,
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
}

export interface MorphPreprocessorEntry extends MorphNavigationEntry {
  resolve: () => void
  reject: () => void
}

export type MorphPreprocessor = (entry: MorphPreprocessorEntry) => void

export type MorphNavigationCallback = (entry: MorphNavigationEntry) => void

export type MorphPostprocessor = MorphNavigationCallback

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

  public preprocessor?: MorphPreprocessor
  public postprocessor?: MorphPostprocessor

  #beforeNavigationEvent = new Notifier<MorphNavigationCallback>()
  #afterNavigationEvent = new Notifier<MorphNavigationCallback>()

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

      this.#findLinks()

      addEventListener('popstate', this.#popStateListener)

      changeHistory(
        'replace',
        this.#currentPathname,
        normalizedPath.parameters,
        normalizedPath.hash
      )
    }
  }

  public get currentPathname() {
    return this.#currentPathname
  }

  public get links() {
    return this.#links
  }

  public normalizePath(path: string) {
    return splitPath(path, this.#base)
  }

  public beforeNavigationEvent(callback: MorphNavigationCallback) {
    return this.#beforeNavigationEvent.subscribe(callback)
  }

  public afterNavigationEvent(callback: MorphNavigationCallback) {
    return this.#afterNavigationEvent.subscribe(callback)
  }

  public async prefetch(path: string) {
    const parts = this.normalizePath(path)
    return this.#fetchDocument(parts.pathname)
  }

  public async navigate(
    path: string,
    historyAction: ChangeHistoryAction = 'push'
  ) {
    const parts = this.normalizePath(path)
    let { pathname, hash, parameters, leaf } = parts

    if (
      this.#candidatePathname === pathname ||
      this.#currentPathname === pathname
    ) {
      return
    }

    this.#candidatePathname = pathname

    const isCached = this.#cache.has(pathname)

    try {
      loading.add('__morph')

      let isOkToSwitch = true

      this.#beforeNavigationEvent.notify({
        pathname,
        isCached,
      })

      if (this.preprocessor) {
        try {
          await new Promise<void>((resolve, reject) => {
            this.preprocessor?.({ pathname, resolve, reject, isCached })
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

      this.#currentPathname = pathname

      changeHistory(historyAction, pathname, parameters, hash)

      const newMorphElements = this.#getMorphElements(
        newDocument.body.cloneNode(true) as HTMLElement
      )

      this.#morphElements.forEach((morphElement, i) => {
        const newMorphElement = newMorphElements[i]!

        let currentMorphElementChildNodes = [...morphElement.childNodes]
        let newMorphElementChildNodes = [...newMorphElement.childNodes]

        currentMorphElementChildNodes.forEach((childNode) => {
          if (childNode instanceof HTMLElement) {
            const remain = childNode.getAttribute('data-remain')

            let founded: HTMLElement | undefined

            newMorphElementChildNodes = newMorphElementChildNodes.filter(
              (child) => {
                if (
                  child instanceof HTMLElement &&
                  remain &&
                  child.getAttribute('data-remain') === remain
                ) {
                  founded = child
                  return false
                }

                return true
              }
            )

            if (!(remain && founded)) {
              childNode.remove()
            }
          } else {
            childNode.remove()
          }
        })

        morphElement.append(...newMorphElementChildNodes)
      })

      this.#findLinks()

      document.documentElement.setAttribute('data-current-pathname', pathname)

      document.documentElement.setAttribute('data-current-leaf', leaf)

      this.postprocessor?.({ pathname, isCached })
      this.#afterNavigationEvent.notify({ pathname, isCached })
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

  #findLinks() {
    const linkElements = [
      ...document.documentElement.querySelectorAll('a'),
    ].filter((a) => a.getAttribute('href')?.startsWith('/'))

    this.#links.forEach((link) => link.destroy())

    this.#links = linkElements.map((element) => new Link(element, this))
  }

  #getMorphElements(el: HTMLElement) {
    return [...el.querySelectorAll<HTMLElement>('[data-morph]')] || [el]
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
      this.navigate(event.state, 'none')
    }
  }
}
