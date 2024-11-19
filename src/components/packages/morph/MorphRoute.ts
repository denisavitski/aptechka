import { Morph } from './Morph'

export interface MorphRouteScrollState {
  x: number
  y: number
}

export interface MorphRouteSaveState {
  scroll?: MorphRouteScrollState | undefined
  document?: Document | undefined
}

export class MorphRoute {
  #morph: Morph
  #pathname: string
  #scrollState: MorphRouteScrollState = { x: 0, y: 0 }
  #initialDocument: Document
  #modifiedDocument: Document | null = null
  #currentDocument: Document = null!

  constructor(morph: Morph, pathname: string, initialDocument: Document) {
    this.#morph = morph
    this.#pathname = pathname
    this.#initialDocument = initialDocument.cloneNode(true) as Document
  }

  public get pathname() {
    return this.#pathname
  }

  public get scrollState() {
    return this.#scrollState
  }

  public get document() {
    return this.#currentDocument
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
      title = h1?.innerText || h1?.textContent || this.#pathname
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
      this.#scrollState.x = this.#morph.scrollElement.scrollLeft
      this.#scrollState.y = this.#morph.scrollElement.scrollTop
    } else {
      this.#scrollState.x = 0
      this.#scrollState.y = 0
    }
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

  public restoreScrollPosition() {
    this.#morph.scrollElement.scroll({
      top: this.#scrollState.y,
      left: this.#scrollState.x,
    })
  }
}
