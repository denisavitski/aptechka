import { CSSProperty } from '@packages/css-property'
import { elementResizer } from '@packages/element-resizer/vanilla'
import { contain, cover, isBrowser } from '@packages/utils'
import { SourceManagerSourceSet } from '@packages/source'
import { CanvasElement, CanvasRenderDetail } from '@packages/canvas'
import { SourceElement } from '../source'

export interface SequenceElementParameters {
  srcset: SourceManagerSourceSet
  pad?: number
}

function extractNumbersBetweenCurlyBraces(str: string) {
  const match = str.match(/\{([\d-]+)\}/)

  if (match) {
    const range = match[1].split('-')
    if (range.length === 2) {
      const start = parseInt(range[0], 10)
      const end = parseInt(range[1], 10)

      return { start, end }
    }
  }

  return null
}

export class SequenceElement extends SourceElement<CanvasElement> {
  #currentImages: Array<HTMLImageElement> = []

  #fitCSSProperty = new CSSProperty<'contain' | 'cover'>(
    this,
    '--fit',
    'contain'
  )

  #autoplayCSSProperty = new CSSProperty<boolean>(this, '--autoplay', false)

  #offsetXCSSProperty = new CSSProperty<number>(this, '--offset-x', 0.5)

  #offsetYCSSProperty = new CSSProperty<number>(this, '--offset-y', 0.5)

  #imageDimensions: ReturnType<typeof contain> = null!

  #currentIndex = 0

  #pad = 1

  constructor(parameters?: SequenceElementParameters) {
    super()

    if (isBrowser) {
      this.#pad = parseInt(
        (parameters?.pad || this.getAttribute('pad') || '1').toString()
      )

      this.#fitCSSProperty.subscribe(this.#resizeListener)
      this.#offsetXCSSProperty.subscribe(this.#resizeListener)
      this.#offsetYCSSProperty.subscribe(this.#resizeListener)

      this.addEventListener('sourceCapture', (e) => {
        this.consumerElement.addEventListener(
          'canvasRender',
          this.#renderListener
        )
      })

      this.addEventListener('sourceRelease', (e) => {
        this.consumerElement.removeEventListener(
          'canvasRender',
          this.#renderListener
        )
      })
    }
  }

  public setProgress(value: number) {
    if (this.#currentImages.length) {
      this.#currentIndex = Math.floor((this.#currentImages.length - 1) * value)
    }
  }

  protected override connectedCallback() {
    super.connectedCallback()

    this.#autoplayCSSProperty.observe()
    this.#fitCSSProperty.observe()
    this.#offsetXCSSProperty.observe()
    this.#offsetYCSSProperty.observe()

    elementResizer.subscribe(this, this.#resizeListener)
  }

  protected override disconnectedCallback() {
    super.disconnectedCallback()

    this.#autoplayCSSProperty.unobserve()
    this.#fitCSSProperty.unobserve()
    this.#offsetXCSSProperty.unobserve()
    this.#offsetYCSSProperty.unobserve()

    this.#currentImages = []

    elementResizer.unsubscribe(this.#resizeListener)

    this.consumerElement.removeEventListener(
      'canvasRender',
      this.#renderListener
    )
  }

  protected override createConsumer() {
    return new CanvasElement()
  }

  protected override async consumeSource(url: string | null) {
    if (url) {
      this.consumerElement.removeEventListener(
        'canvasRender',
        this.#renderListener
      )

      const newImages: Array<HTMLImageElement> = []

      const minmax = extractNumbersBetweenCurlyBraces(url)

      if (minmax) {
        for (let i = minmax.start; i <= minmax.end; i++) {
          const src = url.replace(
            /\{([^}]+)\}/,
            i.toString().padStart(this.#pad, '0')
          )
          const image = new Image()
          image.src = src
          newImages.push(image)
        }
      } else {
        const image = new Image()
        image.src = url
        newImages.push(image)
      }

      try {
        await Promise.all(
          newImages.map((image, i) => {
            return new Promise<void>((res, rej) => {
              image.onload = () => {
                res()
              }

              image.onerror = (e) => {
                rej(`${image.src} Image not found`)
              }
            })
          })
        )

        this.#currentImages = newImages
        this.#resizeListener()

        this.consumerElement.onload?.(new Event('load'))

        if (!this.isLazy) {
          this.consumerElement.addEventListener(
            'canvasRender',
            this.#renderListener
          )
        }
      } catch (e) {
        console.error(e)
        this.consumerElement.onerror?.(new Event('error'))
      }
    }
  }

  #resizeListener = () => {
    if (this.#currentImages.length) {
      const image = this.#currentImages[0]

      if (this.#fitCSSProperty.current === 'cover') {
        this.#imageDimensions = cover(
          image.naturalWidth,
          image.naturalHeight,
          this.consumerElement.width,
          this.consumerElement.height,
          this.#offsetXCSSProperty.current,
          this.#offsetYCSSProperty.current
        )
      } else {
        this.#imageDimensions = contain(
          image.naturalWidth,
          image.naturalHeight,
          this.consumerElement.width,
          this.consumerElement.height,
          this.#offsetXCSSProperty.current,
          this.#offsetYCSSProperty.current
        )
      }
    }
  }

  #renderListener = (e: CustomEvent<CanvasRenderDetail>) => {
    if (this.status.isFalse('loaded') || !this.#imageDimensions) {
      return
    }

    e.detail.context.clearRect(0, 0, e.detail.width, e.detail.height)

    const element = this.#currentImages[this.#currentIndex]

    if (element) {
      e.detail.context.drawImage(element, ...this.#imageDimensions)
    }

    if (this.#autoplayCSSProperty.current) {
      this.#currentIndex = (this.#currentIndex + 1) % this.#currentImages.length
    }
  }
}

if (!customElements.get('e-sequence')) {
  customElements.define('e-sequence', SequenceElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-sequence': SequenceElement
  }
}
