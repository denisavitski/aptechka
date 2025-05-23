import { Morph } from './Morph'

export interface MorphRouteScrollState {
  x: number
  y: number
}

export interface MorphRouteSaveState {
  scroll?: MorphRouteScrollState | undefined
  document?: Document | undefined
}

export type MorpRouteSaveParametersArg = string | object | URLSearchParams

const domParser = new DOMParser()

export class MorphRoute {
  #morph: Morph
  #path: string
  #scrollState: MorphRouteScrollState = { x: 0, y: 0 }
  #initialDocument: Document = null!
  #modifiedDocument: Document | null = null
  #currentDocument: Document = null!
  #savedState: any = null
  #abortController: AbortController | null = null
  #fetching: Promise<void> | null = null

  constructor(morph: Morph, path: string) {
    this.#morph = morph
    this.#path = path
  }

  public get path() {
    return this.#path
  }

  public get scrollState() {
    return this.#scrollState
  }

  public get document() {
    return this.#currentDocument
  }

  public setInitialDocument(document: Document) {
    this.#initialDocument = document.cloneNode(true) as Document
  }

  public abort() {
    return this.#abortController?.abort(
      `[${this.#path}] page loading cancelled`
    )
  }

  public async fetch(revalidate?: boolean) {
    if (
      this.#fetching ||
      (this.#initialDocument &&
        this.#initialDocument.documentElement.hasAttribute('data-cache') &&
        !revalidate) ||
      (this.#initialDocument && this.#morph.isPopstateNavigation)
    ) {
      return this.#fetching
    }

    this.#fetching = new Promise<void>(async (res) => {
      try {
        this.#abortController = new AbortController()

        const fetchResult = await fetch(this.#path, {
          signal: this.#abortController.signal,
        })

        const text = await fetchResult.text()

        const document = domParser.parseFromString(text, 'text/html')

        this.setInitialDocument(document)
      } catch (e) {
        console.warn(e)
      } finally {
        this.#abortController = null
        this.#fetching = null
        res()
      }
    })

    return this.#fetching
  }

  public cloneDocument() {
    this.#currentDocument = (
      this.#modifiedDocument || this.#initialDocument
    ).cloneNode(true) as Document
  }

  public get title() {
    let title = ''

    if (this.#currentDocument.title) {
      title = this.#currentDocument.title
    } else {
      const h1 = this.#currentDocument.querySelector('h1')
      title = h1?.innerText || h1?.textContent || this.#path
    }

    return title
  }

  public clearScrollState() {
    this.#scrollState.x = 0
    this.#scrollState.y = 0
  }

  public clearDocumentState() {
    this.#modifiedDocument = null
  }

  public saveScrollState() {
    if (
      !this.#initialDocument.documentElement.hasAttribute(
        'data-no-scroll-restoration'
      )
    ) {
      this.#scrollState.x = this.#morph.scrollValue.left
      this.#scrollState.y = this.#morph.scrollValue.top
    } else {
      this.#scrollState.x = 0
      this.#scrollState.y = 0
    }
  }

  public restoreScrollPosition() {
    this.#morph.scrollElement.scroll({
      top: this.#scrollState.y,
      left: this.#scrollState.x,
      behavior: 'instant',
    })
  }

  public saveDocumentState() {
    if (
      !this.#initialDocument.documentElement.hasAttribute(
        'data-no-page-restoration'
      )
    ) {
      this.#modifiedDocument = document.cloneNode(true) as Document
    } else {
      this.#modifiedDocument = null
    }
  }

  public renewScrollPosition() {
    this.#morph.scrollElement.scroll({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }

  public saveState(state: any) {
    this.#savedState = state
  }

  public clearState() {
    const state = this.#savedState

    this.#savedState = null

    return state
  }
}
