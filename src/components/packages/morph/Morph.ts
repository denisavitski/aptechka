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

      this.#waitForHeadToLoad =
        parameters?.waitForHeadToLoad === false ? false : true
      this.#cachePages = parameters?.cachePages === false ? false : true

      this.#morphElements = this.#getMorphElements(document.body)

      this.#currentPathname = this.normalizePath(location.pathname).pathname

      document.documentElement.setAttribute(
        'data-current-pathname',
        this.#currentPathname
      )

      this.#findLinks()

      addEventListener('popstate', this.#popStateListener)
    }
  }

  public get currentPathname() {
    return this.#currentPathname
  }

  public get links() {
    return this.#links
  }

  public normalizePath(path: string) {
    path = path.replace(this.#base, '')

    if (path.startsWith('/')) {
      path = path.slice(1)
    }

    const split1 = path.split('#')
    const split2 = split1[0].split('?')

    const leaf = split2[0].endsWith('/') ? split2[0].slice(0, -1) : split2[0]
    const pathname = this.#base + leaf
    const parameters = split2?.[1]
    const hash = split1?.[1]

    return {
      leaf,
      pathname,
      parameters,
      hash,
    }
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
    historyAction: MorphHistoryAction = 'push'
  ) {
    const parts = this.normalizePath(path)
    let { pathname, hash, parameters } = parts

    if (
      this.#candidatePathname === pathname ||
      this.#currentPathname === pathname
    ) {
      return
    }

    this.#candidatePathname = pathname

    const isCached = this.#cache.has(pathname)

    try {
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
          child.tagName === 'STYLE' ||
          child.tagName === 'SCRIPT' ||
          child.tagName === 'LINK'
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

      const por = parameters || location.search

      const h = hash ? (hash.startsWith('#') ? hash : '#' + hash) : ''
      const p = por ? (por.startsWith('?') ? por : '?' + por) : ''

      const pathPlus = `${pathname}${h}${p}`

      if (historyAction === 'push') {
        history.pushState(pathname, '', pathPlus)
      } else if (historyAction === 'replace') {
        history.replaceState(pathname, '', pathPlus)
      }

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
