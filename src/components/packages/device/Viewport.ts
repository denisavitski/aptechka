import { RESIZE_ORDER } from '@packages/order'
import { resizer } from '@packages/resizer'
import { Store } from '@packages/store'
import { isBrowser } from '@packages/utils'

export enum ViewportBreakpoints {
  'mobile' = '600px',
  'tablet' = '1024px',
  'notebook' = '1280px',
  'desktop' = '1281px',
}

export enum ViewportMediaRules {
  '<=mobile' = '(max-width: 600px)',
  '>=mobile' = '(min-width: 601px)',
  '<=tablet' = '(max-width: 1024px)',
  '>=tablet' = '(min-width: 1025px)',
  '<=notebook' = '(max-width: 1280px)',
  '>=notebook' = '(min-width: 1281px)',
  '<=desktop' = '(max-width: 1280px)',
  '>=desktop' = '(min-width: 1281px)',
}

class Viewport {
  #width = 0
  #height = 0
  #pixelRatio = 0
  #store_type = new Store<keyof typeof ViewportBreakpoints | undefined>(undefined)

  constructor() {
    if (isBrowser) {
      resizer.subscribe(() => {
        this.#width = document.documentElement.clientWidth
        this.#height = innerHeight
        this.#pixelRatio = devicePixelRatio

        if (matchMedia(ViewportMediaRules['<=mobile']).matches) {
          this.#store_type.current = 'mobile'
        } else if (matchMedia(ViewportMediaRules['<=tablet']).matches) {
          this.#store_type.current = 'tablet'
        } else if (matchMedia(ViewportMediaRules['<=notebook']).matches) {
          this.#store_type.current = 'notebook'
        } else if (matchMedia(ViewportMediaRules['>=desktop']).matches) {
          this.#store_type.current = 'desktop'
        }
      }, RESIZE_ORDER.DEVICE)
    }
  }

  public get width() {
    return this.#width
  }

  public get height() {
    return this.#height
  }

  public get store_type() {
    return this.#store_type
  }

  public get pixelRatio() {
    return this.#pixelRatio
  }
}

export const viewport = new Viewport()
