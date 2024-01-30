import { Notifier } from '@packages/notifier'
import { isBrowser } from '@packages/utils'
import { Link } from './Link'

export type MorphHistoryAction = 'replace' | 'push' | 'none'

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
      this.#base = parameters?.base || '/'

      if (parameters?.base) {
        this.#base = parameters.base

        if (!parameters.base.endsWith('/')) {
          this.#base += '/'
        }
      } else {
        this.#base = '/'
      }

      this.#waitForHeadToLoad = parameters?.waitForHeadToLoad === false ? false : true
      this.#cachePages = parameters?.cachePages === false ? false : true

      this.#morphElements = this.#getMorphElements(document)

      this.#currentPathname = location.pathname

      this.#findLinks()

      addEventListener('popstate', this.#popStateListener)
    }
  }

  public beforeNavigationEvent(callback: MorphNavigationCallback) {
    return this.#beforeNavigationEvent.subscribe(callback)
  }

  public afterNavigationEvent(callback: MorphNavigationCallback) {
    return this.#afterNavigationEvent.subscribe(callback)
  }

  public async navigate(pathname: string, historyAction: MorphHistoryAction = 'push') {
    pathname = this.#preparePathname(pathname)

    if (this.#candidatePathname === pathname || this.#currentPathname === pathname) {
      return
    }

    this.#candidatePathname = pathname

    const isCached = this.#cache.has(pathname)

    try {
      let isOkToSwitch = true

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

      this.#beforeNavigationEvent.notify({
        pathname,
        isCached,
      })

      if (!isOkToSwitch || this.#candidatePathname !== pathname) {
        return
      }

      const newDocument = await this.#fetchDocument(pathname)

      if (this.#cachePages) {
        this.#cache.set(pathname, newDocument)
      }

      if (this.#candidatePathname !== pathname) {
        return
      }

      const currentHeadChildren = Array.from(document.head.children)
      const newHeadChildren = Array.from((newDocument.head.cloneNode(true) as HTMLElement).children)

      const identicalHeadChildren = this.#intersectElements(currentHeadChildren, newHeadChildren)
      const removeHeadChildren = this.#excludeElements(currentHeadChildren, identicalHeadChildren)
      const addHeadChildren = this.#excludeElements(newHeadChildren, identicalHeadChildren)

      removeHeadChildren.forEach((child) => child.remove())
      addHeadChildren.forEach((child) => document.head.appendChild(child))

      const elementsWithLoad = addHeadChildren.filter(
        (child) =>
          child.tagName === 'STYLE' || child.tagName === 'SCRIPT' || child.tagName === 'LINK'
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

      const newMorphElements = this.#getMorphElements(newDocument)

      this.#morphElements.forEach((morphElement, i) => {
        const newMorphElement = newMorphElements[i]
        morphElement.innerHTML = newMorphElement.innerHTML
      })

      this.#currentPathname = pathname

      if (historyAction === 'push') {
        history.pushState(pathname, '', pathname + location.search)
      } else if (historyAction === 'replace') {
        history.replaceState(pathname, '', pathname + location.search)
      }

      this.#findLinks()

      this.postprocessor?.({ pathname, isCached })
      this.#afterNavigationEvent.notify({ pathname, isCached })
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
    return document
  }

  #preparePathname(pathname: string) {
    pathname = pathname.replace(this.#base, '')

    if (pathname.startsWith('/')) {
      pathname = pathname.slice(1)
    }

    return this.#base + pathname
  }

  #findLinks() {
    const linkElements = [...document.documentElement.querySelectorAll('a')].filter((a) =>
      a.getAttribute('href')?.startsWith('/')
    )

    this.#links.forEach((link) => link.destroy())

    this.#links = linkElements.map((element) => new Link(element, this))
  }

  #getMorphElements(document: Document) {
    const elements = document.querySelectorAll<HTMLElement>('[data-morph]')
    return elements.length ? [...elements] : [document.body]
  }

  #intersectElements(elements: Array<Element>, elementsToIntersect: Array<Element>) {
    return elements.filter((element) =>
      elementsToIntersect.find(
        (elementToIntersect) => elementToIntersect.outerHTML === element.outerHTML
      )
    )
  }

  #excludeElements(elements: Array<Element>, elementsToExclude: Array<Element>) {
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
