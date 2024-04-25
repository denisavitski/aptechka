import { CanvasElement } from '@packages/canvas'
import { ClassLinkedStatus } from '@packages/class-linked-status'
import { CSSProperty } from '@packages/css-property'
import { define } from '@packages/custom-element'
import { elementResizer } from '@packages/element-resizer'
import { SourceManager, SourceManagerSourceSet } from '@packages/source'
import { contain, cover } from '@packages/utils'

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

@define('e-sequence')
export class SequenceElement extends CanvasElement {
  #sourceManager: SourceManager

  #currentImages: Array<HTMLImageElement> = []

  #fitCSSProperty = new CSSProperty<'contain' | 'cover'>(
    this,
    '--fit',
    'contain'
  )

  #autoplayCSSProperty = new CSSProperty<boolean>(this, '--autoplay', false)

  #offsetXCSSProperty = new CSSProperty<number>(this, '--offset-x', 0.5)

  #offsetYCSSProperty = new CSSProperty<number>(this, '--offset-y', 0.5)

  #status = new ClassLinkedStatus(this, {
    loading: false,
    loaded: false,
    error: false,
  })

  #imageDimensions: ReturnType<typeof contain> = null!

  #currentIndex = 0

  #pad = 1

  constructor(parameters?: SequenceElementParameters) {
    super()

    const srcset = parameters?.srcset || this.getAttribute('srcset')
    const pad = parseInt(
      (parameters?.pad || this.getAttribute('pad') || '1').toString()
    )

    if (!srcset) {
      throw new Error('Sequence Element must have a srcset attribute')
    }

    this.#fitCSSProperty.subscribe(this.#resizeListener)
    this.#offsetXCSSProperty.subscribe(this.#resizeListener)
    this.#offsetYCSSProperty.subscribe(this.#resizeListener)

    this.#sourceManager = new SourceManager({
      srcset,
    })

    this.#sourceManager.subscribe(async (v) => {
      if (v.current) {
        const newImages: Array<HTMLImageElement> = []

        const minmax = extractNumbersBetweenCurlyBraces(v.current.name)

        if (minmax) {
          for (let i = minmax.start; i <= minmax.end; i++) {
            const src = v.current.url.replace(
              /\{([^}]+)\}/,
              i.toString().padStart(pad, '0')
            )
            const image = new Image()
            image.src = src
            newImages.push(image)
          }
        } else {
          const image = new Image()
          image.src = v.current.url
          newImages.push(image)
        }

        this.#status.set('loading', true)
        this.#status.set('error', false)
        this.#status.set('loaded', false)

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

          this.#status.set('loaded', true)
        } catch (e) {
          console.error(e)
          this.#status.set('error', true)
        }

        this.#status.set('loading', false)
      }
    })

    this.addEventListener('canvasRender', (e) => {
      if (this.#status.isFalse('loaded') || !this.#imageDimensions) {
        return
      }

      e.detail.context.clearRect(0, 0, e.detail.width, e.detail.height)

      const element = this.#currentImages[this.#currentIndex]

      if (element) {
        e.detail.context.drawImage(element, ...this.#imageDimensions)
      }

      if (this.#autoplayCSSProperty.current) {
        this.#currentIndex =
          (this.#currentIndex + 1) % this.#currentImages.length
      }
    })
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

    this.#sourceManager.connect()

    elementResizer.subscribe(this, this.#resizeListener)
  }

  protected override disconnectedCallback() {
    super.disconnectedCallback()

    this.#autoplayCSSProperty.unobserve()
    this.#fitCSSProperty.unobserve()
    this.#offsetXCSSProperty.unobserve()
    this.#offsetYCSSProperty.unobserve()

    this.#currentImages = []
    this.#status.reset()

    this.#sourceManager.disconnect()

    elementResizer.unsubscribe(this.#resizeListener)
  }

  #resizeListener = () => {
    if (this.#currentImages.length) {
      const image = this.#currentImages[0]

      if (this.#fitCSSProperty.current === 'cover') {
        this.#imageDimensions = cover(
          image.naturalWidth,
          image.naturalHeight,
          this.width,
          this.height,
          this.#offsetXCSSProperty.current,
          this.#offsetYCSSProperty.current
        )
      } else {
        this.#imageDimensions = contain(
          image.naturalWidth,
          image.naturalHeight,
          this.width,
          this.height,
          this.#offsetXCSSProperty.current,
          this.#offsetYCSSProperty.current
        )
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'e-sequence': SequenceElement
  }
}
