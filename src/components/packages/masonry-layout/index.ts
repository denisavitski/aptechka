import { CSSProperty } from '@packages/css-property'
import { createStylesheet, dispatchEvent, isBrowser } from '@packages/utils'

export interface MasonryLayoutElementEvents {
  masonryLayoutDistributed: CustomEvent
}

export class MasonryLayoutElement extends HTMLElement {
  #distributeRule = new CSSProperty<'default' | 'chessboard'>(
    this,
    '--distribute-rule',
    'default',
    {
      skipSubscribeNotification: true,
    }
  )
  #columns = new CSSProperty<number>(this, '--columns', 2)

  #columnElements: Array<HTMLElement> = []

  #mutationObserver: MutationObserver = null!

  constructor() {
    super()

    const root = this.attachShadow({ mode: 'open' })

    root.adoptedStyleSheets = [
      createStylesheet({
        ':host': {
          display: 'grid',
          gridTemplateColumns: 'repeat(var(--columns), 1fr)',
        },
        '.column': {
          display: 'grid',
          width: '100%',
          gap: 'var(--gap, 0rem)',
          gridAutoRows: 'max-content',
        },
      }),
    ]
  }

  public get columnElements() {
    return this.#columnElements
  }

  protected connectedCallback() {
    this.#mutationObserver = new MutationObserver(this.#mutationListener)

    this.#mutationObserver.observe(this, {
      childList: true,
    })

    this.#distributeRule.subscribe(() => {
      this.#distribute()
    })

    this.#columns.subscribe((e) => {
      this.shadowRoot!.innerHTML = ''
      this.#columnElements = []

      for (let index = 0; index < e.current; index++) {
        const column = document.createElement('div')
        column.classList.add('column')
        column.innerHTML = `<slot name="col-${index}"></slot>`

        this.#columnElements.push(column)

        this.shadowRoot?.appendChild(column)
      }

      this.#distribute()
    })

    this.#distributeRule.observe()
    this.#columns.observe()
  }

  protected disconnectedCallback() {
    this.#columns.close()

    this.#mutationObserver.disconnect()

    this.classList.remove('distributed')
  }

  #mutationListener: MutationCallback = () => {
    this.#distribute()
  }

  #distribute() {
    const children = [...this.children]
    const columns = this.#columns.current

    if (this.#distributeRule.current === 'chessboard' && columns % 2 === 0) {
      children.forEach((el, i) => {
        const row = Math.floor(i / columns)
        const posInRow = i % columns

        const shift = row % 2
        const col = (posInRow + shift) % columns

        el.slot = `col-${col}`
      })
    } else if (this.#distributeRule.current === 'default') {
      children.forEach((el, i) => {
        el.slot = `col-${i % columns}`
      })
    }

    this.classList.add('distributed')
    dispatchEvent(this, 'masonryLayoutDistributed', { custom: true })
  }
}

if (isBrowser && !customElements.get('e-masonry-layout')) {
  customElements.define('e-masonry-layout', MasonryLayoutElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-masonry-layout': MasonryLayoutElement
  }

  interface HTMLElementEventMap extends MasonryLayoutElementEvents {}
}
